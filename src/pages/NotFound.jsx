import React from "react";
import { useNavigate } from "react-router-dom";
import SEOMeta from "../components/SEOMeta";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEOMeta
        title="Page Not Found - Amin Garage"
        description="The page you're looking for doesn't exist. Visit our homepage for expert car repair services in Faqir Wali, Bahawalnagar. Professional automotive care available."
        keywords={[
          "404 error",
          "page not found",
          "Amin Garage",
          "car repair Pakistan"
        ]}
        canonicalUrl="https://www.amingarage.com/404"
        noindex={true}
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
