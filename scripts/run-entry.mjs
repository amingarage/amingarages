/**
 * Bundles and runs a TypeScript entry with esbuild, so the build scripts can
 * import the app's real .tsx modules instead of duplicating the route list.
 *
 * The app has no ts-node/tsx dependency and Vite only compiles for the browser,
 * so esbuild is already on disk as a transitive dependency and can do this job
 * without adding a runtime dependency to the project.
 */
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const CACHE = path.resolve(".cache");

/**
 * @param {string} entry     TS/TSX entry to run, relative to the repo root.
 * @param {string} platform  "node" for scripts, "neutral" for SSR bundles.
 */
export const runEntry = async (entry, platform = "node") => {
  fs.mkdirSync(CACHE, { recursive: true });

  const outfile = path.join(CACHE, path.basename(entry).replace(/\.tsx?$/, ".mjs"));

  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform,
    format: "esm",
    target: "node18",
    jsx: "automatic",
    // CSS imports must not be inlined as JS; the browser bundle already has them.
    loader: { ".css": "empty" },
    logLevel: "warning",
  });

  return import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
};
