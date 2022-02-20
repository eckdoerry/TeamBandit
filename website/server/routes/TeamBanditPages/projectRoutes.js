const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// PROJECT ROUTES //

//Get all projects associated with current course id
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT projects.project_id, projects.project_name, projects.project_short_name, projects.project_mentor, projects.project_sponsor, projects.projectoverview_filename, teams.team_name FROM projects LEFT JOIN teams ON projects.project_id = teams.project_id WHERE projects.organizer_id = $1 AND projects.course_id = $2 ORDER BY projects.project_id ASC ", [req.user, course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//FOR STUDENTS Get all projects associated with current course id
router.get("/students/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT projects.project_id, projects.project_name, projects.project_short_name, projects.project_mentor, projects.project_sponsor, teams.team_name FROM projects LEFT JOIN teams ON projects.project_id = teams.project_id WHERE projects.course_id = $1 ORDER BY projects.project_id ASC ", [course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Updates a student based on student id
router.put("/projects/:id", authorization, async(req, res) => {
    try {

        const updateStudents = await pool.query("UPDATE projects SET project_name = $1, project_short_name = $2, project_mentor = $3, project_sponsor = $4 WHERE project_id = $5 AND organizer_id = $6", [req.body['project_name'], req.body['project_short_name'], req.body['project_mentor'], req.body['project_sponsor'],  req.params['id'], req.user]);

        if(updateStudents.rows.length === 0)
        {
            return res.json("This project is not yours!");
        }

        res.json("Project list was updated!");
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

        // Delete associated team
        await pool.query("DELETE FROM teams WHERE project_id = $1 AND organizer_id = $2", [id, req.user]);

        // Delete project
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
        const { project_name, project_short_name, mentorName, sponsorName, courseId } = req.body;
        
        const newCourse = await pool.query("INSERT INTO projects (course_id, organizer_id, project_name, project_short_name, project_mentor, project_sponsor) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [courseId, req.user, project_name, project_short_name, mentorName, sponsorName]);
        
        // Create new team
        await pool.query("INSERT INTO teams (organizer_id, course_id, project_id) VALUES ($1, $2, $3)", [req.user, courseId, newCourse.rows[0].project_id]);

        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Adds a new Project to the Projects table
router.post("/toggleStudent", authorization, async(req,res) =>{
    try{
        const { student_id, project_id } = req.body;

        const alreadyInProject = await pool.query("SELECT * FROM studentteambridgetable WHERE student_id = $1", [student_id]);

        // Student is not associated with project
        if(alreadyInProject.rows.length === 0)
        {
            // Get team id
            const teamId = await pool.query("SELECT * FROM teams WHERE project_id = $1", [project_id]);

            // Inserts into the student into the bridge table
            const associateStudent = await pool.query("INSERT INTO studentteambridgetable (team_id, student_id, project_id) VALUES ($1, $2, $3) RETURNING *", [teamId.rows[0].team_id, student_id, project_id]);
            await pool.query("UPDATE students SET assigned = true WHERE student_id = $1", [ student_id]);

            res.json(associateStudent.rows[0]);
        }
        else if( alreadyInProject.rows.length === 1)
        {
            if( alreadyInProject.rows[0].project_id === project_id)
            {
                // DELETE STUDENT FROM BRIDGE TABLE //
                await pool.query("DELETE FROM studentteambridgetable WHERE student_id = $1", [student_id]);

                await pool.query("UPDATE students SET assigned = false WHERE student_id = $1", [ student_id]);

                res.json("DELETED");
            }
            else
            {
                // DELETE STUDENT FROM BRIDGE TABLE //
                await pool.query("DELETE FROM studentteambridgetable WHERE student_id = $1", [student_id]);

                // Get team id
                const teamId = await pool.query("SELECT * FROM teams WHERE project_id = $1", [project_id]);

                // Add student with new project //
                await pool.query("INSERT INTO studentteambridgetable (team_id, student_id, project_id) VALUES ($1, $2, $3) RETURNING *", [teamId.rows[0].team_id, student_id, project_id]);

                res.json("DELETED");
            }
            
        }

        res.json("There was multiple instances of a student");        
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getAssignedStudents/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        const student = await pool.query("SELECT project_id, team_id, student_id FROM studentteambridgetable");

        res.json(student.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// END PROJECT ROUTES //

module.exports = router;
