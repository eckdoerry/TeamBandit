const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const validInfo = require("../../middleware/validInfo");

// MENTOR ROUTES //

// Get all mentors based off of course_id, joins with mentorCourses bridge table
router.get("/:course_id", authorization, async(req, res) => {
    try {
        
        const user = await pool.query("SELECT * FROM mentors LEFT JOIN mentorCourses ON mentors.mentor_id = mentorCourses.mentor_id WHERE mentorCourses.course_id = $1", [req.params.course_id]);

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Updates a student based on student id
router.put("/mentors/:id", authorization, async(req, res) => {
    try {

        const updateStudents = await pool.query("UPDATE mentors SET mentor_name = $1, mentor_email = $2 WHERE mentor_id = $3 AND organizer_id = $4", [req.body['mentor_name'], req.body['mentor_email'], req.params['id'], req.user]);

        if(updateStudents.rows.length === 0)
        {
            return res.json("This mentor is not yours!");
        }

        res.json("Mentor list was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Adds a mentor to the mentors database, or adds the course interaction to the bridge table
router.post("/mentors", authorization, async(req,res) =>{
    try{

        // 1. Check to see if the mentor is already in the database
        const exisitingMentor = await pool.query("SELECT mentor_email FROM mentors WHERE mentor_email = $1", [req.body['mentor_email']]);

        // 2. If mentor is already in the database, add the course to the mentorCourses bridge
        if(exisitingMentor.rows.length !== 0)
        {
            var tempMentor = await pool.query("SELECT mentor_id FROM mentors WHERE mentor_email = $1", [req.body['mentor_email']]);
            var alreadyInCourse = await pool.query("SELECT mentor_id, course_id FROM mentorCourses WHERE mentor_id = $1 AND course_id = $2", [tempMentor.rows[0].mentor_id, req.body['courseId']]);

            if(alreadyInCourse.rows.length === 0)
            {
                await pool.query("INSERT INTO mentorCourses(mentor_id, course_id) VALUES ($1, $2)", [tempMentor.rows[0].mentor_id, req.body['courseId']]);
            }

            return res.status(401).json("Mentor Already Exists");
        }

        // 3. Adds mentor to mentor database and adds them to current course
        const mentor = await pool.query("INSERT INTO mentors(mentor_name, mentor_email, organizer_id) VALUES($1, $2, $3) RETURNING *", [req.body['mentor_name'], req.body['mentor_email'], req.user]);
        await pool.query("INSERT INTO mentorCourses(mentor_id, course_id) VALUES ($1, $2)", [mentor.rows[0].mentor_id, req.body['courseId']]);

        res.json(mentor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Deletes mentor from current course, and permanantly deletes them if they are in no course
router.delete("/mentors/:id/:course_id", authorization, async(req, res) => {
    try {
        
        // 1. Grab the total amount of mentions of this mentor
        const mentorCourseAmount = await pool.query("SELECT * FROM mentorCourses WHERE mentor_id = $1", [req.params.id]);

        // 2. Deletes mentor only from mentorCourses unless mentor only has one course association
        if(mentorCourseAmount.rows.length > 1)
        {
            await pool.query("DELETE FROM mentorCourses WHERE mentor_id = $1 AND course_id = $2", [req.params.id, req.params.course_id]);
            
            res.json("Mentor was removed from course!");
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

// END MENTOR ROUTES //

module.exports = router;