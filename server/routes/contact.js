import express from "express";
import pool from "../config/dbConn.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

// save contact form message
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    await pool.execute(sql, [name, email, message]);

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// ADMIN ONLY can fetch messages
router.get("/admin/messages", verifyAdmin, async (req, res) => {
  try {
    const [messages] = await pool.execute(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
