import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://api.globalgiving.org/api/public/services/search/projects?api_key=${API_KEY}`;

const CATEGORY_MAPPING = {
  A: "education",
  B: "healthcare",
  C: "environment",
  D: "poverty",
  E: "women empowerment",
  F: "disaster relief",
};

const handleFundApi = async (req, res) => {
  console.log("Fund API hit");

  try {
    if (!API_KEY) {
      throw new Error("Missing API key. Ensure it's set in the .env file.");
    }

    const { scores } = req.body;

    if (!scores) {
      return res.status(400).json({ error: "No scores provided" });
    }

    // Calculate highest-scoring category
    let maxScore = 0;
    let topCategory = "";

    for (const category in scores) {
      if (scores[category] > maxScore) {
        maxScore = scores[category];
        topCategory = category;
      }
    }

    console.log("Top category selected:", topCategory);

    // Use top category as search term
    const searchQuery = CATEGORY_MAPPING[topCategory] || "general";

    const url = `${BASE_URL}&q=${encodeURIComponent(searchQuery)}`;

    console.log("Mapped search query:", searchQuery);
    console.log(url);

    // Fetch data from API
    const response = await axios.get(url);

    // Check if projects exist in response
    if (!response.data.projects || response.data.projects.length === 0) {
      return res.json({
        success: false,
        message: "No matching projects found.",
      });
    }

    console.log("Final API request URL:", url);

    res.json({ success: true, projects: response.data.projects });
  } catch (error) {
    console.log("Error fetching data from GlobalGiving API:", error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

export default handleFundApi;
