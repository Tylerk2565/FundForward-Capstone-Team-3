import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const dummyProjects = [
  {
    id: 1,
    title: "Clean Water Initiative",
    summary:
      "Providing access to clean and safe drinking water for rural communities.",
    category: "Environment",
    image: "#",
    projectLink: "#",
  },
  {
    id: 2,
    title: "Education for All",
    summary:
      "Building schools and funding education for underprivileged children.",
    category: "Education",
    image: "#",
    projectLink: "#",
  },
  {
    id: 3,
    title: "Disaster Relief Fund",
    summary:
      "Helping families recover from natural disasters with emergency aid.",
    category: "Disaster Relief",
    image: "#",
    projectLink: "#",
  },
  {
    id: 4,
    title: "Protect the Rainforest",
    summary:
      "Supporting reforestation efforts and protecting endangered species.",
    category: "Environment",
    image: "#",
    projectLink: "#",
  },
  {
    id: 5,
    title: "Healthcare for All",
    summary:
      "Providing medical aid and vaccinations to underserved communities.",
    category: "Healthcare",
    image: "#",
    projectLink: "#",
  },
  {
    id: 6,
    title: "Women Empowerment Program",
    summary: "Supporting women entrepreneurs and providing skills training.",
    category: "Social Impact",
    image: "#",
    projectLink: "#",
  },
];

const Results = () => {
  const location = useLocation();
  const [userPreferences, setUserPreferences] = useState({});
  const [recommendedProjects, setRecommendedProjects] = useState([]);

  useEffect(() => {
    const quizAnswers = location.state?.quizAnswers || {};

    setUserPreferences(quizAnswers);

    // Filter projects based on user input
    const filteredProjects = dummyProjects.filter((project) =>
      quizAnswers.interests?.includes(project.category)
    );

    setRecommendedProjects(filteredProjects);
  }, [location.state]);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <h2 className="text-3xl font-semibold text-center">
        Your Personalized Project Matches
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Based on your quiz answers, here are some projects you may love!
      </p>

      {/* Show recommended projects */}
      {recommendedProjects.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          No matching projects found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {recommendedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white shadow-lg rounded-lg p-4 relative transform transition-transform hover:scale-105 hover:shadow-xl 
                ${
                  index % 2 === 0
                    ? "translate-x-2 -rotate-2"
                    : "-translate-x-2 rotate-2"
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
      )}
    </div>
  );
};

export default Results;
