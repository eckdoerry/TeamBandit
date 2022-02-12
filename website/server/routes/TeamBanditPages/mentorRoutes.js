const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const validInfo = require("../../middleware/validInfo");

// ROUTES //

// get all mentors
router.get("/:course_id", authorization, async(req, res) => {
    try {
        
        const user = await pool.query(
            "SELECT * FROM mentors LEFT JOIN mentorCourses ON mentors.mentor_id = mentorCourses.mentor_id WHERE mentorCourses.course_id = $1", [req.params.course_id]
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//create a mentor
router.post("/mentors", authorization, async(req,res) =>{
    try{
        const exisitingMentor = await pool.query("SELECT mentor_email FROM mentors WHERE mentor_email = $1", [req.body['mentor_email']]);

        if(exisitingMentor.rows.length !== 0)
        {
            var tempMentor = await pool.query("SELECT mentor_id FROM mentors WHERE mentor_email = $1", [req.body['mentor_email']]);
            var alreadyCourse = await pool.query("SELECT mentor_id, course_id FROM mentorCourses WHERE mentor_id = $1 AND course_id = $2", [tempMentor.rows[0].mentor_id, req.body['courseId']]);
            if(alreadyCourse.rows.length === 0)
            {
                await pool.query("INSERT INTO mentorCourses(mentor_id, course_id) VALUES ($1, $2)", [tempMentor.rows[0].mentor_id, req.body['courseId']]);
            }
            return res.status(401).json("Mentor Already Exists");
        }

        const mentor = await pool.query("INSERT INTO mentors(mentor_name, mentor_email, organizer_id) VALUES($1, $2, $3) RETURNING *", [req.body['mentor_name'], req.body['mentor_email'], req.user]);
        await pool.query("INSERT INTO mentorCourses(mentor_id, course_id) VALUES ($1, $2)", [mentor.rows[0].mentor_id, req.body['courseId']]);
        res.json(mentor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a student
router.delete("/mentors/:id/:course_id", authorization, async(req, res) => {
    try {
        const {id} = req.params.id;
        const {course_id} = req.params.course_id;
        
        const checkForStudentAmount = await pool.query("SELECT * FROM mentorCourses WHERE mentor_id = $1", [req.params.id]);

        if(checkForStudentAmount.rows.length > 1)
        {
            await pool.query("DELETE FROM mentorCourses WHERE mentor_id = $1 AND course_id = $2", [req.params.id, req.params.course_id]);
            res.json("Student was removed from course!");
        }
        else
        {
            await pool.query("DELETE FROM mentorCourses WHERE mentor_id = $1 AND course_id = $2", [req.params.id, req.params.course_id]);
            const deleteStudent = await pool.query("DELETE FROM mentors WHERE mentor_id = $1 AND organizer_id = $2", [req.params.id, req.user]);

            if( deleteStudent.rows.length === 0 )
            {
                return res.json("This mentor is not yours!");
            }

            res.json("Mentor was deleted!");
        }

        
    } catch (error) {
        console.error(error.message);
    }
})


module.exports = router;