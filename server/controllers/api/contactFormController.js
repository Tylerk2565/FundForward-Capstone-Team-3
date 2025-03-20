import pool from '../../config/dbConn.js';

export const handleContactForm = async (req, res) => {
    const { name, email, comment } = req.body;

    const connection = await pool.getConnection();

    try {
        // await connection.beginTransaction();

        const result = await connection.query(
            "INSERT INTO contact_form (name, email, comment) VALUES (?, ?, ?)",
            [name, email, comment]
        );

        console.log(result);

        // await connection.commit();

        res.status(201).send({ "success": "Message sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "Internal Server Error" });
    }
    finally {
        connection.release();
    }
}

export const getContactForm = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.query(
            "SELECT * FROM contact_form"
        );

        console.log(rows);

        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "Internal Server Error" });
    }
    finally {
        connection.release();
    }
}

