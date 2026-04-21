import React from "react";
import { Users, Award, Wrench, Heart } from "lucide-react";
import { teamImages } from "../assets/assets";
import SEOMeta from "../components/SEOMeta";

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Muhammad Adnan Amin",
      position: "Founder , CEO & Owner",
      experience: "20+ years",
      image: teamImages.adnanAminOwner,
    },
    {
      name: "Zeeshan maqsood",
      position: "Supervisor & Mechanic",
      experience: "15+ years",
      image: teamImages.zeshaanSupervisor,
    },
    {
      name: "Muhammad Sufyan Amin",
      position: "Manager",
      experience: "7+ years",
      image: teamImages.sufyanAminManager,
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description:
        "Every decision we make is centered around providing the best experience for our customers.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Work",
      description:
        "Quality Work – We are committed to delivering superior craftsmanship and take pride in using only the highest-quality parts to ensure lasting performance",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Honest Service",
      description:
        "Honest Service-We hold that we are fully transparent and honest in all interactions. There are no fees, no extra work, no fine print, and nothing unnecessary: it is a simple service you can rely on.",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Expert Technicians",
      description:
        "Our certified technicians are undergoing constant training in order to stay on the curve; they are learning the newest automotive technologies and ways of repairing them.",
    },
  ];

  return (
    <>
      <SEOMeta
        title="About Amin Garage - Trusted Auto Repair Experts in Bahawalnagar"
        description="Meet our expert team at Amin Garage. 15+ years serving Faqir Wali with professional car repair, engine services, and honest automotive care. Learn our trusted story and values."
        keywords={[
          "about Amin Garage",
          "auto repair team Bahawalnagar",
          "car mechanics Faqir Wali",
          "Muhammad Adnan Amin",
          "automotive experts Pakistan",
          "trusted garage",
          "professional mechanics",
          "car service history"
        ]}
        canonicalUrl="https://www.amingarage.com/about"
      />
      <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-[#C0C0C0]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About Amin Garage
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-red-100">
            Proudly serving drivers for 15+ years, we are your dependable
            auto-motive partner dedicated to keeping every journey safe, smooth,
            and worry-free.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 text-[#C0C0C0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p className="">
                  Established in 2025 by automotive enthusiast Adnan Amin, Amin
                  Garage began as a family-driven workshop with a clear
                  vision—to de-liver honest, dependable automotive care to the
                  community. What started as a modest one-bay shop has evolved
                  into a full-service automotive center, yet our values of
                  integrity, trust, and customer-first ser-vice remain at the
                  heart of everything we do. We pride ourselves on treating
                  every client like family and every vehicle with meticulous
                  care. Today, our team of certified technicians proudly serves
                  hundreds of customers each month, managing everything from
                  routine maintenance to advanced repairs with precision,
                  dedication, and unmatched quality.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our garage facility"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-red-500 text-[#C0C0C0] p-6 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm">Years of Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 text-[#C0C0C0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-[#C0C0C0] p-8 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600">
                To deliver exceptional automotive services that priori-tize
                customer safety and satisfaction, while fostering lasting
                relation-ships built on trust, transparency, and uncompromising
                workmanship.
              </p>
            </div>
            <div className="text-[#C0C0C0] p-8 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600">
                To become the most trusted automotive service centre in our
                community, recognized for our expertise, integrity, and
                unwaver-ing commitment to keeping every customer safe on the
                road.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Values—Customer First. Every choice we make is guided by a
              single priority: delivering the best possible experience for every
              customer, every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-red-500 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certified and highly experienced technicians are obsessed with
              providing the best automotive care; they can blend skills,
              commitment and knowledge to ensure your vehicle is in its best
              condition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[28rem] object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-red-500 font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-gray-600">
                    {member.experience} experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
