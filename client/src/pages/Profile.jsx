import { useState } from "react";
import ProjectSection from "../components/ProjectSection";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "#",
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

export default Profile;
