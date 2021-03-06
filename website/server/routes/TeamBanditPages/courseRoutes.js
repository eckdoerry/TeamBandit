const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// COURSE ROUTES //

// Gets all courses associated with current user
router.get("/", authorization, async(req, res) => {
    try {
        if( req.headers.type == "organizer" )
        {
            const user = await pool.query(
                "SELECT organizers.organizer_fname, organizers.organizer_lname, courses.course_id, courses.course_description, courses.course_color, courses.course_title, courses.course_semester, courses.course_year, courses.creation_date, courses.course_public, courses.team_size, courses.course_sign_up_id, courses.project_prefs FROM organizers LEFT JOIN courses ON organizers.organizer_id = courses.organizer_id WHERE organizers.organizer_id = $1 ORDER BY course_id ASC ",
                [req.user]
            );

            res.json(user.rows);
        }
        else if ( req.headers.type == "student")
        {
            const user = await pool.query(
                "SELECT courses.course_id, courses.course_description, courses.course_color, courses.course_title, courses.project_prefs, courses.course_semester, courses.course_year, courses.course_public FROM courses LEFT JOIN studentCourses ON studentCourses.course_id = courses.course_id WHERE studentCourses.student_id = $1 ORDER BY course_id ASC ",
                [req.user]
            );
            res.json(user.rows);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Gets all courses associated with current user
router.get("/organizer-courses/:organizer_id", async(req, res) => {
    try {
        
            const user = await pool.query(
                "SELECT organizers.organizer_fname, organizers.organizer_lname, courses.course_id, courses.course_description, courses.course_color, courses.course_title, courses.course_semester, courses.course_year, courses.creation_date, courses.course_public, courses.team_size FROM organizers LEFT JOIN courses ON organizers.organizer_id = courses.organizer_id WHERE organizers.organizer_id = $1 ORDER BY course_id ASC ",
                [req.params['organizer_id']]
            );

            res.json(user.rows);
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Gets all courses associated with current student
router.get("/student", authorization, async(req, res) => {
    try {
        
        const user = await pool.query(
            "SELECT courses.course_id, courses.course_description, courses.course_color, courses.course_title, courses.course_semester FROM courses LEFT JOIN studentCourses ON studentCourses.course_id = courses.course_id WHERE studentCourses.student_id = $1 ORDER BY course_id ASC ",
            [req.user]
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Gets all courses assocaited with current organizer
router.get("/project-total/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const projects = await pool.query("SELECT project_name FROM projects WHERE organizer_id = $1 AND course_id = $2 ", [req.user, course_id]);
        
        res.json(projects.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Gets all students assocaited with a course
router.get("/student-total/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT student_fname FROM students LEFT JOIN studentcourses ON students.student_id = studentcourses.student_id  WHERE  studentcourses.course_id = $1", [course_id]);
        
        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});


// Gets all teams assocaited with a course
router.get("/team-total/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT team_name, course_id FROM teams WHERE course_id = $1", [course_id]);
        
        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});


// Updates a course based off of its ID
router.put("/courses/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const {title, semester, year, isPublic, teamSize, courseColor, projectPrefs} = req.body;

        const updateTodo = await pool.query("UPDATE courses SET course_public = $1, course_title = $4, course_semester = $5, course_year = $6, team_size = $7, course_color = $8, project_prefs = $9 WHERE course_id = $2 AND organizer_id = $3 RETURNING *", [isPublic, id, req.user, title, semester, year, teamSize, courseColor, projectPrefs]);

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
        const { title, semester, year, description } = req.body;

        const newCourse = await pool.query("INSERT INTO courses (organizer_id, course_title, course_semester, course_year, course_description) VALUES($1, $2, $3, $4, $5) RETURNING *", [req.user, title, semester, parseInt(year.split("-")[0]), description]);

        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// deletes all students from studentCourses associated with course
// then deletes the course from the course list
router.delete("/courses/:id", authorization, async(req, res) => {
    try {
        
        const {id} = req.params;

        const deleteStudents = await pool.query("DELETE FROM studentcourses WHERE course_id = $1 RETURNING *", [id]);
        const deleteCourse = await pool.query("DELETE FROM courses WHERE course_id = $1 AND organizer_id = $2 RETURNING *", [id, req.user]);
        
        if( deleteCourse.rows.length === 0 )
        {
            return res.json("This course is not yours!");
        }

        res.json("Course and all related data were deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

// END COURSE ROUTES //

module.exports = router;