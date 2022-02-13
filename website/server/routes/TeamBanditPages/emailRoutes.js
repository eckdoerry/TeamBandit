const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// EMAIL ROUTES //

// TODO: PULLS ALL MESSAGES
router.get("/", authorization, async(req, res) => {
    try {
        console.log(req)
        const user = await pool.query(
            "SELECT sender FROM messages"
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});




// END COURSE ROUTES //

module.exports = router;