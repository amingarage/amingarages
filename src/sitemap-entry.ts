/**
 * Sitemap generator, compiled by scripts/generate-sitemap.mjs via esbuild.
 */
import fs from "node:fs";
import path from "node:path";
import { sitemapRoutes, coreRoutes } from "./AppRoutes";
import { canonical } from "./data/site";
import { blogs } from "./data/blogs";

const core = new Set<string>(coreRoutes);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const entries = sitemapRoutes.map((route) => {
  const post = route.startsWith("/blog/")
    ? blogs.find((b) => b.id === route.slice("/blog/".length))
    : undefined;

  const lastmod = core.has(route) || !post ? "" : `\n    <lastmod>${post.dateISO}</lastmod>`;
  const freq = post ? "monthly" : "weekly";
  const priority = route === "/" ? "1.0" : post ? "0.6" : "0.8";

  return `  <url>
    <loc>${escapeXml(canonical(route))}</loc>${lastmod}
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

const target = path.resolve("dist", "sitemap.xml");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, xml, "utf8");

console.log(`Sitemap: ${entries.length} URLs written to dist/sitemap.xml`);
