import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Load environment variables

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://api.globalgiving.org/api/public/projectservice/featured/projects?api_key=${API_KEY}`;

const getFeaturedFundraiser = async (req, res) => {
    console.log("Featured Fundraiser API hit");

    try {
        if (!API_KEY) {
            throw new Error("Missing API key. Ensure it's set in the .env file.");
        }

        // Fetch data from API
        const response = await axios.get(BASE_URL);

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.log('Error fetching featured fundraisers from GlobalGiving API:', error.message);
        
        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
}

export default getFeaturedFundraiser;