/**
 * Single source of truth for Amin Garage business data and SEO config.
 *
 * Why this file exists: the pages, the sitemap generator and the JSON-LD graph
 * all need the same phone number, address, hours and canonical host. They used
 * to be copy-pasted per page, and the canonical URLs in particular drifted onto
 * the www host, which the live site 301-redirects away from. Every canonical is
 * now derived from `canonical()` here so the host cannot be got wrong again.
 */

export const SITE_URL = "https://amingarage.com";

export const business = {
  name: "Amin Garage",
  legalName: "Amin Garage",
  tagline: "Auto Repair, Denting & Car Painting in Faqir Wali",
  description:
    "Amin Garage is an auto repair workshop in Faqir Wali, Bahawalnagar District, offering car denting and body repair, painting, mechanical repairs, engine work, suspension, polishing and detailing, spare parts and vehicle inspection.",
  founded: "15+",
  telephone: "+92 307 6552348",
  telephoneE164: "+923076552348",
  email: "amingarage96@gmail.com",
  url: SITE_URL,
  currency: "PKR",
  priceRange: "$$",
  address: {
    /**
     * Plus Code only. The town comes from `locality`. Keeping the town in the
     * street line as well produced "Faqir Wali, Faqir Wali, Bahawalnagar" in the
     * rendered address and in the PostalAddress schema.
     */
    street: "F2MV+4GC",
    locality: "Faqir Wali",
    region: "Bahawalnagar District",
    regionCode: "PK-PB",
    postalCode: "62050",
    country: "PK",
    countryName: "Pakistan",
    plusCode: "F2MV+4GC",
    latitude: 29.482791875211284,
    longitude: 73.0411948755323,
  },
  geo: {
    latitude: 29.482791875211284,
    longitude: 73.0411948755323,
  },
} as const;

/** One-line address for schema and places that cannot break across lines. */
export const addressOneLine = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}, ${business.address.countryName}`;

/**
 * Human-readable hours. Friday is deliberately omitted from `openingHours`
 * below, because omitting a day is how schema.org expresses "closed".
 */
export const businessHours = [
  { days: "Monday – Thursday", time: "8:00 AM – 8:00 PM" },
  { days: "Friday", time: "Closed" },
  { days: "Saturday – Sunday", time: "8:00 AM – 8:00 PM" },
];

export const openingHours = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "08:00",
    closes: "20:00",
  },
  { days: ["Saturday", "Sunday"], opens: "08:00", closes: "20:00" },
];

/** Towns we actually serve. Used for copy and schema `areaServed`. */
export const serviceAreas = [
  "Faqir Wali",
  "Haroonabad",
  "Bahawalnagar",
  "Fort Abbas",
  "Chishtian",
  "Dahranwala",
  "Dunga Bunga",
  "Shaheed Chowk",
  "Khichi Wala",
];

export const socials = [
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61578059121001" },
  { label: "Instagram", href: "https://www.instagram.com/amingarages" },
  { label: "X", href: "https://x.com/amingarage96" },
  { label: "YouTube", href: "https://www.youtube.com/@AminGarage-n6b" },
  { label: "TikTok", href: "https://www.tiktok.com/@amingarage96?lang=en-GB" },
];

/**
 * Share image (og:image).
 *
 * This points at the existing public/favicon.png, which is the only image in the
 * repo that has a stable, unhashed URL. Facebook, WhatsApp, X and LinkedIn cannot
 * resolve a relative or content-hashed path such as the one Vite generates for
 * src/assets/hero.webp, and none of them execute JavaScript.
 *
 * The trade-off is size: favicon.png is 300x200, below the 1200x630 that these
 * platforms prefer, so previews render smaller and may be letterboxed. Dropping a
 * correctly sized image at public/og-image.jpg and pointing this constant at it is
 * a one-line change whenever you want a better preview.
 */
export const ogImage = `${SITE_URL}/favicon.png`;
export const ogImageWidth = 300;
export const ogImageHeight = 200;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.geo.latitude},${business.geo.longitude}`;

/**
 * Builds an absolute canonical URL from a pathname.
 *
 * Always non-www, always HTTPS, never a query string. Pages pass a pathname
 * rather than a full URL precisely so the host cannot be typed in by hand and
 * get it wrong.
 */
export const canonical = (pathname: string): string => {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
};
