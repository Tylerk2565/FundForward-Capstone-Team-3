import pool from "../config/dbConn.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const handleRefreshToken = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const cookies = req.cookies;
        console.log(req.cookies);

        if (!cookies?.jwt) return res.sendStatus(401); // If no refresh token

        const refreshToken = cookies.jwt;

        // Query to check if refresh token is in the database
        const [rows] = await connection.query(`
            SELECT u.id, u.username, u.email, u.firstname 
            FROM users u
            JOIN refresh_tokens rt ON u.id = rt.user_id
            WHERE rt.refresh_token = ?
        `, [refreshToken]);

        if (rows.length === 0) return res.sendStatus(403); // If not found in db

        const foundUser = rows[0];
        const username = foundUser.username;
        const email = foundUser.email;
        const firstname = foundUser.firstname;

        // Get roles from the database
        const [roleRows] = await connection.query(`
            SELECT r.role_name FROM roles r
            JOIN user_roles ur ON r.id = ur.role_id
            WHERE ur.user_id = ?
        `, [foundUser.id]);

        const roles = roleRows.map(row => row.role_name);

        try {
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (foundUser.username !== decoded.username) return res.sendStatus(403); // If user mismatch

            // Generate a new access token
            const accessToken = jwt.sign(
                { "UserInfo": { "username": decoded.username, "roles": roles } },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '45m' }
            );

            // Send back the new access token and user info
            res.json({ roles, accessToken, username, email, firstname });
        } catch (err) {
            console.error("JWT verification error:", err);
            return res.sendStatus(403); // If token verification fails
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        connection.release(); // Always release the connection
    }
};

export default handleRefreshToken;
