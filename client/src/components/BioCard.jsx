import React from "react";
import { Link } from "react-router-dom";

const BioCard = ({ name, role, bio, image, link }) => {
    return (
      <div className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <img className="w-full h-100 object-cover" src={image} alt={`${name}'s profile`} />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="mt-3 text-gray-700 text-sm">{bio}</p>
          <Link to={link} target="_blank">   
          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
          >
              
            Learn More
          </button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default BioCard;
  