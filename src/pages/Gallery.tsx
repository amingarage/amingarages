// import React, { useState } from "react";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";
// import { galleryImages } from "../assets/assets";

// const Gallery: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<number | null>(null);

//   const categories = ["All", "Facility", "Services", "Team", "Equipment"];
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredImages =
//     activeCategory === "All"
//       ? galleryImages
//       : galleryImages.filter((img) => img.category === activeCategory);

//   const openLightbox = (index: number) => {
//     setSelectedImage(index);
//   };

//   const closeLightbox = () => {
//     setSelectedImage(null);
//   };

//   const navigateImage = (direction: "prev" | "next") => {
//     if (selectedImage === null) return;

//     const currentIndex = selectedImage;
//     let newIndex;

//     if (direction === "prev") {
//       newIndex =
//         currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
//     } else {
//       newIndex =
//         currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
//     }

//     setSelectedImage(newIndex);
//   };

//   return (
//     <div className="pt-24">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-[#C0C0C0]">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
//           <p className="text-xl md:text-2xl max-w-3xl mx-auto text-red-100">
//             Take a visual tour of our state-of-the-art facility, skilled
//             technicians, and the quality work we deliver every day.
//           </p>
//         </div>
//       </section>

//       {/* Category Filter */}
//       <section className="py-8 bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex flex-wrap justify-center gap-4">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
//                   activeCategory === category
//                     ? "bg-red-600 text-[#C0C0C0]"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Gallery Grid */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 onClick={() => openLightbox(index)}
//               >
//                 <img
//                   src={image.src}
//                   alt={image.alt}
//                   className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
//                   <div className="text-[#C0C0C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
//                     <p className="text-lg font-semibold">{image.alt}</p>
//                     <p className="text-sm text-gray-300">{image.category}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Lightbox */}
//       {selectedImage !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="relative max-w-4xl max-h-full">
//             <img
//               src={filteredImages[selectedImage].src}
//               alt={filteredImages[selectedImage].alt}
//               className="max-w-full max-h-full object-contain"
//             />

//             {/* Close Button */}
//             <button
//               onClick={closeLightbox}
//               className="absolute top-4 right-4 text-[#C0C0C0] hover:text-gray-300 transition-colors duration-200"
//             >
//               <X className="w-8 h-8" />
//             </button>

//             {/* Navigation Buttons */}
//             <button
//               onClick={() => navigateImage("prev")}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C0C0C0] hover:text-gray-300 transition-colors duration-200"
//             >
//               <ChevronLeft className="w-8 h-8" />
//             </button>

//             <button
//               onClick={() => navigateImage("next")}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#C0C0C0]hover:text-gray-300 transition-colors duration-200"
//             >
//               <ChevronRight className="w-8 h-8" />
//             </button>

//             {/* Image Info */}
//             <div className="absolute bottom-4 left-4 text-[#C0C0C0]">
//               <p className="text-lg font-semibold">
//                 {filteredImages[selectedImage].alt}
//               </p>
//               <p className="text-sm text-gray-300">
//                 {selectedImage + 1} of {filteredImages.length} |{" "}
//                 {filteredImages[selectedImage].category}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../assets/assets";
import SEOMeta from "../components/SEOMeta";
import JsonLd from "../components/JsonLd";
import { business } from "../data/site";
import { pageGraph, webPageSchema } from "../data/schema";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = selectedImage;
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    } else {
      newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(newIndex);
  };

  return (
    <>
      <SEOMeta
        title="Workshop Gallery | Car Repair Photos in Faqir Wali"
        description="Photos from the Amin Garage workshop in Faqir Wali: our facility, mechanics at work, and finished body repair and painting jobs. Photos from a Bahawalnagar auto shop."
        pathname="/gallery"
      />
      <JsonLd
        data={pageGraph([
          webPageSchema({
            pathname: "/gallery",
            name: "Workshop Gallery | Car Repair Photos in Faqir Wali",
            description:
              "Photos of the Amin Garage workshop, technicians, and completed repair and painting jobs.",
          }),
          {
            "@type": "ImageGallery",
            "@id": `${business.url}/gallery#gallery`,
            name: "Amin Garage workshop gallery",
            url: `${business.url}/gallery`,
            about: { "@id": `${business.url}/#organization` },
          },
        ])}
      />
      <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-[#C0C0C0]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-red-100">
            Take a visual tour of our state-of-the-art facility, skilled
            technicians, and the quality work we deliver every day.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-[#C0C0C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <p className="text-lg font-semibold">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-[#C0C0C0] hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C0C0C0] hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#C0C0C0] hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 text-[#C0C0C0]">
              <p className="text-lg font-semibold">
                {galleryImages[selectedImage].alt}
              </p>
              <p className="text-sm text-gray-300">
                {selectedImage + 1} of {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Gallery;
