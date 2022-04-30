const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

// EMAIL ROUTES //
router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT client_fname, client_lname, client_email FROM clients WHERE clients.organizer_id = $1",
            [req.user]
        );

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// GETS EMAIL CHAIN FOR SPECIFIC CLIENT
router.get("/getchain/:clientEmail", authorization, async (req, res) => {
    try {
        const { clientEmail } = req.params;
        const organizerEmail = await pool.query(
            "select organizer_email from organizers where organizer_id = $1",
            [req.user]
        );

        const user = await pool.query(
            "SELECT messages.message, messages.sender, clients.client_fname, clients.client_lname FROM messages LEFT JOIN clients ON messages.recipient = clients.client_email OR messages.sender = clients.client_email WHERE (messages.RECIPIENT = $1 AND messages.SENDER = $2) OR (messages.RECIPIENT = $2 AND messages.SENDER = $1)",
            [clientEmail, organizerEmail.rows[0].organizer_email]
        );

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// RETRIEVES ALL INCOMING EMAILS FOR CLIENT LIST
router.get("/getinbox", authorization, async (req, res) => {
    try {
        const organizerEmail = await pool.query(
            "select organizer_email from organizers where organizer_id = $1",
            [req.user]
        );

        const user = await pool.query(
            "SELECT message,sender,read,datetime,subject,message_id,attachment FROM messages WHERE RECIPIENT = $1 ORDER BY datetime DESC",
            [organizerEmail.rows[0].organizer_email]
        );

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// MARKS EMAIL AS READ
router.put("/markread/:messageid", authorization, async (req, res) => {
    try {
        const { messageid } = req.params;

        const updateClient = await pool.query(
            "UPDATE messages SET read = true WHERE message_id = $1",
            [messageid]
        );

        res.json("Marked as read");
    } catch (error) {
        console.error(error.message);
    }
});
// END EMAIL ROUTES //

module.exports = router;
