/**
 * The actual prerenderer. Compiled by scripts/prerender.mjs through esbuild, so
 * it can import the real TSX pages and the route table rather than re-declaring
 * them. A hand-maintained duplicate of the route list is exactly how the old
 * sitemap ended up disagreeing with the pages that existed.
 */
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { createElement } from "react";
import fs from "node:fs";
import path from "node:path";
import * as parse5 from "parse5";
import type { HelmetServerState } from "react-helmet-async";
import { AppShell } from "./entry-server";
import { allRoutes } from "./AppRoutes";
import { canonical } from "./data/site";

/**
 * Structural view of a parse5 tree node. parse5's own Node union does not expose
 * tagName/childNodes on every variant, so the traversal narrows to this shape.
 */
interface TreeNode {
  tagName?: string;
  childNodes?: TreeNode[];
  parentNode?: TreeNode | null;
  attrs?: { name: string; value: string }[];
}

/**
 * react-helmet-async stores each tag group as a lazily-serialised object rather
 * than a plain string, so every group must be stringified separately. Getting
 * this wrong silently drops tags from the prerendered HTML while the browser
 * build still works fine, which is why scripts/verify-seo.mjs checks the output.
 */
const helmetToHtml = (helmet: HelmetServerState) => ({
  title: helmet.title.toString(),
  priority: helmet.priority.toString(),
  base: helmet.base.toString(),
  meta: helmet.meta.toString(),
  link: helmet.link.toString(),
  style: helmet.style.toString(),
  script: helmet.script.toString(),
  noscript: helmet.noscript.toString(),
});

const DIST = path.resolve("dist");
const TEMPLATE = path.join(DIST, "index.html");

const headMarkup = (head: Record<string, string>) =>
  [
    head.title,
    head.priority,
    head.base,
    head.meta,
    head.link,
    head.style,
    head.script,
    head.noscript,
  ]
    .filter(Boolean)
    .join("\n    ");

/**
 * Tags that index.html declares as a raw-response fallback and that SEOMeta
 * re-declares per route. The prerenderer must strip the template's copies before
 * injecting the route's own, otherwise every page ships two <title>s, two
 * descriptions and two canonicals.
 *
 * Structural tags (charset, viewport, icons, manifest, theme-color) are kept:
 * they are route-independent and must be present before React loads.
 */
const REPLACEABLE = new Set([
  "title",
  "description",
  "robots",
  "author",
  "og:type",
  "og:site_name",
  "og:locale",
  "og:url",
  "og:title",
  "og:description",
  "og:image",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
  "article:published_time",
  "article:modified_time",
  "twitter:card",
  "twitter:url",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "twitter:image:alt",
  "geo.region",
  "geo.placename",
  "ICBM",
]);

const isReplaceable = (node: TreeNode): boolean => {
  if (node.tagName === "title") return true;

  const attrs = node.attrs ?? [];
  const get = (name: string) =>
    attrs.find((a) => a.name === name)?.value ?? "";

  if (node.tagName === "meta") {
    return REPLACEABLE.has(get("name")) || REPLACEABLE.has(get("property"));
  }
  if (node.tagName === "link") {
    return get("rel").toLowerCase() === "canonical";
  }
  return false;
};

/**
 * Replaces the whole <div id="root"> element, opening tag included.
 *
 * Counts <div> nesting depth rather than using a regex. A non-greedy regex stops
 * at the first inner </div>, which silently leaves the previously rendered body
 * in place on a second run and duplicates the h1 and the JSON-LD block. That made
 * `npm run prerender` non-idempotent: running it twice produced broken HTML that
 * only the verify step caught.
 */
const replaceRoot = (html: string, openTag: string, inner: string): string => {
  const open = html.match(/<div id="root"[^>]*>/);
  if (!open || open.index === undefined) {
    throw new Error('dist/index.html has no <div id="root"> to prerender into');
  }

  const start = open.index + open[0].length;
  let depth = 1;
  let closeAt = html.length;

  const tag = /<(\/?)div\b[^>]*>/gi;
  tag.lastIndex = start;

  for (let m; (m = tag.exec(html)); ) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) {
      closeAt = m.index + m[0].length;
      break;
    }
  }

  return html.slice(0, open.index) + openTag + inner + html.slice(closeAt);
};

/**
 * Rewrites one page: swaps in the rendered body and the route's <head> tags.
 *
 * Working on a parse5 tree for the head is what guarantees exactly one title and
 * one canonical: the template's fallback copies are removed by node, then the
 * route's own tags are inserted.
 */
const buildHtml = (
  template: string,
  body: string,
  head: Record<string, string>,
  route: string
): string => {
  const openTag = `<div id="root" data-route="${canonical(route)}">`;
  const withRoot = replaceRoot(template, openTag, body);

  const doc = parse5.parse(withRoot) as unknown as TreeNode;

  const visit = (node: TreeNode) => {
    if (node.tagName === "head") {
      node.childNodes = (node.childNodes ?? []).filter((c) => !isReplaceable(c));
      const frag = parse5.parseFragment(headMarkup(head)) as unknown as TreeNode;
      const injected = (frag.childNodes ?? []).map((n) => {
        const copy = { ...n };
        delete copy.parentNode;
        return copy;
      });
      node.childNodes = [...injected, ...(node.childNodes ?? [])];
    }
    (node.childNodes ?? []).forEach(visit);
  };
  visit(doc);

  return `<!DOCTYPE html>${parse5.serialize(doc as never)}`;
};

const renderRoute = (route: string) => {
  const context: { helmet?: HelmetServerState } = {};
  const body = renderToString(
    createElement(
      HelmetProvider,
      { context },
      createElement(AppShell, { url: route })
    )
  );
  if (!context.helmet) throw new Error(`Helmet produced no state for ${route}`);
  return { body, head: helmetToHtml(context.helmet) };
};

const outFileFor = (route: string) => {
  const clean = route.replace(/^\/+/, "");
  return clean === ""
    ? path.join(DIST, "index.html")
    : path.join(DIST, clean, "index.html");
};

if (!fs.existsSync(TEMPLATE)) {
  throw new Error(
    "dist/index.html not found. Run `npm run build` before prerendering."
  );
}

/**
 * Compiled by `vite build --ssr`, then executed by scripts/prerender.mjs.
 *
 * It runs on import so the npm script stays a one-liner.
 */
const template = fs.readFileSync(TEMPLATE, "utf8");
let count = 0;

for (const route of allRoutes) {
  const { body, head } = renderRoute(route);
  const target = outFileFor(route);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, buildHtml(template, body, head, route), "utf8");
  count += 1;
  console.log(`  ${route} -> ${path.relative(DIST, target)}`);
}

// A static 404 is the only way to return a real 404 status for an unknown path.
// The SPA router alone always answers 200, which turns every typo URL into a
// soft 404 that Google indexes.
{
  const { body, head } = renderRoute("/404");
  fs.writeFileSync(
    path.join(DIST, "404.html"),
    buildHtml(template, body, head, "/404"),
    "utf8"
  );
  console.log("  /404 -> 404.html");
}

console.log(`\nPrerendered ${count} routes + 404.html`);
