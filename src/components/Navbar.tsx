import React, { useState, useEffect } from "react";
import { images } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const toggleDrawer = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav
        className={`sticky top-0 left-0 right-0 w-full h-24 px-4 md:px-8 flex items-center justify-between z-40 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black"
        }`}
      >
        {/* Logo */}
        <NavLink to="/" className="h-20 w-28 flex-shrink-0">
          <img
               className="h-full w-full object-contain"
               src={images.logo}
               alt="Amin Garage"
             />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-1 transition-all duration-300 ease-in-out
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 
                 after:transition-all after:duration-300 after:ease-in-out
                 hover:after:w-full ${
                   isActive ? "after:w-full text-red-500" : "after:w-0"
                 }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Button */}
        <NavLink to="/contact" className="hidden md:flex">
          <button className="flex items-center gap-2 text-white text-sm md:text-lg bg-red-600 px-6 py-3 rounded-md hover:bg-red-700 transition-all duration-300">
            <Link to="tel:+923076552348" className="flex items-center gap-2">
              <FiPhone /> <span>Get Quote</span>
            </Link>
          </button>
        </NavLink>

        {/* Hamburger Button */}
        <button
          onClick={toggleDrawer}
          className="text-white text-2xl md:hidden"
          aria-label="Open navigation menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleDrawer}
        />

        {/* Sidebar Content */}
        <div
          className={`absolute top-0 right-0 h-full w-64 bg-black shadow-lg transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header with Close Icon */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-white text-xl font-semibold">AminGarage</h2>
            <button onClick={toggleDrawer} className="text-white text-2xl">
              <FiX />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col gap-6 px-6 pt-6 text-white text-base">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={toggleDrawer}
                className={({ isActive }) =>
                  `relative block transition-all duration-300 ease-in-out 
                   after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 
                   after:transition-all after:duration-300 after:ease-in-out 
                   hover:after:w-full ${
                     isActive ? "after:w-full text-red-500" : "after:w-0"
                   }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Sidebar Button */}
            <NavLink to="/contact" onClick={toggleDrawer}>
              <button className="flex items-center gap-2 text-white text-base bg-red-600 px-5 py-3 rounded-md hover:bg-red-700 transition-all duration-300 mt-6">
                <FiPhone /> <span>Get Quote</span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
