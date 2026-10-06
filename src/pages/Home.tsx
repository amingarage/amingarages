import React from 'react';
import Hero from '../components/Hero';
import ServicesOverview from '../components/ServicesOverview';
import GalleryPreview from '../components/GalleryPreview';
import Testimonials from '../components/Testimonials';
import LocationSection from '../components/LocationSection';
import SEOMeta from '../components/SEOMeta';
import JsonLd from '../components/JsonLd';
import { pageGraph, webPageSchema } from '../data/schema';

const Home: React.FC = () => {
  return (
    <>
      <SEOMeta
        title="Car Repair & Auto Services in Faqir Wali"
        description="Amin Garage is an auto repair workshop in Faqir Wali, Bahawalnagar. Car denting and body repair, painting, mechanical and engine work, polishing, 15+ years. Call for a quote."
        pathname="/"
      />
      <JsonLd
        data={pageGraph([
          webPageSchema({
            pathname: "/",
            name: "Car Repair & Auto Services in Faqir Wali | Amin Garage",
            description:
              "Auto repair, denting, painting and mechanical work in Faqir Wali, Bahawalnagar District.",
          }),
        ])}
      />
      <div>
        <Hero />
        <ServicesOverview />
        <GalleryPreview />
        <Testimonials />
        <LocationSection />
      </div>
    </>
  );
};

export default Home;
