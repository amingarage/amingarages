/**
 * The one route table.
 *
 * App.tsx (browser router) and scripts/prerender-entry.tsx (StaticRouter) both
 * build from this list, so the set of prerendered files, the router's routes,
 * sitemap.xml and the client bundle cannot drift apart. Before this, the routes
 * were declared inline in App.tsx and nowhere else, which is how a page could
 * end up in the sitemap with no HTML file behind it.
 */
import { blogs } from "./data/blogs";

export const coreRoutes = [
  "/",
  "/about",
  "/services",
  "/gallery",
  "/blog",
  "/contact",
] as const;

export const blogRoutes = blogs.map((b) => `/blog/${b.id}`);

export const allRoutes: string[] = [...coreRoutes, ...blogRoutes];

/** Routes that are real pages and must appear in sitemap.xml. */
export const sitemapRoutes = allRoutes;
