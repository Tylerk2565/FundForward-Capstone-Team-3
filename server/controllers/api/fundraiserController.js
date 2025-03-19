import dotenv from "dotenv";
import axios from "axios";

dotenv.config(); // Load environment variables

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://api.globalgiving.org/api/public/services/search/projects?api_key=${API_KEY}`;

const handleFundApi = async (req, res) => {
  console.log("Fund API hit");
  try {
    if (!API_KEY) {
      throw new Error("Missing API key. Ensure it's set in the .env file.");
    }
    const searchQuery = req.query.q || ""; // Get search term from request query

    const url = `${BASE_URL}&q=${encodeURIComponent(searchQuery)}`;

    // Fetch data from API
    const response = await axios.get(url);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.log("Error fetching data from GlobalGiving API:", error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};
export default handleFundApi;
