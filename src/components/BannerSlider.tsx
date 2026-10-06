import React, { useState, useEffect } from "react";
import { banners, bannerMb } from "../assets/assets.js";

const BannerSlider = ({ autoPlay = true, interval = 1500 }) => {
  // The asset maps come from an untyped .js module, so Object.values infers
  // unknown[] and the src/alt props reject it.
  const desktopImages = Object.values(banners) as string[];
  const mobileImages = Object.values(bannerMb) as string[];

  // Choose the smaller length to avoid index mismatch
  const totalSlides = Math.min(desktopImages.length, mobileImages.length);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval, totalSlides]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            {/* Desktop Image */}
            <img
              loading="lazy"
              fetchPriority="high"
              src={desktopImages[index]}
              alt={`Auto repair at the Amin Garage workshop in Faqir Wali, Bahawalnagar`}
              className="hidden md:block w-full h-full object-cover"
            />
            {/* <img
            loading="lazy"
            fetchPriority="high"
              src={banner3}
              alt=""
              className="hidden md:block w-full h-full object-cover"
            /> */}
            {/* Mobile Image */}
            <img
              loading="lazy"
              fetchPriority="high"
              src={mobileImages[index]}
              alt={`Auto repair at the Amin Garage workshop in Faqir Wali, Bahawalnagar`}
              className="block md:hidden w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
