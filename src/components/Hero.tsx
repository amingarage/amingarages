import React from "react";
import heroImage from "../assets/hero.webp";

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden text-white">
        {/* Background Image Layer - moved behind everything */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Amin Garage auto repair workshop in Faqir Wali, Bahawalnagar"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Left Red Background with Clip Path */}
        <div
          className="absolute inset-0 bg-red-600 z-10 mix-blend-multiply"
          style={{
            clipPath: "polygon(0 0, 48% 0, 70% 100%, 0% 100%)",
          }}
        ></div>

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col md:flex-row h-full w-full container mx-auto">
          {/* Left Text */}
          <div className="w-full md:w-1/2 mt-24 flex items-center justify-center px-4 sm:px-6 md:px-12">
            <div className="space-y-3 sm:space-y-4 md:space-y-5 max-w-lg">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-snug sm:leading-tight">
                <span className="audioWide">AMIN</span> AUTO CARE <br /> Driven
                by Trust, Powered by Excellence
              </h1>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white">
                Skilled and Certified Experts Over 15 years of mastery in car
                repair, diagnostics, and maintenance. At Amin Auto Care, we
                treat every vehicle with the same dedication and precision as
                our own.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-white text-red-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  GET FREE QUOTE
                </button>
                <button
                  onClick={() => navigate("/services")}
                  className="bg-transparent border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-white hover:text-red-600 transition duration-300"
                >
                  VIEW SERVICES
                </button>
              </div>
            </div>
          </div>

          {/* Right Image - now just empty space since background is handled */}
          <div className="w-full md:w-1/2"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
