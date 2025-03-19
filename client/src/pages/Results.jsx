import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Results = () => {
  const location = useLocation();
  const userPreferences = location.state?.userPreferences || {};

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState(
    "Fetching your personalized projects..."
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post("http://localhost:3000/results", {
          scores: userPreferences,
        });

        console.log("Frontend API Response:", response.data);

        if (response.data.success && response.data.projects.length > 0) {
          setProjects(response.data.projects);
          setMessage("");
        } else {
          setMessage(response.data.message || "No matching projects found.");
        }
      } catch (error) {
        console.error("Error fetching personalized projects:", error);
        setMessage("Failed to load projects. Please try again.");
      }
    };

    if (Object.keys(userPreferences).length > 0) {
      fetchProjects();
    } else {
      setMessage("No preferences found. Please complete the quiz.");
    }
  }, [userPreferences]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-600">
        Your Personalized Project Matches
      </h1>
      <p className="text-gray-700 mt-2">
        Based on your quiz answers, here are some projects you may love!
      </p>

      {message && <p className="text-red-500 mt-4">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white shadow-md p-4 rounded-lg">
            <img
              src={
                project.image?.imagelink[0]?.url ||
                "https://via.placeholder.com/400"
              }
              alt={project.title}
              className="rounded-md w-full h-48 object-cover"
            />
            <h3 className="text-lg font-semibold mt-4">{project.title}</h3>
            <p className="text-gray-700 mt-2 text-sm">
              {project.summary || "No summary available."}
            </p>
            <div className="mt-4">
              <a
                href={project.projectLink || "#"}
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
    </div>
  );
};

export default Results;
