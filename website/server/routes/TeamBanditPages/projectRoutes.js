const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// PROJECT ROUTES //

//Get all projects assocaited with current course id
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT * FROM projects WHERE projects.organizer_id = $1 AND projects.course_id = $2 ORDER BY projects.project_id ASC ", [req.user, course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//Get all projects associated with the current organizer
router.get("/homepage/:organizer_id", authorization, async(req, res) => {
    try {
        const students = await pool.query("SELECT * FROM projects WHERE organizer_id = $1 ORDER BY project_id ASC ", [req.user]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

/**
 * Get all project members associated with the current project.
 * 
 * @TODO: This needs to get changed to a bridge table interaction as there can be 1 - as many as he wants students
 * associated with a project
 */
router.get("/members/:project_id", authorization, async(req, res) => {
    try {
        const {project_id} = req.params;
        
        const project_members = await pool.query("SELECT project_member1, project_member2, project_member3, project_member4 FROM projects WHERE projects.organizer_id = $1 AND projects.project_id = $2", [req.user, project_id]);

        res.json(project_members.rows);
    } catch (error) {
        console.error(error.message);
    }
});

/**
 * Deletes a project based off of the organizer.
 * 
 * @TODO: This will need to change once bridge interactions start happening, but
 * might be okay
 */
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

// Adds a new Project to the Projects table
router.post("/projects", authorization, async(req,res) =>{
    try{
        const { project_name, project_description, mentorName, sponsorName, courseId } = req.body;
        
        const newCourse = await pool.query("INSERT INTO projects (course_id, organizer_id, project_name, project_description, project_mentor, project_sponsor) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [courseId, req.user, project_name, project_description, mentorName, sponsorName]);
        
        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// END PROJECT ROUTES //

module.exports = router;