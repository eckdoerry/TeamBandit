const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const validInfo = require("../../middleware/validInfo");

// ROUTES //

//get all projects
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT * FROM projects WHERE projects.organizer_id = $1 AND projects.course_id = $2 ORDER BY projects.project_id ASC ", [req.user, course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get all projects
router.get("/homepage/:organizer_id", authorization, async(req, res) => {
    try {
        console.log(req.user);
        const students = await pool.query("SELECT * FROM projects WHERE organizer_id = $1 ORDER BY project_id ASC ", [req.user]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get all members
router.get("/members/:project_id", authorization, async(req, res) => {
    try {
        const {project_id} = req.params;
        
        const project_members = await pool.query("SELECT project_member1, project_member2, project_member3, project_member4 FROM projects WHERE projects.organizer_id = $1 AND projects.project_id = $2", [req.user, project_id]);

        res.json(project_members.rows);
    } catch (error) {
        console.error(error.message);
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

// delete a project
router.delete("/projects/:id", authorization, async(req, res) => {
    try {
        
        const {id} = req.params;

        const deleteProject = await pool.query("DELETE FROM projects WHERE project_id = $1 AND organizer_id = $2 RETURNING *", [id, req.user]);
        
        if( deleteProject.rows.length === 0 )
        {
            return res.json("This Course is not yours!");
        }

        res.json("Project and all related data were deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

// Add a new course
router.post("/projects", authorization, async(req,res) =>{
    try{
        const { project_name, project_description, mentorName, sponsorName, courseId } = req.body;
        
        const newCourse = await pool.query("INSERT INTO projects (course_id, organizer_id, project_name, project_description, project_mentor, project_sponsor) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [courseId, req.user, project_name, project_description, mentorName, sponsorName]);
        
        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;