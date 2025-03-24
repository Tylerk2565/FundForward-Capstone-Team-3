import dotenv from "dotenv";
import pool from "../config/dbConn.js";

dotenv.config();

// Get a connection from the pool

const handleSavePost = async (req, res) => {
  const { post_id, username, post_title, post_desc, post_img } = req.body; // Extract data from request

  try {
    const connection = await pool.getConnection();

    // Validate required fields
    if (!username || !post_img) {
      return res
        .status(400)
        .json({ error: "Username and post_img are required." });
    }

    // Check if the project is already saved by the user
    const [existingProject] = await connection.query(
      `SELECT * FROM posts WHERE post_id = ? AND username = ?`,
      [post_id, username]
    );

    if (existingProject.length > 0) {
      return res
        .status(400)
        .json({ error: "Project already saved by the user." });
    }

    // Insert the post (status defaults to 'pending')
    const query = `INSERT INTO posts (post_id, username, post_title, post_desc, post_img) VALUES (?, ?, ?, ?, ?)`;
    const values = [post_id, username, post_title, post_desc || null, post_img];

    const [result] = await connection.query(query, values);

    res
      .status(201)
      .json({ message: "Post saved successfully", post_id: result.insertId });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handleSavePost;
