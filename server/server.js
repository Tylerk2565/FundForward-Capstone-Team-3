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

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
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

// async function connectDB() {
//   try {
//       // Get a connection from the pool
//       const connection = await pool.getConnection();
//       console.log('Connected to MySQL Database');

//       // Release connection back to the pool (DON'T end it)
//       connection.release();
//   } catch (err) {
//       console.error('Database connection error:', err);
//   }
// }

//connectDB();

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