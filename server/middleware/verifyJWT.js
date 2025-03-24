import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader);

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed.' });
    }
    // console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.error("JWT verification error:", err.message);
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }; // invalid token
            
            // Ensure UserInfo exists to prevent undefined access
            const userInfo = decoded?.UserInfo;
            if (!userInfo) {
                return res.status(403).json({ message: 'Invalid token structure.' });
            }

            req.user = userInfo.username;
            req.roles = userInfo.roles || [];

            next();
        }
    );
};

export default verifyJWT;
