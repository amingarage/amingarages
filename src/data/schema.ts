/**
 * Every JSON-LD graph the site emits is defined here, once.
 *
 * The original site shipped no structured data at all. Pages render
 * <JsonLd data={...} /> rather than hand-writing schemas, which keeps it to
 * exactly one definition of the business entity and one of each page type.
 */
import {
  SITE_URL,
  business,
  openingHours,
  serviceAreas,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  canonical,
} from "./site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** The single business entity. Referenced by @id from every other node. */
export const autoRepairSchema = {
  "@type": ["AutoRepair", "LocalBusiness"],
  "@id": ORG_ID,
  name: business.name,
  description: business.description,
  url: `${SITE_URL}/`,
  telephone: business.telephone,
  email: business.email,
  priceRange: business.priceRange,
  currenciesAccepted: business.currency,
  image: ogImage,
  logo: {
    "@type": "ImageObject",
    url: ogImage,
    width: ogImageWidth,
    height: ogImageHeight,
    caption: business.name,
  },
  hasMap: `https://www.google.com/maps?q=${business.geo.latitude},${business.geo.longitude}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: openingHours.map((o) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: o.days.map((d) => `https://schema.org/${d}`),
    opens: o.opens,
    closes: o.closes,
  })),
} satisfies Record<string, unknown>;

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: business.name,
  description: business.description,
  inLanguage: "en-PK",
  publisher: { "@id": ORG_ID },
} satisfies Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  pathname: string;
}

/**
 * BreadcrumbList.
 *
 * Head-only structured data: it describes the page hierarchy to crawlers without
 * rendering anything on screen. The blog posts also declare breadcrumb data,
 * since Home -> Blog -> <post> is the hierarchy Google displays for them.
 */
export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@type": "BreadcrumbList",
  "@id": `${canonical(items[items.length - 1].pathname)}#breadcrumb`,
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: canonical(item.pathname),
  })),
}) satisfies Record<string, unknown>;

export const webPageSchema = ({
  pathname,
  name,
  description,
  breadcrumb,
}: {
  pathname: string;
  name: string;
  description: string;
  breadcrumb?: BreadcrumbItem[];
}) => {
  const id = `${canonical(pathname)}#webpage`;
  return {
    "@type": "WebPage",
    "@id": id,
    url: canonical(pathname),
    name,
    description,
    inLanguage: "en-PK",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: ogImage,
    ...(breadcrumb ? { breadcrumb: { "@id": `${canonical(pathname)}#breadcrumb` } } : {}),
  } satisfies Record<string, unknown>;
};

/**
 * Takes its text from src/data/blogs.ts rather than from the post object in
 * BlogDetails, so the JSON-LD, the <title> and the sitemap all read the same
 * values. Takes only the image path from the page, because the imported asset
 * URL is the one that actually resolves on the CDN.
 */
export const articleSchema = ({
  headline,
  description,
  image,
  datePublished,
  pathname,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  pathname: string;
}) => {
  const url = canonical(pathname);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: [`${SITE_URL}${image}`],
    datePublished,
    inLanguage: "en-PK",
    author: { "@type": "Organization", name: business.name, url: `${SITE_URL}/about` },
    publisher: { "@id": ORG_ID },
  } satisfies Record<string, unknown>;
};

/**
 * Convenience wrapper: the nodes a page owns, always cross-linked to the single
 * business entity so the graph stays connected rather than fragmented.
 */
export const pageGraph = (
  nodes: (Record<string, unknown> | null | undefined)[]
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@graph": [autoRepairSchema, websiteSchema, ...nodes.filter(Boolean)],
});
