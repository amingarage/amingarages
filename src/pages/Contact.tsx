import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import emailjs from "emailjs-com";
import SEOMeta from "../components/SEOMeta";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
      .send(
        "service_v6zp1th",
        "template_8nexs9m",
        formData,
        "ykZNcKC8bTtC_Ltpu"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Thank you for your message! We'll get back to you soon.");
          setFormData({
            full_name: "",
            email: "",
            phone: "",
            service: "",
            message: "",
          });
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Something went wrong. Please try again later.");
        }
      );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SEOMeta
        title="Contact Amin Garage - Car Repair Service in Faqir Wali | Call +92 307 6552348"
        description="Contact Amin Garage for expert car repair services in Faqir Wali, Bahawalnagar. Call +92 307 6552348, visit our workshop, or fill our online form for quick assistance. Reliable automotive service."
        keywords={[
          "contact car repair",
          "garage phone number",
          "auto workshop contact",
          "car mechanic Faqir Wali",
          "emergency car repair",
          "book car service",
          "Amin Garage contact",
          "Bahawalnagar garage"
        ]}
        canonicalUrl="https://www.amingarage.com/contact"
      />
      <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-[#C0C0C0]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-red-100">
            Connect with our team: Set up service appointments, request a quote
            or have your questions answered about your vehicle.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  You are ready to book a service, or you simply have questions,
                  our team is available to help you. Contact us by using any of
                  the convenient options listed below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-red-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      F2MV+4GC Faqir Wali
                      <br />
                      Faqirwali, Bahawalnagar District
                      <br />
                      Punjab 62050 Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-red-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600">
                      <a href="tel:+923076552348" className="hover:underline">
                        +92 307 6552348
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      Emergency:{" "}
                      <a href="tel:+923076552348" className="hover:underline">
                        +92 307 6552348
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:amingarage96@gmail.com"
                        className="hover:underline"
                      >
                        amingarage96@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday – Thursday: 8:00 AM – 8:00 PM</p>
                      <p>Friday: Closed</p>
                      <p>Saturday: 8:00 AM – 8:00 PM</p>
                      <p>Sunday: 8:00 AM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600 text-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Quick Quote</h3>
                <p className="mb-4">
                  Need a quick estimate? Call us directly for immediate
                  assistance.
                </p>
                <a
                  href="tel:+923076552348"
                  className="inline-flex items-center bg-[#C0C0C0] hover:bg-white text-red-500 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    >
                      <option value="">Select a service</option>
                      <option value="oil-change">
                        Oil Change & Maintenance
                      </option>
                      <option value="brake-repair">
                        Brake Repair & Service
                      </option>
                      <option value="tire-service">
                        Tire Installation & Repair
                      </option>
                      <option value="engine-diagnostics">
                        Engine Diagnostics
                      </option>
                      <option value="ac-repair">AC Repair & Service</option>
                      <option value="transmission">Transmission Service</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    placeholder="Please describe your vehicle issue or service needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">
              Located in the heart of downtown for your convenience
            </p>
          </div>
          <div className="h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3473.1510133295246!2d73.0411948755323!3d29.482791875211284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDI4JzU4LjEiTiA3M8KwMDInMzcuNiJF!5e0!3m2!1sen!2s!4v1750958993699!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Amin Garage Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;
