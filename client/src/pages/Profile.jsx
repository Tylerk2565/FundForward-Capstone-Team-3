import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://source.unsplash.com/100x100/?face",
  });

  const [savedProjects, setSavedProjects] = useState([
    {
      id: 1,
      title: "Clean Water Initiative",
      summary:
        "Providing access to clean and safe drinking water for rural communities.",
      image: "#",
      projectLink: "#",
    },
    {
      id: 2,
      title: "Education for All",
      summary:
        "Building schools and funding education for underprivileged children.",
      image: "#",
      projectLink: "#",
    },
  ]);

  const [donatedProjects, setDonatedProjects] = useState([
    {
      id: 3,
      title: "Disaster Relief Fund",
      summary:
        "Helping families recover from natural disasters with emergency aid.",
      image: "#",
      projectLink: "#",
    },
  ]);

  const [volunteerProjects, setVolunteerProjects] = useState([
    {
      id: 4,
      title: "Community Garden Initiative",
      summary:
        "Creating green spaces and providing fresh produce for local communities.",
      image: "#",
      projectLink: "#",
    },
  ]);

  // Remove a saved project
  const removeSavedProject = (id) => {
    setSavedProjects(savedProjects.filter((project) => project.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      {/* Profile Header */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Saved Projects Section */}
      <ProjectSection
        title="Your Saved Projects"
        description="Easily revisit projects you care about."
        projects={savedProjects}
        removeProject={removeSavedProject}
      />

      {/* Donated Projects Section */}
      <ProjectSection
        title="Projects You Donated To"
        description="See the impact of your contributions."
        projects={donatedProjects}
      />

      {/* Volunteer Projects Section */}
      <ProjectSection
        title="Projects You Want to Volunteer At"
        description="Get involved and make a difference."
        projects={volunteerProjects}
      />
    </div>
  );
};

// Project Section
const ProjectSection = ({ title, description, projects, removeProject }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      <p className="text-gray-600 text-center mt-2">{description}</p>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map((project, index) => (
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
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Learn More
                </a>
                {removeProject && (
                  <button
                    onClick={() => removeProject(project.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
