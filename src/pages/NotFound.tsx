import React from "react";
import { useNavigate } from "react-router-dom";
import SEOMeta from "../components/SEOMeta";

/**
 * Rendered for any URL with no matching route, and prerendered to dist/404.html
 * so the host can return a real 404 status.
 *
 * Two SEO-only changes from the original, both required for the page to behave
 * correctly as an error page:
 *  - noindex, so error URLs never enter the index.
 *  - omitCanonical, because a 404 must not canonicalise itself. A canonical on an
 *    error page tells crawlers the URL is a real, indexable document, which is
 *    the opposite of what a 404 should signal.
 *
 * The markup, classes, heading and button are unchanged from the original.
 */
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEOMeta
        title="Page Not Found - Amin Garage"
        description="The page you're looking for doesn't exist. Visit our homepage for expert car repair services in Faqir Wali, Bahawalnagar. Professional automotive care available."
        pathname="/404"
        noindex={true}
        omitCanonical
      />
      <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="md:text-5xl text-red-500 font-semibold">Not Found</h1>
      <button
        className="px-5 py-2 bg-black text-white text-lg rounded-md ml-5 hover:bg-gray-800 hover:scale-105 transition-all my-10"
        onClick={() => navigate("/")}
      >
        Go To Home
      </button>
    </div>
    </>
  );
};

export default NotFound;
