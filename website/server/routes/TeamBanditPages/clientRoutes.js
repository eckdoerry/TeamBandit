const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const validInfo = require("../../middleware/validInfo");

// ROUTES //

// get all clients
router.get("/", authorization, async(req, res) => {
    try {
        
        const user = await pool.query(
            "SELECT * FROM clients ORDER BY client_id ASC "
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;