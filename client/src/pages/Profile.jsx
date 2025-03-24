import { useEffect, useState } from "react";
import ProjectSection from "../components/ProjectSection";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { auth } = useAuth();

  const [user, setUser] = useState({
    name: auth?.user?.name || "",
    email: auth?.user?.email || "",
    avatar: "",
  });

  const [savedProjects, setSavedProjects] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setUser({
          name: response.data.username,
          email: response.data.email,
          avatar: response.data.avatar,
        });
        setSavedProjects(response.data.savedProjects || []); 
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [auth.accessToken]);

  
  // Remove a saved project
  const removeSavedProject = (id) => {
    setSavedProjects(savedProjects.filter((project) => project.id !== id));
  };

  // Logout function from hook
  const logout = useLogout();

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

      {/* Donated Projects Section
      <ProjectSection
        title="Projects You Donated To"
        description="See the impact of your contributions."
        projects={donatedProjects}
      />

      Volunteer Projects Section
      <ProjectSection
        title="Projects You Want to Volunteer At"
        description="Get involved and make a difference."
        projects={volunteerProjects}
      /> */}

      {/* Logout Button */}
      <div className="flex flex-col justify-end items-center p-6 mt-auto">
        <button
          onClick={logout}
          className="w-full max-w-xs bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

// Project Section

export default Profile;
