const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// GENERAL ROUTES //

// Grabs Organizer Information from the Organizers table
router.get("/", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT organizer_fname, organizer_lname, organizer_email, organizer_id, organizer_bio, profilepic_filepath FROM organizers WHERE organizer_id = $1", [req.user]);

    res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Grabs Organizer Information from the Organizers table
router.get("/course-total", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT course_title FROM courses WHERE organizer_id = $1", [req.user]);

    res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Grabs Organizer Information from the Organizers table
router.get("/client-total", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT client_fname FROM clients WHERE organizer_id = $1", [req.user]);

    res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Grabs Organizer Information from the Organizers table
router.get("/project-total", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT project_name FROM projects WHERE organizer_id = $1", [req.user]);

    res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Grabs Organizer Information from the Organizers table
router.get("/student-total", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT student_id FROM students WHERE organizer_id = $1", [req.user]);

    res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Updates Organizers Bio
router.put("/bio", authorization, async(req, res) => {
    try {
        const {bioText} = req.body;

        const updateTodo = await pool.query("UPDATE organizers SET organizer_bio = $1 WHERE organizer_id = $2 RETURNING *", [bioText, req.user]);

        if(updateTodo.rows.length === 0)
        {
            return res.json("This bio is not yours!");
        }

        res.json("Bio was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Grabs Student Information from the Students table
router.get("/student", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT student_fname, student_lname, student_email, student_id, student_bio, profilepic_filepath, student_projectpref1, student_projectpref2, student_projectpref3, student_projectpref4, student_projectpref5 FROM students WHERE student_id = $1", [req.user]);

    res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Grabs Student Information from the Students table
router.get("/isCourse/:course_id", async(req, res) => {
    try {

        const course = await pool.query("SELECT course_title FROM courses WHERE course_id = $1", [req.params['course_id']]);
        
        res.json(course.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Grabs Student Information from the Students table
router.get("/isPublic/:course_id", async(req, res) => {
    try {

        const course = await pool.query("SELECT course_public FROM courses WHERE course_id = $1", [req.params['course_id']]);
        
        res.json(course.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Updates Students Bio
router.put("/studentbio", authorization, async(req, res) => {
    try {
        const {bioText} = req.body;

        const updateTodo = await pool.query("UPDATE students SET student_bio = $1 WHERE student_id = $2 RETURNING *", [bioText, req.user]);

        if(updateTodo.rows.length === 0)
        {
            return res.json("This bio is not yours!");
        }

        res.json("Bio was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// TEAM PAGE ROUTES //

//Get all projects associated with current course id
router.get("/projects/:course_id", async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
        
        const students = await pool.query("SELECT projects.project_id, projects.project_name, projects.mentor_id, projects.client_id, projects.projectoverview_filename, teams.team_name, teams.team_logo FROM projects LEFT JOIN teams ON projects.project_id = teams.project_id WHERE projects.organizer_id = $1 AND projects.course_id = $2 ORDER BY projects.project_id ASC ", [organizer.rows[0].organizer_id, course_id]);
        
        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//Get all projects associated with current course id
router.get("/mentors/:course_id", async(req, res) => {
    try {
        const {course_id} = req.params;
        const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
        
        const students = await pool.query("SELECT mentor_id, mentor_name, mentor_email FROM mentors WHERE organizer_id = $1", [organizer.rows[0].organizer_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//Get all projects associated with current course id
router.get("/getTeams/:course_id", async(req, res) => {
    try {
        const {course_id} = req.params;
        const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
        
        const teams = await pool.query("SELECT team_lead, team_id FROM teams WHERE organizer_id = $1 AND course_id = $2", [organizer.rows[0].organizer_id, course_id]);

        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//Get all projects associated with current course id
router.get("/sponsors/:course_id",  async(req, res) => {
    try {
        const {course_id} = req.params;
        const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
        
        const students = await pool.query("SELECT client_id, client_fname, client_lname, client_organization, client_notes FROM clients WHERE organizer_id = $1", [organizer.rows[0].organizer_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//FOR STUDENTS Get all projects associated with current course id
router.get("/students/:course_id", async(req, res) => {
    try {
        const {course_id} = req.params;
        const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
        
        const students = await pool.query("SELECT projects.project_id, projects.project_name,  projects.mentor_id, projects.client_id, teams.team_name FROM projects LEFT JOIN teams ON projects.project_id = teams.project_id WHERE projects.course_id = $1 ORDER BY projects.project_id ASC ", [course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

router.get("/getAssignedStudents/:course_id", async(req, res) => {
    try {
        const {course_id} = req.params;
        const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);

        const student = await pool.query("SELECT studentteambridgetable.project_id, studentteambridgetable.team_id, studentteambridgetable.student_id, students.student_fname, students.student_lname FROM studentteambridgetable LEFT JOIN students ON studentteambridgetable.student_id = students.student_id");

        res.json(student.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// --------------- //

// END GENERAL ROUTES //

module.exports = router;