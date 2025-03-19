import React from "react";
import MapComponent from "../components/MapComponent";

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 md:px-16 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
          Make a Difference in Your Community
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Volunteering is a powerful way to give back, support important causes, and connect with like-minded people. 
          Whether it’s helping at a local shelter, participating in environmental cleanups, or assisting in community programs, 
          every small effort can create a big impact.
        </p>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-6xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Find Local Volunteer Opportunities
        </h2>
        <div className="bg-white shadow-lg rounded-xl p-4 text-center ">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
