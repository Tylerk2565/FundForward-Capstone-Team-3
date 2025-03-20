import pool from "../config/dbConn.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// jwt are a form of user auth
// dont send 

const handleRefreshToken = async(req, res) => {
    const connection = await pool.getConnection();
    try {
        // checks if there is a cookie in the http header
        const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(401)
    
    console.log(cookies.jwt);
    // set refreshToken as the cookie
    const refreshToken = cookies.jwt;

    // is refreshToken in db?
    const [rows] = await connection.query(`
        SELECT u.id, u.username 
        FROM users u
        JOIN refresh_tokens rt ON u.id = rt.user_id
        WHERE rt.refresh_token = ?
    `, [refreshToken]);

    // if not refreshToken in db return 403
    if(rows.length === 0) return res.sendStatus(403); // Forbidden
    
    const foundUser = rows[0];

    const username = foundUser.username;

    // get roles from db based on user_id
    const [roleRows] = await connection.query(
        `SELECT r.role_name FROM roles r
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = ?
        `,
        [foundUser.id]
    )
    // map roles to array
    const roles = roleRows.map(row => row.role_name)

    // evaluate jwt make sure accessToken and refreshToken match
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
            // send back roles and accessToken
            res.json({roles, accessToken, username});
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