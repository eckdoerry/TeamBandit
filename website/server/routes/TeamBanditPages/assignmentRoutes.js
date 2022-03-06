const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const fs = require("fs");
const uuid = require("uuid").v4;

// get all assignments
router.get("/", authorization, async(req, res) => {
    try {

        const user = await pool.query(
            "SELECT organizer_id, assignment_id, assignment_name, assignment_due_date, assignment_description, submission_type, assignment_filename FROM assignments WHERE organizer_id = $1 ORDER BY assignment_id ASC", [req.user]
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/addAssignment", authorization, async(req, res) => {
    try {

        const {assignment_name, assignment_due_date, assignment_description, submission_type, course_id} = req.body;
        var assignment_filename = null;

        if (req.files)
        {

            const oldAssignmentFilename = await pool.query("SELECT organizer_id, assignment_filename FROM assignments WHERE organizer_id = $1", [req.user]);

            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/documents/assignmentInstructions/" + oldAssignmentFilename.rows[0].assignment_filename))
            {
                fs.unlinkSync("../../public/uploads/documents/assignmentInstructions/" + oldAssignmentFilename.rows[0].assignment_filename);
            }

            let assignmentInstructions = req.files.assignmentInstructions;

            assignment_filename = "assignmentInstructions_" + req.user.toString() + "_" + uuid().toString() + "." + assignmentInstructions.mimetype.split("/")[1];
            
            //Use the mv() method to place the file in upload directory
            assignmentInstructions.mv("../../public/uploads/documents/assignmentInstructions/" + assignment_filename);
        }

        const assignment = await pool.query(
            "INSERT INTO assignments (assignment_name, assignment_due_date, assignment_description, submission_type, assignment_filename, course_id, organizer_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [assignment_name, assignment_due_date, assignment_description, submission_type, assignment_filename, course_id, req.user]
        );

        res.json(assignment.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;