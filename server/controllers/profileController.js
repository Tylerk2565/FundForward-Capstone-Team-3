import pool from "../config/dbConn.js";

const getProfile = async (req, res) => {
  const username = req.user;
  const connection = await pool.getConnection();

  try {

    // Fetch user profile
    const [userRows] = await connection.query("SELECT username, email FROM users WHERE username = ?", [username]);

    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userRows[0];

    // Fetch saved projects
    const [savedProjectsRows] = await connection.query("SELECT post_id, post_desc, post_img FROM posts WHERE username = ?", [username]);

    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      savedProjects: savedProjectsRows,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
};

export default getProfile;