import React from "react";
import { Star, Quote, ThumbsUp, Heart } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Business Owner",
      rating: 5,
      comment:
        "Outstanding experience from start to finish! The professionals at Amin Garage exceeded expectations in resolving my transmission problem. Their unmatched expertise, transparency, and fair pricing have made them my trusted choice for every automotive need.",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      service: "Transmission Repair",
      delay: "0",
    },
    {
      name: "Mike Rodriguez",
      position: "Fleet Manager",
      rating: 5,
      comment:
        "For more than three years, I’ve entrusted our company fleet to Amin Garage, and they never disappoint. Always dependable, highly professional, and committed to timely delivery, their workmanship stands out for its exceptional quality.",
      image:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
      service: "Fleet Maintenance",
      delay: "200",
    },
    {
      name: "Emily Chen",
      position: "Marketing Director",
      rating: 5,
      comment:
        "Amin Garage helped me avoid unnecessary expenses by pinpointing my engine problem with precision and delivering an affordable solution. Their honesty, skill, and unmatched expertise make them truly stand out in the industry.",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      service: "Engine Diagnostics",
      delay: "400",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-3 rounded-full font-semibold mb-8">
            <Heart className="w-5 h-5 mr-2" />
            Customer Love
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-800 bg-clip-text text-transparent">
              What Our Customers
            </span>
            <br />
            <span className="text-gray-800">Say About Us</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Hear from Our Customers Beyond promises, it’s real experiences that
            define us. Discover how drivers trust Amin Garage through the words
            of our delightedcustomers.
          </p>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 p-8 border border-gray-100 relative overflow-hidden animate-fadeInUp`}
              style={{ animationDelay: `${testimonial.delay}ms` }}
            >
              {/* Background Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

              {/* Quote Icon */}
              <div className="relative z-10 mb-6">
                <div className="bg-gradient-to-br from-red-400 to-red-500 p-4 rounded-2xl w-fit">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current mr-1"
                  />
                ))}
                <span className="ml-2 text-gray-600 font-semibold">5.0</span>
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-8 text-lg leading-relaxed relative z-10 font-medium">
                "{testimonial.comment}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center relative z-10">
                <div className="relative">
                  <img
                    loading="lazy"
                    fetchPriority="high"
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-red-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <ThumbsUp className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {testimonial.position}
                  </p>
                  <p className="text-blue-600 text-sm font-semibold">
                    {testimonial.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  5000+
                </div>
                <p className="text-blue-100 font-semibold">Happy Customers</p>
              </div>
              <div className="group">
                <div className="text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  4.9
                </div>
                <p className="text-blue-100 font-semibold">Average Rating</p>
              </div>
              <div className="group">
                <div className="text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <p className="text-blue-100 font-semibold">Years Experience</p>
              </div>
              <div className="group">
                <div className="text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  98%
                </div>
                <p className="text-blue-100 font-semibold">Satisfaction Rate</p>
              </div>
            </div>
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

export default Testimonials;
