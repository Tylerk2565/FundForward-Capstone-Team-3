import pool from '../config/dbConn.js'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

const handleNewUser = async (req, res) => {
  const { user, pwd, email, firstname, lastname } = req.body;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // encrypt password
    // add security

    // check for dupe username and email in db
    const [dupeEmail] = await connection
      .query("SELECT id FROM users WHERE email = ?", [email]);
    
    const [dupeUser] = await connection
    .query("SELECT id FROM users WHERE username = ?", [user]);

    if (dupeEmail.length > 0 && dupeUser.length > 0) {
        return res.status(409).json({ "message": "Email and Username are taken" });
    }
    
    if (dupeEmail.length > 0) {
        return res.status(409).json({ "message": "Email is taken" });
    }
    
    if (dupeUser.length > 0) {
        return res.status(409).json({ "message": "Username is taken" });
    }    

    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 12);

    const uniqueId = randomUUID();
    console.log(uniqueId);

    //insert the new user into DB
    // store the new user
    const result = await connection.query(
      "INSERT INTO users (id, username, password, email, firstname, lastname) VALUES (?, ?, ?, ?, ?, ?)",
      [uniqueId, user, hashedPwd, email, firstname, lastname]
    );
    console.log(result)

    const newUserRole = await connection.query(
      `INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`,
      [uniqueId, 1]  // Assuming 1 is the 'User' role ID
    );

    console.log(`New user created with ID: ${uniqueId}`);

    await connection.commit()

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    await connection.rollback();
    console.error("Database Error: ", err);
    res.status(500).json({ message: err.message });
  } finally {
    connection.release();
  }
};

export default { handleNewUser }