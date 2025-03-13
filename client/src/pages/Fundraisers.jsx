import { useEffect, useState } from "react";
import axios from "axios";


const Fundraisers = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchProjects = async () => {
    //   try {
    //     const response = await axios.get("https://api.globalgiving.org/api/public/projectservice/all/projects", {
    //       params: {
    //         api_key: import.meta.env.API_KEY, // Replace with your API key
    //       },
    //     });

    //     setProjects(response.data.projects.project); 
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     setLoading(false);
    //   }
    // };

    getFundraiser();
  }, []);

  const getFundraiser = async () => {
    setLoading(true);

    axios.get("https://localhost:3000/api/fundraiser")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    
    <div>
      <h1>Fundraisers</h1>
      {loading ? <p>Loading...</p> : (
          <p>Loaded!</p>
      )}
    </div>
  )
};

export default Fundraisers;
