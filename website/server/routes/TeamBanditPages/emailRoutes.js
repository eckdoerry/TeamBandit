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

router.get("/emails", authorization, async (req, res) => {
    try {
        console.log(req);
        const user = await pool.query(
            "SELECT message FROM messages WHERE (RECIPIENT = $1 OR SENDER = $1) AND (RECIPIENT = $2 OR SENDER = $2)",
            [req.user]
        );

        console.log(user.rows);
        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// END COURSE ROUTES //

module.exports = router;