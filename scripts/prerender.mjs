#!/usr/bin/env node
/**
 * Runs the Vite SSR bundle produced by `vite build --ssr src/ssr-prerender.tsx`.
 *
 * The SSR bundle has to come from Vite rather than plain esbuild so that image
 * imports resolve to the same content-hashed filenames the client bundle
 * references. If they disagreed, every <img> in the prerendered HTML would 404
 * on first paint and React would report a hydration mismatch.
 */
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const SSR_DIR = path.resolve(".ssr");
const ENTRY = path.join(SSR_DIR, "ssr-prerender.js");

if (!fs.existsSync(ENTRY)) {
  console.error(
    `${path.relative(process.cwd(), ENTRY)} not found.\n` +
      "Run `npm run build:ssr` first, or just use `npm run build`."
  );
  process.exit(1);
}

await import(pathToFileURL(ENTRY).href);
