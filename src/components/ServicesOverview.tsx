import React from "react";
import { Link } from "react-router-dom";
import { servicesImages, servicesIcons } from "../assets/assets.js";
import { ArrowRight, Shield } from "lucide-react";
import BannerSlider from "./BannerSlider.js";

const ServicesOverview: React.FC = () => {
  const services = [
    {
      icon: servicesIcons.mechanicIcon,
      title: "Oil Change & Maintenance",
      description:
        "Premium oil changes and comprehensive maintenance to keep your engine running like new.",
      features: [
        "Full Synthetic Options",
        "Multi-Point Inspection",
        "Quick 30-Min Service",
      ],
      price: "From PKR 2,999",
      image: servicesImages.engineMaintenance,
      delay: "0",
      linkText: "Learn More About Engine Maintenance",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.carBreak,
      title: "Brake Repair & Service",
      description:
        "Full brake system service using quality parts and professional attention, and guaranteed safety and stopping power each time.",
      features: [
        "Premium Brake Pads",
        "Rotor Resurfacing",
        "Safety Guaranteed",
        "Break Shoe Replacement",
      ],
      price: "From PKR 11,499",
      image: servicesImages.breakRepair,
      delay: "100",
      linkText: "Learn More About Brake Repair",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.wheelAlignmentIcon,
      title: "Wheel Alignment & Balancing",
      description:
        "Professional tire services with precision mounting and balancing.",
      features: [
        "Expert Installation",
        "Precision Balancing",
        "Road Hazard Warranty",
      ],
      price: "From PKR 1,999",
      image: servicesImages.wheelAlignment,
      delay: "200",
      linkText: "Learn More About Wheel Alignment",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.spareParts,
      title: "Auto Parts",
      description:
        "Advanced computer diagnostics to identify and resolve issues quickly.",
      features: [
        "Latest Diagnostic Tools",
        "Expert Analysis",
        "Detailed Reports",
      ],
      price: "From PKR 7,499",
      image: servicesImages.autoParts,
      delay: "300",
      linkText: "Explore More About Auto Parts",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.paintIcon,
      title: "Body Shop",
      description:
        "Complete body shop capabilities that provide quality repairs, impeccable finishes, and expert restorations to get your car back to its best.",
      features: [
        "Full Body Painting",
        "Interior Painting",
        "Smart Repairing & Painting",
      ],
      price: "From PKR 6,799",
      image: servicesImages.bodyShop,
      delay: "400",
      linkText: "View More About Body Shop",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.gearIcon,
      title: "Transmission Service",
      description:
        "Expert transmission care for smooth and reliable performance.",
      features: ["Fluid Service", "Filter Replacement", "Performance Testing"],
      price: "From PKR 13,799",
      image: servicesImages.transmissionService,
      delay: "500",
      linkText: "Discover More About Transmission Service",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.batteryIcon,
      title: "Battery Replacement",
      description:
        "Professionally tested battery testing and replacement services to guarantee reliable startups, steady power, and worry-free driving each and every time.",
      features: [
        "Free Battery Testing",
        "Premium Batteries",
        "Proper Disposal",
      ],
      price: "From PKR 9,999",
      image: servicesImages.batteryReplacement,
      delay: "600",
      linkText: "Find Out More About Battery Replacement",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.dentingIcon,
      title: "Detailing Services",
      description:
        "Complete interior and exterior detailing to restore your vehicle's shine.",
      features: [
        "Full Interior Cleaning",
        "Exterior Polish & Wax",
        "Odor Elimination",
      ],
      price: "From PKR 14,999",
      image: servicesImages.danting,
      delay: "700",
      linkText: "Learn More About Detailing Services",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.electritionIcon,
      title: "Electrical System Repair",
      description: "Diagnosis and repair of all electrical system components.",
      features: ["Wiring Repair", "Alternator Testing", "Lighting Systems"],
      price: "From PKR 8,999",
      image: servicesImages.electricalService,
      delay: "800",
      linkText: "Explore More About Electrical System Repair",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.wheelAlignmentIcon,
      title: "Suspension Service",
      description:
        "End-to-end suspension checking and repairing to increase stability and comfort and maintain your ride smooth and secure.",
      features: [
        "Shock/Strut Replacement",
        "Alignment Check",
        "Steering System",
      ],
      price: "Comming Soon",
      image: servicesImages.suspensionSerivice,
      delay: "900",
      linkText: "Discover More About Suspension Service",
      linkUrl: "/services",
    },
    {
      icon: servicesIcons.bodyPartsIcon,
      title: "Body Parts",
      description:
        "End-to-end suspension checking and repairing to increase stability and comfort and maintain your ride smooth and secure.",
      features: [
        "Shock/Strut Replacement",
        "Alignment Check",
        "Steering System",
      ],
      price: "Comming Soon",
      image: servicesImages.bodyParts,
      delay: "900",
      linkText: "Discover More About Body Parts",
      linkUrl: "/services",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-2 rounded-full font-semibold mb-6">
            <Shield className="w-5 h-5 mr-2" />
            Professional Services
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              <span className="audioWide">Amin</span> Auto Care
            </span>
            <br />
            <span className="text-black">Services</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From routine checkups to advanced repairs, our car repair workshop
            offers complete automotive care with state-of-the-art technology and
            skilled expertise. Recognized as a trusted auto repair shop, we
            combine precision and innovation to keep every vehicle performing at
            its best. So, when you search for an auto garage near me, you’ll
            find a partner dedicated to delivering unmatched quality and
            reliability.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 overflow-hidden border border-gray-100 animate-fadeInUp`}
              style={{ animationDelay: `${service.delay}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  loading="lazy"
                  fetchPriority="high"
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>

                {/* Icon Overlay */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                    {/* <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div> */}
                    <img
                      loading="lazy"
                      fetchPriority="high"
                      src={service.icon}
                      className="md:h-14 md:w-14 h-10 w-10"
                      alt={`${service.title} at Amin Garage, Faqir Wali`}
                    />
                  </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-gray-900 font-bold text-sm">
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-300 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to={service.linkUrl}
                  className="group/btn inline-flex items-center text-blue-600 hover:text-blue-800 font-bold transition-all duration-300"
                >
                  {service.linkText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Slider */}
        <div className="w-full  overflow-hidden  shadow-lg shadow-gray-600 rounded">
          <div className="md:w-[1300px]  h-[600px] w-full md:h-[380px]">
            <BannerSlider />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ServicesOverview;
