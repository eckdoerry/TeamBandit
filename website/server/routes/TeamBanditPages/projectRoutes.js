const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// PROJECT ROUTES //

//Get all projects associated with current course id
router.get("/:course_id/:userIdentifier", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        if( req.params.userIdentifier == "organizer" )
        {
            const students = await pool.query("SELECT projects.project_id, projects.project_name, projects.mentor_id, projects.client_id, projects.projectoverview_filename, teams.team_name, teams.team_logo, teams.team_lead FROM projects LEFT JOIN teams ON projects.project_id = teams.project_id WHERE projects.organizer_id = $1 AND projects.course_id = $2 ORDER BY projects.project_id ASC ", [req.user, course_id]);
            res.json(students.rows);
        }
        else if( req.params.userIdentifier == "student" )
        {
            const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
        
            const students = await pool.query("SELECT projects.project_id, projects.project_name, projects.mentor_id, projects.client_id, projects.projectoverview_filename, teams.team_name, teams.team_logo FROM projects LEFT JOIN teams ON projects.project_id = teams.project_id WHERE projects.organizer_id = $1 AND projects.course_id = $2 ORDER BY projects.project_id ASC ", [organizer.rows[0].organizer_id, course_id]);
            
            res.json(students.rows);
        }
        else if( req.params.userIdentifier == "mentor" )
        {
            // TODO: Set up how mentor will get the project information
        }
        
    } catch (error) {
        console.error(error.message);
    }
});

//Get all mentors associated with current course id
router.get("/mentors/:course_id/:userIdentifier", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        if( req.params.userIdentifier == "organizer" )
        {
            const students = await pool.query("SELECT mentor_id, mentor_name, mentor_email FROM mentors WHERE organizer_id = $1", [req.user]);
            res.json(students.rows);
        }
        else if( req.params.userIdentifier == "student" )
        {
            const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
            const students = await pool.query("SELECT mentor_id, mentor_name, mentor_email FROM mentors WHERE organizer_id = $1", [organizer.rows[0].organizer_id]);
            res.json(students.rows);
        }
        else if( req.params.userIdentifier == "mentor" )
        {
            // TODO: Set up how mentor will get the project information
        }
    } catch (error) {
        console.error(error.message);
    }
});

//Get all projects associated with current course id
router.get("/getTeams/:course_id/:userIdentifier", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        if( req.params.userIdentifier == "organizer" )
        {
            const teams = await pool.query("SELECT team_lead, team_id FROM teams WHERE organizer_id = $1 AND course_id = $2", [req.user, course_id]);
            res.json(teams.rows);
        }
        else if( req.params.userIdentifier == "student" )
        {
            const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
            const teams = await pool.query("SELECT team_lead, team_id FROM teams WHERE organizer_id = $1 AND course_id = $2", [organizer.rows[0].organizer_id, course_id]);
            res.json(teams.rows);
        }
        else if( req.params.userIdentifier == "mentor" )
        {
            // TODO: Set up how will get the project information
        }
    } catch (error) {
        console.error(error.message);
    }
});

//Get all sponsors associated with current course id
router.get("/sponsors/:course_id/:userIdentifier", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        if( req.params.userIdentifier == "organizer" )
        {
            const students = await pool.query("SELECT client_id, client_fname, client_lname, client_organization, client_notes, client_location, client_logo FROM clients WHERE organizer_id = $1", [req.user]);
            res.json(students.rows);
        }
        else if( req.params.userIdentifier == "student" )
        {
            const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
            const students = await pool.query("SELECT client_id, client_fname, client_lname, client_organization, client_notes, client_location, client_logo FROM clients WHERE organizer_id = $1", [organizer.rows[0].organizer_id]);
            res.json(students.rows);
        }
        else if ( req.params.userIdentifier == "mentor" )
        {
            // TODO: Figure out mentors
        }
    } catch (error) {
        console.error(error.message);
    }
});

//FOR STUDENTS Get all projects associated with current course id
router.get("/students/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT projects.project_id, projects.project_name,  projects.mentor_id, projects.client_id, teams.team_name FROM projects LEFT JOIN teams ON projects.project_id = teams.project_id WHERE projects.course_id = $1 ORDER BY projects.project_id ASC ", [course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Updates a project
router.put("/projects/:id", authorization, async(req, res) => {
    try {
        
        const updateProjects = await pool.query("UPDATE projects SET project_name = $1,  mentor_id = $2, client_id = $3 WHERE project_id = $4 AND organizer_id = $5", [req.body['project_name'],  req.body['projectMentor'], req.body['projectSponsor'],  req.params['id'], req.user]);
        await pool.query("UPDATE teams SET team_lead = $1 WHERE project_id = $2", [req.body['teamLead'], req.params['id']]);
        if(updateProjects.rows.length === 0)
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
        const { project_name, mentorId, sponsorId, courseId } = req.body;
        
        const newCourse = await pool.query("INSERT INTO projects (course_id, organizer_id, project_name, mentor_id, client_id) VALUES($1, $2, $3, $4, $5) RETURNING *", [courseId, req.user, project_name, mentorId, sponsorId]);
        
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

router.get("/getAssignedStudents/:course_id/:userIdentifier", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        if( req.params.userIdentifier == "organizer" )
        {
            const student = await pool.query("SELECT studentteambridgetable.project_id, studentteambridgetable.team_id, studentteambridgetable.student_id, students.student_fname, students.student_lname, students.student_email FROM studentteambridgetable LEFT JOIN students ON studentteambridgetable.student_id = students.student_id");
            res.json(student.rows);
        }
        else if( req.params.userIdentifier == "student" )
        {
            const organizer = await pool.query("SELECT organizer_id FROM courses WHERE course_id = $1", [course_id]);
            const student = await pool.query("SELECT studentteambridgetable.project_id, studentteambridgetable.team_id, studentteambridgetable.student_id, students.student_fname, students.student_lname FROM studentteambridgetable LEFT JOIN students ON studentteambridgetable.student_id = students.student_id");
            res.json(student.rows);
        }
        else if( req.params.userIdentifier == "mentor" )
        {
            // TODO: Add mentors
        }
    } catch (error) {
        console.error(error.message);
    }
});

router.get("/project-name/:projectname", authorization, async(req, res) => {
    try {
        const {projectname} = req.params;
        const project = await pool.query("SELECT projectoverview_filename FROM projects WHERE project_name = $1", [projectname]);

        res.json(project.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// END PROJECT ROUTES //

module.exports = router;
