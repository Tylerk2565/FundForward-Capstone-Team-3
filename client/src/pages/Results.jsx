import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";

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
  const [user, setUser] = useState({
    name: "",
    savedProjects: [],
    donatedProjects: [],
    volunteerProjects: [],
  });

  // Simulate fetching projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let maxScore = 0;
        let topCategory = "";

        for (const category in userPreferences) {
          if (userPreferences[category] > maxScore) {
            maxScore = userPreferences[category];
            topCategory = category;
          }
        }

        const searchQuery = CATEGORY_MAPPING[topCategory] || "general";
        const url = `https://fundforward-capstone-team-3.onrender.com/api/fundraiser?&q=${encodeURIComponent(
          searchQuery
        )}`;

        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });

        const projs = response.data.data.search.response.projects.project;

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

  const handleSave = (project) => {
    setUser((prevState) => ({
      ...prevState,
      savedProjects: prevState.savedProjects.some((p) => p.id === project.id)
        ? prevState.savedProjects.filter((p) => p.id !== project.id) // Remove if already saved
        : [...prevState.savedProjects, project], // Add project if not saved
    }));
  };

  const handleDonate = (project) => {
    setUser((prevState) => ({
      ...prevState,
      donatedProjects: [...prevState.donatedProjects, project],
    }));
  };

  const handleVolunteer = (project) => {
    setUser((prevState) => ({
      ...prevState,
      volunteerProjects: [...prevState.volunteerProjects, project],
    }));
  };

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
        {projects.length > 0 ? (
          projects.map((project) => {
            // Check if the project is saved
            const isSaved = user.savedProjects.some((p) => p.id === project.id);
            return (
              <div
                key={project.id}
                className="bg-white shadow-md p-4 rounded-lg relative"
              >
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
                  <button
                    onClick={() => handleDonate(project)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Donate
                  </button>
                  <button
                    onClick={() => handleVolunteer(project)}
                    className="w-full bg-yellow-600 text-white py-2 mt-2 rounded-lg hover:bg-yellow-700 transition duration-300"
                  >
                    Volunteer
                  </button>
                </div>

                {/* Bookmark Icon */}
                <FaBookmark
                  onClick={() => handleSave(project)}
                  className={`absolute bottom-4 right-4 text-2xl cursor-pointer transition-all duration-300 ${
                    isSaved
                      ? "text-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                />

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
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Results;
