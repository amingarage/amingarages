#!/usr/bin/env node
/**
 * Fails the build if the prerendered output is not crawlable.
 *
 * Every check here corresponds to a defect the original site actually had:
 *
 *  - empty <div id="root"> ......... client-only SPA, no content for crawlers
 *  - www canonicals ............... every canonical pointed at a redirecting host
 *  - catch-all 200 ................. unknown URLs indexed as soft 404s
 *  - no sitemap .................... crawlers had no way to find the blog posts
 *  - no og:image ................... no preview on any shared link
 *  - twitter with property= ....... Twitter/X ignored the tag entirely
 *
 * Run after `npm run build`. Any failure exits non-zero so CI cannot pass on a
 * broken prerender.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const errors = [];
const warnings = [];

const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

if (!fs.existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

/** Every prerendered page, derived from the files actually written. */
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") htmlFiles.push(full);
  }
};
walk(DIST);

/**
 * The document with non-markup noise removed.
 *
 * Two sources produced false "duplicate <title>" / "duplicate <h1>" failures:
 *
 *  - <noscript>: parse5 treats its contents as raw text, not markup, so tags
 *    inside are inert and are not elements a crawler indexes.
 *  - <!-- comments -->: these describe the SEO bugs being fixed and quote the
 *    tag names literally, which a naive regex happily counts.
 *
 * Neither can contribute a real element, so both are stripped before counting.
 */
const contentOnly = (html) =>
  html
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

const count = (html, re) => (html.match(re) ?? []).length;

/**
 * Returns the inner HTML of the <div id="root"> element.
 *
 * A regex cannot do this: the rendered page contains nested <div>s, and the
 * closing tag is followed by <noscript> and then the module script, so a naive
 * non-greedy match stops at the first inner </div> and a greedy one fails to
 * find the trailing script. Counting tag depth is the reliable approach.
 */
const rootContent = (html) => {
  const open = html.match(/<div id="root"[^>]*>/);
  if (!open) return null;

  let i = open.index + open[0].length;
  let depth = 1;

  const tag = /<(\/?)div\b[^>]*>/gi;
  tag.lastIndex = i;

  for (let m; (m = tag.exec(html)); ) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(i, m.index);
  }
  // Unbalanced markup: fall back to everything up to the first trailing script.
  return html.slice(i, i + 200000);
};
const attr = (html, name) => {
  const m = html.match(
    new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, "i")
  );
  return m?.[1] ?? null;
};
const titleOf = (html) => html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;

/**
 * 404.html is served from the root rather than from a route directory, so the
 * walk above never sees it. It needs the same metadata checks as every other
 * page: exactly one h1, robots noindex, and no canonical at all.
 *
 * A canonical on a 404 tells crawlers the URL is a real, indexable document,
 * which is the opposite of what the status code should signal.
 */
const notFoundFile = path.join(DIST, "404.html");
if (!fs.existsSync(notFoundFile)) {
  errors.push("404.html: not found, so the host cannot return a real 404 status");
} else {
  const html = contentOnly(fs.readFileSync(notFoundFile, "utf8"));

  const h1s = count(html, /<h1[\s>]/gi);
  if (h1s !== 1) {
    errors.push(`404.html: expected exactly 1 <h1>, found ${h1s}`);
  }

  const robots = attr(html, "robots");
  if (!robots || !/noindex/i.test(robots)) {
    errors.push(`404.html: robots is "${robots}", expected noindex`);
  }

  const canonicals = count(html, /<link[^>]+rel=["']?canonical/gi);
  if (canonicals !== 0) {
    errors.push(
      `404.html: found ${canonicals} canonical link(s), expected 0; ` +
        "a 404 must not canonicalise itself"
    );
  }
}

const sitemapPath = path.join(DIST, "sitemap.xml");
const sitemap = fs.existsSync(sitemapPath)
  ? fs.readFileSync(sitemapPath, "utf8")
  : "";
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

console.log(`Checking ${htmlFiles.length} HTML files\n`);

for (const file of htmlFiles) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  const markup = contentOnly(html);

  // --- Content is actually present (the original SPA bug) -------------------
  const inner = rootContent(html);
  if (inner === null) {
    fail(rel, "no <div id=\"root\"> found; the page was never prerendered");
  }
  const visibleChars = (inner ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim().length;
  if (visibleChars < 400) {
    fail(rel, `only ${visibleChars} characters of rendered content; expected real page text`);
  }

  // --- Exactly one of each head tag ---------------------------------------
  const titles = count(markup, /<title[^>]*>/gi);
  if (titles !== 1) fail(rel, `expected exactly 1 <title>, found ${titles}`);
  const title = titleOf(markup);
  if (title !== null && title.length < 15) {
    fail(rel, `title is too short to be useful: "${title}"`);
  }
  if (title !== null && title.length > 70) {
    warn(rel, `title is ${title.length} characters; Google truncates around 60`);
  }

  const descs = count(markup, /<meta[^>]+name=["']description["']/gi);
  if (descs !== 1) fail(rel, `expected exactly 1 description meta, found ${descs}`);
  const desc = attr(markup, "description");
  if (desc !== null) {
    if (desc.length < 70) fail(rel, `description is only ${desc.length} characters`);
    if (desc.length > 300) {
      warn(rel, `description is ${desc.length} characters; Google truncates around 160`);
    }
  }

  const robots = attr(markup, "robots");
  const h1s = count(markup, /<h1[\s>]/gi);
  if (h1s !== 1) fail(rel, `expected exactly 1 <h1>, found ${h1s}`);

  // --- Canonical ----------------------------------------------------------
  // 404.html is handled separately above; the walk only collects route pages.
  const canonicals = [...markup.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)].map(
    (m) => m[0].match(/href=["']([^"']+)["']/)?.[1] ?? ""
  );

  if (canonicals.length !== 1) {
    fail(rel, `expected exactly 1 canonical, found ${canonicals.length}`);
  }
  const canon = canonicals[0] ?? "";
  if (canon && !canon.startsWith("https://amingarage.com")) {
    fail(rel, `canonical "${canon}" is not the non-www https host`);
  }
  if (canon && /[?#]/.test(canon)) {
    fail(rel, `canonical "${canon}" must not carry a query string or fragment`);
  }
  if (!robots || !robots.includes("index")) {
    fail(rel, `expected an indexable robots directive, found "${robots}"`);
  }

  // --- Open Graph / Twitter ----------------------------------------------
  const ogImage = attr(markup, "og:image");
  if (!ogImage) {
    fail(rel, "missing og:image");
  } else {
    if (!ogImage.startsWith("https://")) {
      fail(rel, `og:image "${ogImage}" must be an absolute https URL`);
    }
    if (!ogImage.startsWith("https://amingarage.com/")) {
      fail(rel, `og:image "${ogImage}" is not on the canonical host`);
    }
    const ogFile = path.join(DIST, new URL(ogImage).pathname);
    if (!fs.existsSync(ogFile)) {
      fail(rel, `og:image points at ${new URL(ogImage).pathname}, which does not exist`);
    }
  }

  // The original bug: Twitter tags were emitted with property= instead of name=,
  // so every one of them was ignored.
  if (!attr(markup, "twitter:card")) {
    fail(rel, "missing twitter:card");
  }
  if (count(markup, /<meta[^>]+name=["']twitter:card["']/gi) !== 1) {
    fail(rel, "twitter:card must use name=, not property=");
  }

  for (const prop of ["og:title", "og:description", "og:url", "og:type"]) {
    if (!attr(markup, prop)) fail(rel, `missing ${prop}`);
  }

  const ogUrl = attr(markup, "og:url");
  if (ogUrl && canon && ogUrl !== canon) {
    fail(rel, `og:url "${ogUrl}" disagrees with canonical "${canon}"`);
  }

  // --- Sitemap coverage ---------------------------------------------------
  if (sitemapLocs.length && !sitemapLocs.includes(canon)) {
    fail(rel, `canonical "${canon}" has no entry in sitemap.xml`);
  }

  // --- JSON-LD ------------------------------------------------------------
  const ldBlocks = [...markup.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )];
  if (ldBlocks.length !== 1) {
    fail(rel, `expected exactly 1 JSON-LD block, found ${ldBlocks.length}`);
  } else {
    try {
      const parsed = JSON.parse(ldBlocks[0][1]);
      if (!parsed["@context"]?.includes("schema.org")) {
        fail(rel, "JSON-LD is missing the schema.org @context");
      }
      if (!Array.isArray(parsed["@graph"])) {
        fail(rel, "JSON-LD should use a single @graph of nodes");
      }
      const types = (parsed["@graph"] ?? []).map((n) => n["@type"]).flat();
      if (!types.some((t) => typeof t === "string" && /LocalBusiness|AutoRepair/.test(t))) {
        fail(rel, "JSON-LD graph does not identify the business");
      }
    } catch (e) {
      fail(rel, `JSON-LD is not valid JSON: ${e.message}`);
    }
  }
}

// --- Static files ---------------------------------------------------------
if (!sitemapLocs.length) {
  errors.push("sitemap.xml: missing or contains no <loc> entries");
} else {
  for (const loc of sitemapLocs) {
    if (!loc.startsWith("https://amingarage.com")) {
      errors.push(`sitemap.xml: "${loc}" is not on the canonical host`);
    }
    const route = loc.replace("https://amingarage.com", "") || "/";
    const file =
      route === "/"
        ? path.join(DIST, "index.html")
        : path.join(DIST, route.replace(/^\//, ""), "index.html");
    if (!fs.existsSync(file)) {
      errors.push(`sitemap.xml: "${loc}" has no page at ${path.relative(DIST, file)}`);
    }
  }
}

const robotsTxt = path.join(DIST, "robots.txt");
if (!fs.existsSync(robotsTxt)) {
  errors.push("robots.txt: missing");
} else {
  const txt = fs.readFileSync(robotsTxt, "utf8");
  const sm = txt.match(/^Sitemap:\s*(\S+)/im)?.[1];
  if (!sm) errors.push("robots.txt: no Sitemap directive");
  else if (!sm.startsWith("https://amingarage.com")) {
    errors.push(`robots.txt: sitemap "${sm}" is not on the canonical host`);
  }
}

if (fs.existsSync(path.join(DIST, "_redirects"))) {
  errors.push("_redirects: still present; the /* 200 catch-all creates soft 404s");
}
if (!fs.existsSync(path.join(DIST, "404.html"))) {
  errors.push("404.html: missing; unknown URLs will return 200 instead of 404");
}

// --- Internal link check --------------------------------------------------
const internal = new Set(["/", ...sitemapLocs.map((l) => new URL(l).pathname)]);
for (const file of htmlFiles) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  const markup = contentOnly(html);
  for (const m of markup.matchAll(/<a[^>]+href=["'](\/[^"'#?]*)["']/gi)) {
    const href = m[1];
    if (href.startsWith("//") || /\.(png|jpe?g|svg|webp|css|js|xml|txt|ico)$/i.test(href)) {
      continue;
    }
    if (!internal.has(href)) {
      warn(rel, `internal link to "${href}" has no matching prerendered page`);
    }
  }
}

// --- Report ---------------------------------------------------------------
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`FAIL  ${e}`);

if (errors.length) {
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}
console.log(`\nSEO OK: ${htmlFiles.length} pages, ${sitemapLocs.length} sitemap URLs, ${warnings.length} warning(s)`);
