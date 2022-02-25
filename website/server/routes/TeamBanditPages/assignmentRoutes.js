const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// get all clients
router.get("/", authorization, async(req, res) => {
    try {

        const user = await pool.query(
            "SELECT assignment_id, assignment_name, assignment_due_date FROM assignments ORDER BY assignment_id ASC"
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;