import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Category mapping
const CATEGORY_MAPPING = {
  A: "education",
  B: "healthcare",
  C: "environment",
  D: "poverty",
  E: "women empowerment",
  F: "disaster relief",
};

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
        // Calculate highest-scoring category
        let maxScore = 0;
        let topCategory = "";

        // Determine which category has the highest score
        for (const category in userPreferences) {
          if (userPreferences[category] > maxScore) {
            maxScore = userPreferences[category];
            topCategory = category;
          }
        }

        console.log("Top category selected:", topCategory);

        const searchQuery = CATEGORY_MAPPING[topCategory] || "general";

        // const apiKey = process.env.VITE_API_KEY;

        const url = `http://localhost:3000/api/fundraiser?&q=${encodeURIComponent(
          searchQuery
        )}`;

        console.log("Mapped search query:", searchQuery);
        console.log(url);

        // Fetch data from GlobalGiving API
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log(response);
        console.log(response.data.data.search.response.projects.project);

        const projs = response.data.data.search.response.projects.project;

        console.log("Frontend API Response:", response.data);

        if (projs && projs.length > 0) {
          setProjects(projs);
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
      {message && <p className="text-red-500 mt-4">{message}</p>}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.length > 0 ? (
          projects.map((project) => (
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
          ))
        ) : (
          <p>No projects found to display at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
