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
        title="Amin Garage | Auto Repair & Car Painting in Faqir Wali"
        description="Amin Garage is a trusted auto repair workshop in Faqir Wali offering car painting, denting, engine repair, mechanical work, detailing and spare parts."
        pathname="/"
      />
      <JsonLd
        data={pageGraph([
          webPageSchema({
            pathname: "/",
            name: "Amin Garage | Auto Repair & Car Painting in Faqir Wali",
            description:
              "Amin Garage is a trusted auto repair workshop in Faqir Wali offering car painting, denting, engine repair, mechanical work, detailing and spare parts.",
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
