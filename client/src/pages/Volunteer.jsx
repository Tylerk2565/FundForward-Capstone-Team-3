import React from "react";
import MapComponent from "../components/MapComponent";
import { motion } from "framer-motion";

const Volunteer = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-100 flex flex-col items-center px-6 md:px-16 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Hero Section */}
      <motion.div 
        className="max-w-4xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">
          Make a Difference in Your Community
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Volunteering is a powerful way to give back, support important causes, and connect with like-minded people. 
          Whether it’s helping at a local shelter, participating in environmental cleanups, or assisting in community programs, 
          every small effort can create a big impact.
        </p>
      </motion.div>

      {/* Map Section */}
      <motion.div 
        className="w-full max-w-6xl mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Find Local Volunteer Opportunities
        </h2>
        <motion.div 
          className="bg-white shadow-lg rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <MapComponent />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Volunteer;

