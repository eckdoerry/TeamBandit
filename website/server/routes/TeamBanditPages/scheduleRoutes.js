const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

const JSZip = require('jszip');
const fs = require('fs');

// get all schedule weeks
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        const user = await pool.query(
            "SELECT schedule_week_id, schedule_week, schedule_description, schedule_deliverables, course_id FROM schedule WHERE course_id = $1 AND organizer_id = $2 ORDER BY schedule_week_id ASC", [course_id, req.user]
        );

        res.json(user.rows.sort(function(a, b){return new Date(a.schedule_week) - new Date(b.schedule_week)}));

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// get all schedule weeks for students
router.get("/studentSchedule/:course_id", async(req, res) => {
    try {
        const {course_id} = req.params;
        const user = await pool.query(
            "SELECT schedule_week_id, schedule_week, schedule_description, schedule_deliverables, course_id FROM schedule WHERE course_id = $1 ORDER BY schedule_week_id ASC", [course_id]
        );

        res.json(user.rows.sort(function(a, b){return new Date(a.schedule_week) - new Date(b.schedule_week)}));

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/addScheduleWeek", authorization, async(req, res) => {
    try {
        const {schedule_week, schedule_description, schedule_deliverables, course_id} = req.body;
        const scheduleWeek = await pool.query(
            "INSERT INTO schedule (schedule_week, schedule_description, schedule_deliverables, course_id, organizer_id) VALUES($1, $2, $3, $4, $5) RETURNING *", [schedule_week, schedule_description, schedule_deliverables, course_id, req.user]
        );

        res.json(scheduleWeek.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/removeScheduleWeeks", authorization, async(req, res) => {
    try {
        const {course_id} = req.body;
        const removeScheduleWeek = await pool.query(
            "DELETE FROM schedule WHERE course_id = $1 AND organizer_id = $2", [course_id, req.user]
        );

        res.json("Old Schedule Removed");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/createZip/:assignment_id", authorization, async(req, res) => {
    try {
        const {assignment_id} = req.params;
        const assignments = await pool.query(
            "SELECT assignment_id, submission, submission_id FROM assignmentbridgetable WHERE assignment_id = $1 ORDER BY assignment_id ASC", [assignment_id]
        );

        const zip = new JSZip();
        const pdfs = zip.folder("submissions");
        for (var i = 0; i < assignments.rows.length; i++)
        {
            pdfs.file(assignments.rows[i].submission, fs.readFileSync("../../public/uploads/documents/studentAssignments/" + assignments.rows[i].submission), {base64: true});
        }
        
        const content = await zip.generateAsync({type: "nodebuffer"});
        fs.writeFileSync(`../../public/downloads/tempZipFiles/assignment_${assignment_id}_submissions.zip`, content);

        res.json(`/downloads/tempZipFiles/assignment_${assignment_id}_submissions.zip`);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/deleteZip/:filename", authorization, async(req, res) => {
    try {
        const {filename} = req.params;

        if (fs.existsSync("../../public/downloads/tempZipFiles/" + filename))
        {
            fs.unlinkSync("../../public/downloads/tempZipFiles/" + filename);
        }

        res.json("Complete");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;