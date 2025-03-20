import React from "react";
import BioCard from "../components/BioCard";
import jerry from "../assets/jerry.jpg";
import sky from "../assets/sky.jpg";
import tyler from "../assets/tyler.jpg";
import kevin from "../assets/kevin.jpg";
import malika from "../assets/malika.png";

const About = () => {
  return (
    <>
      {/* Background Image and Mission Statement */}
      <div className="relative w-full h-96 flex items-center justify-center m-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1507810670121-b08efd787765?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Charlotte Skyline"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Opacity Box with Mission Statement */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center p-6">
          <h1 className="text-white text-5xl font-bold mb-4">About Us</h1>
          <p className="text-white text-xl max-w-2xl text-center">
            Our mission is to make volunteering and supporting non-profits
            easier than ever. We connect volunteers with organizations to create
            a lasting, positive impact on communities.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="flex flex-col items-center justify-center text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <p className="max-w-lg p-8">
          Our team is made up of a group of developers who are passionate about
          creating a platform that connects volunteers with non-profits. We
          believe that by making it easier for volunteers to find opportunities,
          we can help non-profits to find the help they need.
        </p>
      </div>

      {/* Team Members */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <div className="mb-7">
          <BioCard
            name="Malika Khan"
            role="Manager"
            bio="Malika is a passionate developer with 10+ years of experience in full-stack development."
            image={malika} // Replace with a real image URL
            link={"https://www.linkedin.com/in/malika-khan/"}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <BioCard
            name="Jerry Castro Luz"
            role="Apprentice"
            bio="Jerry is a passionate developer with 10+ years of experience in full-stack development."
            image={jerry} // Replace with a real image URL
            link={"https://www.linkedin.com/in/jerry-castro-luz/"}
          />
          <BioCard
            name="Sky Patterson"
            role="Apprentice"
            bio="Sky is a passionate developer with 10+ years of experience in full-stack development."
            image={sky}
            link={"https://www.linkedin.com/in/sky-patterson-baker/"}
          />
          <BioCard
            name="Tyler Krug"
            role="Apprentice"
            bio="Tyler is a passionate developer with 10+ years of experience in full-stack development."
            image={tyler}
            link={"https://www.linkedin.com/in/tyler-krug-5600a4148/"}
          />
          <BioCard
            name="Kevin Guzman"
            role="Apprentice"
            bio="Kevin is a passionate developer with 10+ years of experience in full-stack development."
            image={kevin}
            link={"https://www.linkedin.com/in/kcastr1628/"}
          />
        </div>
      </div>
    </>
  );
};

export default About;
