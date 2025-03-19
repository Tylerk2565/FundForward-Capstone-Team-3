import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import cors from "cors";
import mysql from "mysql2";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import registerRoute from './routes/register.js'
import authRoute from './routes/auth.js'
import apiRoute from './routes/api/fundraiser.js'
import logoutRoute from './routes/logout.js'
import errorHandler from "./middleware/errorHandler.js";
import refreshRoute from './routes/refresh.js'
import pool from './config/dbConn.js'
import verifyJWT from "./middleware/verifyJWT.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended:false }))
app.use(express.json());
app.use(cookieParser());

app.use('/register', registerRoute)
app.use('/auth', authRoute)
app.use('/api', apiRoute)
app.use('/refresh', refreshRoute)
app.use('/logout', logoutRoute)

app.use(errorHandler);

// Google Maps Places API Route
app.get("/api/maps/places", async (req, res) => {
  const { lat, lng } = req.query; // Get latitude and longitude from query parameters
  const MAP_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Store your API key in .env

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius: 10000, // 10km radius
          keyword: "volunteer donation non-profit",
          key: MAP_API_KEY,
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching places from Google Maps:", error);
    res.status(500).json({ error: "Error fetching places" });
  }
});

app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts('html')) {
      res.send('404 Page'); //200 code by default
  } else if(req.accepts('json')) {
      res.json({ error: '404 Not Found' }); //200 code by default
  } else {
      res.type('txt').send('404 Not Found')
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
