import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite config.
 *
 * `build.rollupOptions.input` is left at its default so the client build emits
 * dist/index.html as a normal SPA shell. That shell is then rewritten per route
 * by src/ssr-prerender.tsx, which is compiled by the *same* Vite build pipeline
 * via `vite build --ssr`. Reusing Vite for the server bundle matters: it resolves
 * image imports to the same content-hashed filenames the client bundle uses. A
 * prerenderer driven by plain esbuild would emit /assets/painting.webp while the
 * browser bundle referenced /assets/painting-BMbtHsLh.webp, so every image would
 * 404 on first paint and React would report a hydration mismatch.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    // The SPA fallback is intentionally gone. Every route gets its own
    // prerendered index.html, and unknown paths must reach 404.html with a real
    // 404 status rather than being rewritten to the homepage with a 200.
    assetsInlineLimit: 4096,
  },
});
