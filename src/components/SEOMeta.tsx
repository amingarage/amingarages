import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?: string;
  ogImage?: string;
  ogType?: string;
  author?: string;
  publisher?: string;
  noindex?: boolean;
}

const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  robots = 'index, follow',
  ogImage,
  ogType = 'website',
  author = 'Amin Garage',
  publisher = 'Amin Garage',
  noindex = false
}) => {
  const fullTitle = title.includes('Amin Garage') ? title : `${title} | Amin Garage`;
  const finalRobots = noindex ? 'noindex, nofollow' : robots;
  const keywordsString = keywords.join(', ');
  
  // Default canonical URL to current page if not provided
  const finalCanonicalUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      <meta name="publisher" content={publisher} />
      <meta name="robots" content={finalRobots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalCanonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      
      {/* Additional Meta Tags */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="PK-PB" />
      <meta name="geo.placename" content="Faqir Wali, Bahawalnagar" />
      <meta name="ICBM" content="29.482791875211284, 73.0411948755323" />
    </Helmet>
  );
};

export default SEOMeta;
