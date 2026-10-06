import React, { useState } from "react";
import { Phone, Plus } from "lucide-react";
import { images } from "../assets/assets.js";

const WhatsAppButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = "+923076552348";
  const message =
    "Hello! I'm interested in your premium garage services. Can you help me?";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:+${phoneNumber}`, "_self");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-fadeInUp">
          {/* WhatsApp Option */}
          <div
            onClick={handleWhatsAppClick}
            className="group flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-green-500/25"
          >
            <img
              className="h-6 w-6 sm:h-8 sm:w-8"
              src={images.whatsAppIcon}
              alt="WhatsApp"
            />
            <div className="ml-3">
              <div className="text-sm sm:text-base font-bold">WhatsApp</div>
              <div className="text-xs sm:text-sm text-green-100">
                Chat with us now
              </div>
            </div>
          </div>

          {/* Call Option */}
          <div
            onClick={handleCallClick}
            className="group flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <div>
              <div className="text-sm sm:text-base font-bold">Call Now</div>
              <div className="text-xs sm:text-sm text-blue-100">
                +92 (307) 6552348
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative transition-all duration-300 hover:scale-110"
        aria-label="Contact options"
      >
        {/* WhatsApp Icon */}
        <div className="relative">
          {isExpanded ? (
            <div className="bg-green-500 rounded-full p-2">
              <Plus className="w-6 h-6 text-white transition-transform duration-300 rotate-45" />
            </div>
          ) : (
            <img
              className="h-14 w-14 sm:h-16 sm:w-16"
              src={images.whatsAppIcon}
              alt="WhatsApp"
              // srcSet={`${images.whatsAppIcon2x} 2x, ${images.whatsAppIcon3x} 3x`}
            />
          )}
        </div>

        {/* Notification Badge */}
        {!isExpanded && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center animate-bounce z-[60]">
            1
          </div>
        )}
      </button>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
