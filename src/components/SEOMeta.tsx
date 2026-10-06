import React from "react";
import { Helmet } from "react-helmet-async";
import {
  business,
  ogImage as defaultOgImage,
  ogImageWidth,
  ogImageHeight,
  canonical,
} from "../data/site";

interface SEOMetaProps {
  title: string;
  description: string;
  /** Canonical pathname, e.g. "/about". Never a full URL, never a query string. */
  pathname: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  /** Only meaningful with ogType="article". */
  publishedTime?: string;
  modifiedTime?: string;
  /**
   * Emit no canonical at all instead of one pointing at an error page. A 404
   * must not declare a canonical: it tells crawlers the URL is a real, indexable
   * document and competes with the pages it links to.
   */
  omitCanonical?: boolean;
}

/**
 * Single owner of every <head> SEO tag.
 *
 * Pages pass a pathname and the canonical, og:url and twitter:url are all
 * derived from it, so those three can never disagree with each other.
 *
 * Two bugs this replaced:
 *  - Every page hardcoded a www.amingarage.com canonical. The live site
 *    redirects www to non-www with a 301, so every canonical on the site was
 *    pointing at a URL that redirects. That is the single most damaging SEO
 *    defect in the original code.
 *  - The Twitter tags were emitted with `property=` instead of `name=`, which
 *    Twitter/X ignores, so no card was ever produced.
 *
 * `meta name="keywords"` is deliberately absent: Google has ignored it since
 * 2009 and it only advertises terms you are targeting.
 */
const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  pathname,
  ogImage = defaultOgImage,
  ogImageAlt,
  ogType = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  omitCanonical = false,
}) => {
  // Used verbatim. An earlier version appended " | Amin Garage" whenever the
  // title did not already contain the brand, which silently rewrote titles the
  // owner had specified exactly. Two titles deliberately omit the brand, so any
  // automatic suffixing is wrong here.
  const fullTitle = title;

  const url = canonical(pathname);

  // index,follow on everything public. max-image-preview:large lets our photos
  // appear in image results. noindex is opt-in and used only by the 404.
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Built here rather than inline in the JSX attribute.
  const coordinates = business.geo.latitude + ", " + business.geo.longitude;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="author" content={business.name} />

      {!omitCanonical && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:locale" content="en_PK" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter / X. These must use name=, not property=. */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}

      {/* Local relevance. */}
      <meta name="geo.region" content={business.address.regionCode} />
      <meta name="geo.placename" content={business.address.locality} />
      <meta name="ICBM" content={coordinates} />

      {/*
        theme-color is intentionally absent here. It is declared once in
        index.html so it applies before React loads; emitting it from both places
        produced a duplicate on every page.
      */}
    </Helmet>
  );
};

export default SEOMeta;
