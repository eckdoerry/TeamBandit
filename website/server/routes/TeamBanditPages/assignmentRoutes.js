const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// get all assignments
router.get("/", authorization, async(req, res) => {
    try {

        const user = await pool.query(
            "SELECT organizer_id, assignment_id, assignment_name, assignment_due_date, assignment_description FROM assignments WHERE organizer_id = $1 ORDER BY assignment_id ASC", [req.user]
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/addAssignment", authorization, async(req, res) => {
    try {

        const {assignment_name, assignment_due_date, assignment_description} = req.body;

        const assignment = await pool.query(
            "INSERT INTO assignments (assignment_name, assignment_due_date, assignment_description, organizer_id) VALUES($1, $2, $3, $4) RETURNING *", [assignment_name, assignment_due_date, assignment_description, req.user]
        );

        res.json(assignment.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;