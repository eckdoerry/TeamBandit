const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// get all schedule weeks
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        const user = await pool.query(
            "SELECT schedule_week_id, schedule_week, schedule_description, schedule_deliverables, course_id FROM schedule WHERE course_id = $1 AND organizer_id = $2 ORDER BY schedule_week_id ASC", [course_id, req.user]
        );

        res.json(user.rows);

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

module.exports = router;