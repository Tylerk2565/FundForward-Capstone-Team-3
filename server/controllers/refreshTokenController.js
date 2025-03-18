import pool from "../config/dbConn.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// jwt are a form of user auth
// dont send 

const handleRefreshToken = async(req, res) => {
    const connection = await pool.getConnection();
    try {

        const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const [rows] = await connection.query(`
        SELECT u.id, u.username 
        FROM users u
        JOIN refresh_tokens rt ON u.id = rt.user_id
        WHERE rt.refresh_token = ?
    `, [refreshToken]);

    if(rows.length === 0) return res.sendStatus(403); // Forbidden
    
    const foundUser = rows[0];

    const [roleRows] = await connection.query(
        `SELECT r.role_name FROM roles r
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = ?
        `,
        [foundUser.id]
    )

    const roles = roleRows.map(row => row.role_name)

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"UserInfo":{
                    "username": decoded.username,
                    "roles": roles
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1m'}
            );
            res.json({roles, accessToken})
        }
    )

    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });

    } finally {
        connection.release(); // release connection to db
    }
    
        
}



export default handleRefreshToken;