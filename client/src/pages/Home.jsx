import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ButtonNavigator";
import LoginModal from "../components/LoginModal";
import Video from "../assets/Video.mp4";
import useAuth from "../hooks/useAuth";
import { FaBookmark } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const isLoggedIn = auth?.username;

  console.log(auth);

  const handleGetStarted = () => {
    if (auth?.username) {
      navigate("/quiz");
    } else {
      setShowLoginModal(true);
    }
  };
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  // Function to handle saving a project
  const handleSave = (project) => {
    // need to implement later
    alert(`Project saved: ${project.title}`);
  };

  // Fetch featured projects from the API
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/featured-fundraisers"
        );
        setProjects(response.data?.data?.projects?.project || []);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-black text-center py-20 px-6 flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={Video} type="video/mp4" />
        </video>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight">
            Empower Communities with FundForward
          </h1>
          <p className="mt-4 text-lg">
            Many local projects and nonprofit initiatives struggle to gain
            visibility and secure funding. Discover meaningful causes,
            volunteer, and make an impact today.
          </p>
          <div className="mt-6">
          {isLoggedIn ? (
            <Button
              name={"View Profile"}
              onClick={() => navigate("/profile")}
              routeName={"profile"}
            />
          ) : (
            <Button
              name={"Register Here"}
              onClick={handleGetStarted}
              routeName={"register"}
            />
          )}
          </div>
        </div>
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
            <Button
              name={"Get Started"}
              onClick={handleGetStarted}
              routeName={"quiz"}
            />
          </div>
        </section>
      </section>
      {/* Why Giving Back Matters */}
      <section className="py-12 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold">Why Giving Back Matters</h2>
        <p className="text-gray-600 mt-4">
          Your contributions—whether through time or donations—help create
          lasting change. Supporting local projects improves education, health,
          and the environment while strengthening communities.
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
      {/* Featured Projects Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center">
          Featured Projects
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Support our top initiatives.
        </p>
        {loading ? (
          <p className="text-center mt-6 text-gray-500">Loading projects...</p>
        ) : error ? (
          <p className="text-center mt-6 text-red-500">{error}</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 relative"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform relative"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  {project.image?.imagelink &&
                    project.image.imagelink.length > 0 && (
                      <img
                        src={
                          project.image.imagelink.find(
                            (img) => img.size === "medium"
                          )?.url || project.image.imagelink[0].url
                        }
                        alt={project.title}
                        className="w-full aspect-[4/3] object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                      />
                    )}
                </div>
                <h2 className="text-xl font-semibold mt-4 text-gray-800">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {project.summary.split(" ").slice(0, 20).join(" ")}
                  {project.summary.split(" ").length > 20 ? "..." : ""}
                </p>
                <p className="text-green-500 text-sm mt-2 font-medium">
                  {project.country}
                </p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{
                        width: `${(project.funding / project.goal) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-500">
                    {Math.round((project.funding / project.goal) * 100)}% of
                    goal reached
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between gap-4">
                  <button
                    onClick={() => alert(`Donate to ${project.title}`)}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Donate
                  </button>
                  <button
                    onClick={() => alert(`Volunteer for ${project.title}`)}
                    className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
                  >
                    Volunteer
                  </button>
                </div>

                {/* Bookmark Icon for Save */}
                <FaBookmark
                  onClick={() => handleSave(project)}
                  className="absolute bottom-4 right-4 text-2xl cursor-pointer transition-all duration-300 hover:text-green-600"
                />

                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  View Project
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
          <LoginModal onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};
export default Home;
