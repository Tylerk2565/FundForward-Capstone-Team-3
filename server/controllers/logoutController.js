import pool from "../config/dbConn.js";
// jwt are a form of user auth
// dont send 

const handleLogout = async (req, res) => {
    // on client also delete accessToken
    const connection = await pool.getConnection();

    try {
        const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) // no content to send back
    const refreshToken = cookies.jwt;

    // is refreshToken in db?
    const [rows] = await connection
      .query("SELECT user_id FROM refresh_tokens WHERE refresh_token = ?", [refreshToken]);

    if(rows.length === 0) {
        res.clearCookie('jwt',  { httpOnly: true, sameSite:'None', secure:true ,maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204); // means successful but no content
    }

    // delete refreshToken in db
    const [deleteRefreshToken] = await connection
    .query("DELETE FROM refresh_tokens WHERE refresh_token = ?", [refreshToken]);

    console.log(deleteRefreshToken);

    res.clearCookie('jwt',  { httpOnly: true, sameSite:'None'}) // secure: true - only serves on https
    res.sendStatus(204);
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        connection.release();
    }
    
        
}



export default handleLogout;