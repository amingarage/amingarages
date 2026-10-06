/**
 * Blog metadata, single source of truth.
 *
 * The post bodies and images stay in src/pages/BlogDetails.tsx; this module owns
 * only the text fields the sitemap generator and the JSON-LD graph need, and it
 * must stay in step with BlogDetails. Keeping the dates here is what lets
 * src/sitemap-entry.ts produce real <lastmod> values without parsing a React
 * page.
 *
 * Deliberately does NOT import the blog image assets. Doing so would drag the
 * whole asset graph into the sitemap generator for no reason, and image URLs are
 * resolved per build by Vite with a content hash, so a value cached here would
 * go stale the next time an image changed. The post image is passed in from the
 * page instead.
 */
export interface BlogMeta {
  id: string;
  title: string;
  /** Title tag text, without the brand suffix SEOMeta appends. */
  seoTitle: string;
  description: string;
  category: string;
  /** Human-readable, as originally published. */
  date: string;
  /** Machine-readable, for <time datetime>, schema.org and the sitemap. */
  dateISO: string;
}

export const blogs: BlogMeta[] = [
  {
    id: "auto-car-air-conditioning-service-beat-the-heat-with-amin-garage",
    title: "Auto Car Air Conditioning Service: Beat the Heat with Amin Garage",
    seoTitle: "Car AC Service in Faqir Wali",
    description:
      "Car AC service in Faqir Wali: leak detection, compressor checks and gas recharge explained by Amin Garage. Beat the summer heat. Call to book.",
    category: "AC & Cooling",
    date: "September 16, 2025",
    dateISO: "2025-09-16",
  },
  {
    id: "car-tire-care-maximizing-life-and-performance",
    title: "Car Tire Care: Maximizing Life and Performance",
    seoTitle: "Car Tire Care in Faqir Wali",
    description:
      "Pressure, tread depth, rotation and balancing: how to get more from your tires and wear them evenly. Tyre care advice from Amin Garage, Bahawalnagar.",
    category: "Tire & Wheels",
    date: "September 16, 2025",
    dateISO: "2025-09-16",
  },
  {
    id: "automobile-mechanic-you-drive-the-car-but-not-the-expertise",
    title: "Automobile Mechanic: You Drive the Car but Not the Expertise",
    seoTitle: "What an Auto Mechanic Actually Does",
    description:
      "What an automobile mechanic does that you cannot: reading fault codes, compression and leak-down testing, and diagnosing rather than guessing. Amin Garage.",
    category: "Mechanics",
    date: "September 16, 2025",
    dateISO: "2025-09-16",
  },
  {
    id: "car-painting-restoring-beauty-and-value-to-your-vehicle",
    title: "Car Painting: Restoring Beauty and Value to Your Vehicle",
    seoTitle: "Car Painting and Respray Guide",
    description:
      "Car painting explained: surface prep, primer, colour matching and clear coat, and how a respray protects your car's value. Workshop guide from Amin Garage.",
    category: "Painting",
    date: "March 28, 2024",
    dateISO: "2024-03-28",
  },
  {
    id: "car-polishing-refining-shine-and-safeguarding-your-automobile",
    title: "Car Polishing: Refining Shine and Safeguarding Your Automobile",
    seoTitle: "Car Polishing vs. Waxing",
    description:
      "Polishing removes swirl marks and oxidation; waxing and ceramic seal the result. What each does, which your car needs, and how long it lasts.",
    category: "Detailing",
    date: "March 28, 2024",
    dateISO: "2024-03-28",
  },
  {
    id: "auto-denting-repairing-strength-and-beauty-to-your-car",
    title: "Auto Denting: Repairing Strength and Beauty to Your Car",
    seoTitle: "Auto Denting: PDR vs. Repaint",
    description:
      "Paintless dent repair versus a panel repaint: how to tell which your damage needs, and why rust is worse than the dent it started as.",
    category: "Body Shop",
    date: "April 3, 2024",
    dateISO: "2024-04-03",
  },
  {
    id: "auto-body-parts-how-to-make-your-car-strong-safe-and-styled",
    title: "Auto Body Parts: How to Make Your Car Strong, Safe, and Styled",
    seoTitle: "Choosing Auto Body Parts",
    description:
      "OEM, aftermarket and salvage parts compared, plus what to check before fitting a bumper or panel yourself. Advice from Amin Garage in Bahawalnagar.",
    category: "Body Parts",
    date: "April 9, 2024",
    dateISO: "2024-04-09",
  },
  {
    id: "auto-spare-parts-reliable-and-roadworthy-performance",
    title: "Auto Spare Parts: Reliable and Roadworthy Performance",
    seoTitle: "Where to Buy Auto Spare Parts",
    description:
      "OEM versus aftermarket spare parts, how to spot a bad part before it is fitted, and what actually affects the life of a component.",
    category: "Spare Parts",
    date: "April 16, 2024",
    dateISO: "2024-04-16",
  },
];

export const blogById = (id: string): BlogMeta | undefined =>
  blogs.find((b) => b.id === id);

export const blogPath = (id: string): string => `/blog/${id}`;
