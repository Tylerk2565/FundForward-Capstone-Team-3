import pool from '../../config/dbConn.js';

export const handleContactForm = async (req, res) => {
    const { name, email, comment } = req.body;

    const connection = await pool.getConnection();

    try {
        const result = await connection.query(
            "INSERT INTO contact_form (name, email, comment) VALUES (?, ?, ?)",
            [name, email, comment]
        );

        console.log(result);

        res.status(201).send({ "success": "Message sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "Internal Server Error" });
    } finally {
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
    } finally {
        connection.release();
    }
}

export const markAsRead = async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
        const result = await connection.query(
            "UPDATE contact_form SET isRead = 1 WHERE id = ?",
            [id]
        );

        console.log(result);

        res.status(200).send({ "success": "Message marked as read!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "Internal Server Error" });
    } finally {
        connection.release();
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
        const result = await connection.query(
            "DELETE FROM contact_form WHERE id = ?",
            [id]
        );

        console.log(result);

        res.status(200).send({ "success": "Message deleted!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "Internal Server Error" });
    } finally {
        connection.release();
    }
}

