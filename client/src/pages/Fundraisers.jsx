import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion

const Fundraisers = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchFundraisers = async (query) => {
    try {
      setLoading(true);
      console.log("Searching fundraisers for:", query);
      const response = await axios.get(`http://localhost:3000/api/fundraiser?q=${query}`, {
        headers: { Accept: "application/json" },
      });

      if (response.data.success) {
        console.log(response.data.data.search.response.projects.project);
        const projectData = response.data.data?.search.response.projects?.project || [];
        setProjects(projectData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching fundraiser:", error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchFundraisers(searchTerm);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Fundraisers</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex items-center justify-center gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search projects..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full max-w-md p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500 text-lg">Loading...</p>}

      {/* Display Projects with Staggered Fade-in Animation */}
      {!loading && projects.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }, // Staggered fade-in
          }}
        >
          {projects.map((proj, index) => (
            <motion.div 
              key={proj.id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-200"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Delayed appearance
            >
              {proj.image?.imagelink && proj.image.imagelink.length > 0 && (
                <img 
                  src={proj.image.imagelink.find(img => img.size === "medium")?.url || proj.image.imagelink[0].url} 
                  alt={proj.title} 
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
              )}
              <h2 className="text-lg font-semibold mt-3 text-gray-800">{proj.title}</h2>
              <p className="text-gray-600 text-sm mt-1">
              {proj.summary.split(" ").slice(0, 20).join(" ")}{proj.summary.split(" ").length > 20 ? "..." : ""}
            </p>
              <p className="text-blue-500 text-sm mt-2 font-medium">{proj.country}</p>
              <a 
                href={proj.projectLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                View Project
              </a>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        !loading && <p className="text-center text-gray-500 text-lg">No Projects found</p>
      )}
    </div>
  );
};

export default Fundraisers;






/*

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