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
    seoTitle: "Car AC Service & Repair in Faqir Wali | Amin Garage",
    description:
      "Learn why regular car AC service matters and how Amin Garage provides reliable AC repair, cooling system checks and maintenance in Faqir Wali.",
    category: "AC & Cooling",
    date: "September 16, 2025",
    dateISO: "2025-09-16",
  },
  {
    id: "car-tire-care-maximizing-life-and-performance",
    title: "Car Tire Care: Maximizing Life and Performance",
    seoTitle: "Car Tire Care Tips | Tyre Maintenance Guide | Amin Garage",
    description:
      "Learn practical car tire care tips to improve tire life, safety and performance with professional tyre inspection and service from Amin Garage.",
    category: "Tire & Wheels",
    date: "September 16, 2025",
    dateISO: "2025-09-16",
  },
  {
    id: "automobile-mechanic-you-drive-the-car-but-not-the-expertise",
    title: "Automobile Mechanic: You Drive the Car but Not the Expertise",
    seoTitle: "How to Choose a Good Car Mechanic | Amin Garage",
    description:
      "Learn how to choose a reliable automobile mechanic and why professional diagnosis, quality repairs and experienced technicians matter for your vehicle.",
    category: "Mechanics",
    date: "September 16, 2025",
    dateISO: "2025-09-16",
  },
  {
    id: "car-painting-restoring-beauty-and-value-to-your-vehicle",
    title: "Car Painting: Restoring Beauty and Value to Your Vehicle",
    seoTitle: "Car Painting in Faqir Wali | Professional Auto Painting",
    description:
      "Learn how professional car painting restores your vehicle's appearance and protection. Amin Garage offers quality auto painting in Faqir Wali.",
    category: "Painting",
    date: "March 28, 2024",
    dateISO: "2024-03-28",
  },
  {
    id: "car-polishing-refining-shine-and-safeguarding-your-automobile",
    title: "Car Polishing: Refining Shine and Safeguarding Your Automobile",
    seoTitle: "Car Polishing in Faqir Wali | Shine & Paint Protection",
    description:
      "Learn how car polishing restores shine and protects your vehicle's paint. Amin Garage provides professional car polishing and detailing in Faqir Wali.",
    category: "Detailing",
    date: "March 28, 2024",
    dateISO: "2024-03-28",
  },
  {
    id: "auto-denting-repairing-strength-and-beauty-to-your-car",
    title: "Auto Denting: Repairing Strength and Beauty to Your Car",
    seoTitle: "Auto Denting in Faqir Wali | Car Dent Repair | Amin Garage",
    description:
      "Learn how professional auto denting restores your vehicle's body and appearance. Amin Garage provides dent repair and body work in Faqir Wali.",
    category: "Body Shop",
    date: "April 3, 2024",
    dateISO: "2024-04-03",
  },
  {
    id: "auto-body-parts-how-to-make-your-car-strong-safe-and-styled",
    title: "Auto Body Parts: How to Make Your Car Strong, Safe, and Styled",
    seoTitle: "Auto Body Parts & Repair | Amin Garage Faqir Wali",
    description:
      "Learn about vehicle body parts, replacement and repair options and how quality body components help keep your car safe and looking its best.",
    category: "Body Parts",
    date: "April 9, 2024",
    dateISO: "2024-04-09",
  },
  {
    id: "auto-spare-parts-reliable-and-roadworthy-performance",
    title: "Auto Spare Parts: Reliable and Roadworthy Performance",
    seoTitle: "Auto Spare Parts in Faqir Wali | Amin Garage",
    description:
      "Learn how quality auto spare parts help maintain vehicle performance, reliability and safety. Amin Garage provides trusted parts and accessories.",
    category: "Spare Parts",
    date: "April 16, 2024",
    dateISO: "2024-04-16",
  },
];

export const blogById = (id: string): BlogMeta | undefined =>
  blogs.find((b) => b.id === id);

export const blogPath = (id: string): string => `/blog/${id}`;
