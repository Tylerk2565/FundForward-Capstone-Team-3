import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBookmark } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Fundraisers = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Default search term
  const { auth } = useAuth();

  const loggedInUser = auth?.username; // Adjust based on auth method

  const searchFundraisers = async (query) => {
    try {
      setLoading(true);
      console.log("Searching fundraisers for:", query);
      const response = await axios.get(
        `http://localhost:3000/api/fundraiser?q=${query}`,
        {
          headers: { Accept: "application/json" },
        }
      );

      if (response.data.success) {
        console.log(response.data.data.search.response.projects.project);
        const projectData =
          response.data.data?.search.response.projects?.project || [];
        setProjects(projectData);
      }
    } catch (error) {
      console.error("Error fetching fundraiser:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle saving a fundraiser
  const handleSave = async (proj) => {
    console.log("Saving fundraiser:", proj.title);

    try {
      const saveData = {
        post_id: proj.id,
        username: loggedInUser, // Use actual logged-in user
        post_desc: proj.summary, // Save the summary as the description
        post_img:
          proj.image?.imagelink.find((img) => img.size === "medium")?.url ||
          proj.image.imagelink[0].url,
      };

      const response = await axios.post("http://localhost:3000/save", saveData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Fundraiser saved:", response.data);
      alert("Fundraiser saved successfully!");
    } catch (error) {
      console.error("Error saving fundraiser:", error.response?.data || error.message);
      alert("Failed to save fundraiser.");
    }
  };

  useEffect(() => {
    searchFundraisers(searchTerm); // Fetch default projects on load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchFundraisers(searchTerm);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Introduction Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-600">
            Support Meaningful Fundraisers
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Fundraisers help provide critical resources to communities in need.
            Whether it’s for education, healthcare, disaster relief, or
            community development, every contribution makes a difference.
            Explore projects that align with your values and be part of the
            change.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search for fundraisers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-4 rounded-lg border border-gray-300 shadow-sm 
            focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md 
            hover:bg-green-500 transition duration-300"
          >
            Search
          </button>
        </form>

        {/* Loading State */}
        {loading && <p className="text-center text-gray-500 text-lg">Loading fundraisers...</p>}

        {/* Display Projects with Staggered Fade-in & Slide-up Animation */}
        {!loading && projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }} // Grid slides up
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }} // Stagger children
          >
            {projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl 
                hover:scale-105 transition-all duration-300 transform"
                initial={{ opacity: 0, y: 50 }} // Cards slide up
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered appearance
              >
                <div className="relative">
                  {proj.image?.imagelink && proj.image.imagelink.length > 0 && (
                    <img
                      src={
                        proj.image.imagelink.find((img) => img.size === "medium")?.url ||
                        proj.image.imagelink[0].url
                      }
                      alt={proj.title}
                      className="w-full aspect-[4/3] object-cover rounded-lg transition-transform 
                      duration-500 hover:scale-105"
                    />
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-4 text-gray-800">{proj.title}</h2>
                <p className="text-gray-600 text-sm mt-2">
                  {proj.summary.split(" ").slice(0, 20).join(" ")}
                  {proj.summary.split(" ").length > 20 ? "..." : ""}
                </p>
                <p className="text-green-500 text-sm mt-2 font-medium">{proj.country}</p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${(proj.funding / proj.goal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-500">
                    {Math.round((proj.funding / proj.goal) * 100)}% of goal reached
                  </p>
                </div>

                {/* Bookmark Icon for Save */}
                <FaBookmark
                  onClick={() => handleSave(proj)}
                  className="absolute bottom-4 right-4 text-2xl cursor-pointer transition-all duration-300 hover:text-green-600"
                />

                <a
                  href={proj.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-lg 
                  hover:bg-green-600 transition duration-200"
                >
                  View Project
                </a>
                <button
                  className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-lg 
                  hover:bg-green-600 transition duration-200 m-1"
                  onClick={() => handleSave(proj)}
                >
                  Save
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && <p className="text-center text-gray-500 text-lg">No projects found. Try searching for another cause!</p>
        )}
      </motion.div>
    </div>
  );
};

export default Fundraisers;



/*

example response from GlobalGiving API:

{
    "success": true,
    "data": {
        "projects": {
            "hasNext": true,
            "nextProjectId": 13,
            "project": [
                {
                    "id": 2,
                    "active": false,
                    "title": "Poor women micro-enterprise development-Indonesia",
                    "summary": "Helping 150 poor Indonesian women in 14 villages to help themselves out of poverty by running a 3-day course with their local NGO teaching basic business skills like accounting and product packaging.",
                    "contactName": "Toby Beresford",
                    "contactTitle": "Managing Director",
                    "contactAddress": "MicroAid Projects Charity",
                    "contactAddress2": "Unit 11 DRCA, Business Centre",
                    "contactCity": "London",
                    "contactState": "United Kingdom",
                    "contactPostal": "SW11 5HD",
                    "contactCountry": "United Kingdom",
                    "contactUrl": "http://www.microaidprojects.org.uk",
                    "projectLink": "https://www.globalgiving.org/projects/poor-women-micro-enterprise-development-indonesia/",
                    "progressReportLink": "https://www.globalgiving.org/projects/poor-women-micro-enterprise-development-indonesia/updates/",
                    "themeName": "Economic Growth",
                    "country": "Indonesia",
                    "iso3166CountryCode": "ID",
                    "region": "Asia and Oceania",
                    "goal": 3046,
                    "funding": 3071,
                    "remaining": 0,
                    "numberOfDonations": 32,
                    "status": "funded",
                    "need": "35 million people in Indonesia live below the poverty line with little or no income. Indonesia is a beautiful country where both Christians and Muslims live side by side. Take Murni for example, a vulnerable woman living on an income below $2 a day. In poor villages simple illnesses like diarrhea can be fatal. When a woman has an income she can pay for medical care.",
                    "longTermImpact": "150 poor families will take the first step out of poverty.",
                    "activities": "150 families will be trained in basic business skills.",
                    "additionalDocumentation": "https://www.globalgiving.org/pfil/2/projdoc.doc",
                    "imageLink": "https://www.globalgiving.org/pfil/2/pict.jpg",
                    "imageGallerySize": 11,
                    "approvedDate": "2003-05-16T12:57:20-04:00",
                    "modifiedDate": "2025-03-14T15:33:31-04:00",
                    "numberOfReports": 9,
                    "dateOfMostRecentReport": "2007-01-04T14:30:46-05:00",
                    "image": {
                        "title": "Poor women micro-enterprise development-Indonesia",
                        "imagelink": [
                            {
                                "url": "https://www.globalgiving.org/pfil/2/pict_grid1.jpg",
                                "size": "small"
                            },
                            {
                                "url": "https://www.globalgiving.org/pfil/2/pict_thumbnail.jpg",
                                "size": "thumbnail"
                            },
                            {
                                "url": "https://www.globalgiving.org/pfil/2/pict_med.jpg",
                                "size": "medium"
                            },
                            {
                                "url": "https://www.globalgiving.org/pfil/2/pict_grid7.jpg",
                                "size": "large"
                            },
                            {
                                "url": "https://www.globalgiving.org/pfil/2/pict_large.jpg",
                                "size": "extraLarge"
                            },
                            {
                                "url": "https://www.globalgiving.org/pfil/2/pict_original.jpg",
                                "size": "original"
                            }
                        ],
                        "id": 0
                    },
                    "themes": {
                        "theme": [
                            {
                                "id": "ecdev",
                                "name": "Economic Growth"
                            }
                        ]
                    },
                    "countries": {
                        "country": [
                            {
                                "name": "Indonesia",
                                "iso3166CountryCode": "ID"
                            }
                        ]
                    },
                    "type": "project"
                }
            ],
            "numberFound": 46794
        }
    }
}

*/
