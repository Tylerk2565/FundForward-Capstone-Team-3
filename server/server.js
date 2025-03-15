dotenv.config();

import express from "express";
import axios from "axios";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import registerRoute from './routes/register.js'
import authRoute from './routes/auth.js'
import apiRoute from './routes/api/fundraiser.js'
import errorHandler from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
// app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended:false }))
app.use(express.json());
app.use(cookieParser());

app.use('/register', registerRoute)
app.use('/auth', authRoute)
app.use('/api', apiRoute)

app.use(errorHandler);

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     process.exit(1);
//   } else {
//     console.log("Connected to the database");
//   }
// });

app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts('html')) {
      res.send('404 Page'); //200 code by default
  } else if(req.accepts('json')) {
      res.json({ error: '404 Not Found' }); //200 code by default
  } else {
      res.type('txt').send('404 Not Found')
  }
})



app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});