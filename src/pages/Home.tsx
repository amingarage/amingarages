import React from 'react';
import Hero from '../components/Hero';
import ServicesOverview from '../components/ServicesOverview';
import GalleryPreview from '../components/GalleryPreview';
import Testimonials from '../components/Testimonials';
import LocationSection from '../components/LocationSection';
import SEOMeta from '../components/SEOMeta';

const Home: React.FC = () => {
  return (
    <>
      <SEOMeta
        title="Expert Car Repair & Auto Services in Faqir Wali | Amin Garage"
        description="Professional car repair workshop in Faqir Wali, Bahawalnagar. Expert engine repair, AC service, denting, painting & more. 15+ years experience. Call us now."
        keywords={[
          "car repair Faqir Wali",
          "auto workshop Bahawalnagar",
          "car mechanic near me",
          "engine repair",
          "AC repair",
          "denting painting",
          "car service center",
          "automotive repair Pakistan",
          "Amin Garage"
        ]}
        canonicalUrl="https://www.amingarage.com/"
        ogImage="https://www.amingarage.com/hero.webp"
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