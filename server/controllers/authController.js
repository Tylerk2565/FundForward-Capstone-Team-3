import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/dbConn.js'


// jwt are a form of user auth
// dont send 

const handleLogin = async (req, res) => {
    const  {user, pwd}  = req.body;

    const connection = await pool.getConnection();

    try {
        const [userRows] = await connection
    .query("SELECT id, username, password, email, firstname FROM users WHERE username = ?", [user]);
    console.log(userRows);

    if(userRows.length === 0) return res.status(401).send({"error": "Username or password are invalid"});

    const foundUser = userRows[0];
    const username = foundUser.username;
    const email = foundUser.email;
    const firstname = foundUser.firstname;
    console.log(foundUser);

    const [roleRows] = await connection.query(
        `SELECT r.role_name FROM roles r
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = ?
        `,
        [foundUser.id]
    )
    console.log(roleRows)

    const roles = roleRows.map(row => row.role_name)
    console.log(roles)

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (!match) {
        return res.status(401).json({ "error": 'Invalid username or password' });
    }


    if(match) {
        // const roles = Object.values(rows[0].roles);
        // create JWTs
        // protect api
        const accessToken = jwt.sign(
            {"UserInfo": {
                "username": foundUser.username,
                "roles":roles
            }},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '45m' }
        );

        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // saving refreshToken w/ current user

        const [savingRefreshToken] = await connection.query(
            `INSERT INTO refresh_tokens (user_id, refresh_token)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE refresh_token = VALUES(refresh_token)`,
            [foundUser.id, refreshToken]
        );

        console.log(savingRefreshToken)

        // send refresh token as a cookie in htttp header
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: false, // Set to false for local development (when not using HTTPS)
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'Strict',
        });

        res.json({ roles, accessToken, username, email, firstname }).status(201);
    }    
    
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    } finally {
        connection.release(); //release db connection
    }
}

export default { handleLogin }