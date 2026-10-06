#!/usr/bin/env node
/**
 * Generates dist/sitemap.xml from the same route table the router and the
 * prerenderer use, so a route can never be in the sitemap without a page behind
 * it, nor prerendered but absent from the sitemap.
 *
 * Core pages get no <lastmod>: there is no real edit date for them and a
 * fabricated one makes crawlers ignore the value. Blog posts get their true
 * publish date from src/data/blogs.ts.
 *
 * The real work is in src/sitemap-entry.ts, which esbuild compiles so it can
 * import the app's TypeScript route table.
 */
import { runEntry } from "./run-entry.mjs";

await runEntry("src/sitemap-entry.ts");
