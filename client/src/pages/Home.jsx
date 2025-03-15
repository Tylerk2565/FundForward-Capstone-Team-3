import Button from "../components/ButtonNavigator";
import { useState } from "react";
import { Link } from "react-router-dom";

// Dummy project data
const dummyProjects = [
  {
    id: 1,
    title: "Clean Water Initiative",
    summary: "lorem",
    image: "#",
    projectLink: "#",
  },
  {
    id: 2,
    title: "Education for All",
    summary: "lorem",
    image: "#",
    projectLink: "#",
  },
  {
    id: 3,
    title: "Disaster Relief Fund",
    summary: "lorem",
    image: ":#",
    projectLink: "#",
  },
  {
    id: 4,
    title: "Protect the Rainforest",
    summary: "lorem",
    image: "#",
    projectLink: "#",
  },
  {
    id: 5,
    title: "Healthcare for All",
    summary: "lorem",
    image: "#",
    projectLink: "#",
  },
  {
    id: 6,
    title: "Women Empowerment Program",
    summary: "lorem",
    image: "#",
    projectLink: "#",
  },
];

const Home = () => {
  const [projects] = useState(dummyProjects);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#009895] text-white text-center py-20 px-6">
        <h1 className="text-4xl font-bold">
          Empower Communities with FundForward
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          {" "}
          Many local projects and nonprofit initiatives struggle to gain
          visibility and secure the necessary funding and volunteer support,
          making it difficult for individuals to discover and contribute to
          causes that align with their interests and values. Explore local
          projects, volunteer, and contribute to meaningful causes.{" "}
        </p>
      </section>
      {/* Quiz Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">
          Find Projects Based on Your Interests
        </h2>
        {/* How It Works */}
        <section className="py-12 px-6 bg-gray-200 text-center mt-6">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center mt-6 space-y-6 md:space-y-0 md:space-x-12">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
              <h3 className="text-lg font-bold">Step 1</h3>
              <p className="text-gray-600 mt-2">
                Sign up and take a short quiz to discover causes that match your
                passions.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
              <h3 className="text-lg font-bold">Step 2</h3>
              <p className="text-gray-600 mt-2">
                Get personalized project recommendations based on your
                interests.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
              <h3 className="text-lg font-bold">Step 3</h3>
              <p className="text-gray-600 mt-2">
                Donate or volunteer to make a real impact in your community.
              </p>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="bg-green-600 text-white text-center py-12 px-6">
          <h2 className="text-2xl font-bold">Ready to Make a Difference?</h2>
          <p className="mt-2">
            Find a project that aligns with your values and start making an
            impact today.
          </p>
          <div className="mt-6">
            <Button name={"Get Started"} routeName={"quiz"} />
          </div>
        </section>
      </section>
      {/* Why Giving Back Matters */}
      <section className="py-12 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold">Why Giving Back Matters</h2>
        <p className="text-gray-600 mt-4">
          Your contributions-whether through time or donations-help create
          lasting change. Supporting local projects improves education, health,
          and the environment, while strenghtening communities.
        </p>
        <div className="flex justify-center mt-6 space-x-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-700">Volunteers Engaged</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">$1M+</h3>
            <p className="text-gray-700">Funds Raised</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-700">Successful Projects</p>
          </div>
        </div>
      </section>
      {/* Featured Projects */}
      <div className="bg-gray-100 min-h-screen">
        {/* Featured Projects Section */}
        <section className="py-12 px-6">
          <h2 className="text-3xl font-semibold text-center">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Support our top initiatives.
          </p>
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 relative">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-white shadow-lg rounded-lg p-4 relative transform transition-transform hover:scale-105 hover:shadow-xl
                ${
                  index % 2 === 0
                    ? "translate-x-4 -rotate-2"
                    : "-translate-x-4 rotate-2"
                }`}
                style={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-md w-full h-48 object-cover"
                />
                <h3 className="text-lg font-semibold mt-4">{project.title}</h3>
                <p className="text-gray-700 mt-2 text-sm">{project.summary}</p>
                <div className="mt-4">
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
