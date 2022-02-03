const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// get all courses
router.get("/", authorization, async(req, res) => {
    try {
        
        const user = await pool.query(
            "SELECT organizers.organizer_fname, courses.course_id, courses.course_description, courses.course_title, courses.course_semester FROM organizers LEFT JOIN courses ON organizers.organizer_id = courses.organizer_id WHERE organizers.organizer_id = $1",
            [req.user]
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// update a course
router.put("/courses/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const {title, semester, description} = req.body;
        const updateTodo = await pool.query("UPDATE courses SET course_description = $1, course_title = $4, course_semester = $5 WHERE course_id = $2 AND organizer_id = $3 RETURNING *", [description, id, req.user, title, semester]);

        if(updateTodo.rows.length === 0)
        {
            return res.json("This course is not yours!");
        }

        res.json("Course was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Add a new course
router.post("/courses", authorization, async(req,res) =>{
    try{
        const { title, semester, description } = req.body;
        console.log(req.user);
        const newCourse = await pool.query("INSERT INTO courses (organizer_id, course_title, course_semester, course_description) VALUES($1, $2, $3, $4) RETURNING *", [req.user, title, semester, description]);
        console.log(req.body);
        
        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// delete a course
router.delete("/courses/:id", authorization, async(req, res) => {
    try {
        
        const {id} = req.params;

        const deleteStudents = await pool.query("DELETE FROM students WHERE course_id = $1 AND organizer_id = $2 RETURNING *", [id, req.user]);
        const deleteCourse = await pool.query("DELETE FROM courses WHERE course_id = $1 AND organizer_id = $2 RETURNING *", [id, req.user]);
        
        if( deleteCourse.rows.length === 0 )
        {
            return res.json("This Course is not yours!");
        }

        res.json("Course and all related data were deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;