const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const fs = require("fs");
const uuid = require("uuid").v4;

// get all assignments
router.get("/", authorization, async(req, res) => {
    try {

        const user = await pool.query(
            "SELECT organizer_id, assignment_id, assignment_name, assignment_start_date, assignment_due_date, assignment_description, submission_type, assignment_filename, course_id FROM assignments WHERE organizer_id = $1 ORDER BY assignment_id ASC", [req.user]
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// get a single assignment
router.get("/assignment/:assignment_id", authorization, async(req, res) => {
    try {
        const {assignment_id} = req.params;
        const user = await pool.query(
            "SELECT assignment_filename FROM assignments WHERE assignment_id = $1", [assignment_id]
        );

        res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/addAssignment", authorization, async(req, res) => {
    try {

        const {assignment_name, assignment_start_date, assignment_due_date, assignment_description, submission_type, course_id} = req.body;
        var assignment_filename = null;
        if (req.files) 
        {
            let assignmentInstructions = req.files.assignmentInstructions;

            assignment_filename = "assignmentInstructions_" + req.user.toString() + "_" + uuid().toString() + "." + assignmentInstructions.mimetype.split("/")[1];

            //Use the mv() method to place the file in upload directory
            assignmentInstructions.mv("../../public/uploads/documents/assignmentInstructions/" + assignment_filename);
        }

        const assignment = await pool.query(
            "INSERT INTO assignments (assignment_name, assignment_start_date, assignment_due_date, assignment_description, submission_type, assignment_filename, course_id, organizer_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [assignment_name, assignment_start_date, assignment_due_date, assignment_description, submission_type, assignment_filename, course_id, req.user]
        );

        res.json(assignment.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


router.put("/editAssignment/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const {assignment_name, assignment_description} = req.body;

        const updateAssignment = await pool.query("UPDATE assignments SET assignment_name = $1, assignment_description = $2 WHERE assignment_id = $3 AND organizer_id = $4 RETURNING *", [assignment_name, assignment_description, id, req.user]);

        if(updateAssignment.rows.length === 0)
        {
            return res.json("This assignment is not yours!");
        }

        res.json("Assignment was updated!");
    } catch (error) {
        console.error(error.message);
    }
});


router.delete("/deleteAssignment/:id", authorization, async(req, res) => {
    try {
        
        const {id} = req.params;

        const deleteAssignment = await pool.query("DELETE FROM assignments WHERE assignment_id = $1 RETURNING *", [id]);

        const oldAssignmentFilename = deleteAssignment.rows[0].assignment_filename;
        if (oldAssignmentFilename != null)
        {
            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/documents/assignmentInstructions/" + oldAssignmentFilename))
            {
                fs.unlinkSync("../../public/uploads/documents/assignmentInstructions/" + oldAssignmentFilename);
            }
        }
        
        if( deleteAssignment.rows.length === 0 )
        {
            return res.json("This assignment is not yours!");
        }

        res.json("Assignment and all related data were deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;