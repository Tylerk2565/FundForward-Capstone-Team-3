import { useEffect, useState } from "react";
import axios from "axios";

const Fundraisers = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://api.globalgiving.org/api/public/projectservice/all/projects", {
          params: {
            api_key: import.meta.env.API_KEY, // Replace with your API key
          },
        });

        setProjects(response.data.projects.project); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Fundraisers</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Fundraisers;
