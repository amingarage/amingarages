import React from "react";

/**
 * Renders the single JSON-LD script tag a page owns.
 *
 * Every schema a page needs is bundled into one @graph by pageGraph(), so there
 * is exactly one <script type="application/ld+json"> per page and no chance of
 * two competing graphs describing the same entity.
 */
const JsonLd: React.FC<{
  data: Record<string, unknown> | null | undefined;
}> = ({ data }) => {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Payload is assembled from our own data modules, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
