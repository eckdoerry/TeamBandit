const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

// EMAIL ROUTES //
router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT client_name, client_email FROM clients WHERE clients.organizer_id = $1",
            [req.user]
        );

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/getchain/:clientEmail", authorization, async (req, res) => {
    try {
        const { clientEmail } = req.params;
        const organizerEmail = await pool.query(
            "select organizer_email from organizers where organizer_id = $1",
            [req.user]
        );

        const user = await pool.query(
            "SELECT message,sender FROM messages WHERE (RECIPIENT = $1 AND SENDER = $2) OR (RECIPIENT = $2 AND SENDER = $1)",
            [clientEmail, organizerEmail.rows[0].organizer_email]
        );

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/getinbox", authorization, async (req, res) => {
    try {
        const organizerEmail = await pool.query(
            "select organizer_email from organizers where organizer_id = $1",
            [req.user]
        );

        const user = await pool.query(
            "SELECT message,sender,read,datetime,subject FROM messages WHERE RECIPIENT = $1",
            [organizerEmail.rows[0].organizer_email]
        );

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// END COURSE ROUTES //

module.exports = router;
