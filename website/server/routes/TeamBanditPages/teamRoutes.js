const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// TEAM ROUTES //

// NOTE                                         //
// TEAM ADDITION IS RESOLVED IN PROJECT ROUTES  //
// WHEN NEW PROJECT IS ADDED, NEW TEAM IS ADDED //


// Gets all teams based off of course_id and project id 
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const teams = await pool.query("SELECT * FROM teams LEFT JOIN projects ON teams.project_id = projects.project_id WHERE teams.organizer_id = $1 AND teams.course_id = $2 ORDER BY teams.team_id ASC ", [req.user, course_id]);

        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
})

router.get("/isTeamLead/:fname/:lname", async(req, res) => {
    try {
        const {fname, lname} = req.params;

        const student = await pool.query("SELECT student_id FROM students WHERE student_lname = $1 AND student_fname = $2", [lname, fname]);
        
        const teamLead = await pool.query("SELECT teams.team_lead FROM teams WHERE teams.team_lead = $1 ", [student.rows[0].student_id]);


        res.json(teamLead.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Updates a student based on student id
router.put("/updateColor/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET page_color = $1 WHERE team_id = $2", [req.body['color'], req.params['id']]);

        if(updateColor.rows.length === 0)
        {
            return res.json("This color is not yours!");
        }

        res.json("COLOR was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Updates a student based on student id
router.put("/updateFont/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET font_color = $1 WHERE team_id = $2", [req.body['color'], req.params['id']]);

        if(updateColor.rows.length === 0)
        {
            return res.json("This color is not yours!");
        }

        res.json("COLOR was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Updates a student based on student id
router.put("/updateTeamName/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET team_name = $1 WHERE team_id = $2", [req.body['teamName'], req.params['id']]);

        if(updateColor.rows.length === 0)
        {
            return res.json("This team is not yours!");
        }

        res.json("Team was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Updates a student based on student id
router.put("/updateAbstract/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET team_description = $1 WHERE team_id = $2", [req.body['abstract'], req.params['id']]);

        if(updateColor.rows.length === 0)
        {
            return res.json("This team is not yours!");
        }

        res.json("Team was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Updates a student based on student id
router.put("/updateVideoLink/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET information_link = $1 WHERE team_id = $2", [req.body['videoLink'], req.params['id']]);

        if(updateColor.rows.length === 0)
        {
            return res.json("This color is not yours!");
        }

        res.json("COLOR was updated!");
    } catch (error) {
        console.error(error.message);
    }
});


// FOR STUDENTS Gets all teams based off of course_id and project id 
router.get("/students/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const teams = await pool.query("SELECT * FROM teams LEFT JOIN projects ON teams.project_id = projects.project_id WHERE teams.course_id = $1 ORDER BY teams.team_id ASC ", [course_id]);

        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
})


// Gets all teams based off of course_id and project id 
router.get("/team-name/:team_name", async(req, res) => {
    try {
        const {team_name} = req.params;

        const teams = await pool.query("SELECT teams.team_id, teams.team_name, teams.team_logo, teams.organizer_id, teams.course_id, teams.project_id, teams.team_size, teams.page_color, teams.team_lead, teams.team_description, courses.course_public, teams.team_backdrop, teams.font_color, teams.information_link FROM teams LEFT JOIN courses ON teams.course_id = courses.course_id WHERE team_name = $1 ORDER BY team_id ASC ", [team_name]);

        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Gets all teams based off of course_id and project id 
router.get("/team-members/:team_id", async(req, res) => {
    try {
        const {team_id} = req.params;
        
        const teams = await pool.query("SELECT students.student_fname, students.student_lname, students.profilepic_filepath, students.student_bio FROM studentteambridgetable LEFT JOIN students ON studentteambridgetable.student_id = students.student_id WHERE studentteambridgetable.team_id = $1", [team_id]);
        
        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Gets all teams based off of course_id and project id 
router.get("/project-info/:team_id", async(req, res) => {
    try {
        const {team_id} = req.params;
        
        const teams = await pool.query("SELECT projects.mentor_id, projects.client_id, mentors.mentor_name, clients.client_fname, clients.client_lname, clients.client_organization, clients.client_location, clients.client_logo FROM teams LEFT JOIN projects ON teams.project_id = projects.project_id LEFT JOIN mentors on projects.mentor_id = mentors.mentor_id LEFT JOIN clients on clients.client_id = projects.client_id WHERE teams.team_id = $1", [team_id]);
        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
})


// Updates a team based on team id
router.put("/teams/:id", authorization, async(req, res) => {
    try {

        const updateTeam = await pool.query("UPDATE teams SET team_name = $1, team_size = $4 WHERE team_id = $2 AND organizer_id = $3", [req.body['teamName'],  req.params['id'], req.user, req.body['teamSize']]);

        if(updateTeam.rows.length === 0)
        {
            return res.json("This team is not yours!");
        }

        res.json("Team list was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Deletes a student from given course if associated with one, or permanently if not (Based on student id and course id)
router.delete("/students/:id/:course_id", authorization, async(req, res) => {
    try {
        
        // 1. Check for how many courses the student is associated with
        const checkForStudentAmount = await pool.query("SELECT * FROM studentcourses WHERE student_id = $1", [req.params.id]);

        // 2. If more than one, simply delete the course associatation, otherwise delete the student
        if(checkForStudentAmount.rows.length > 1)
        {
            await pool.query("DELETE FROM studentcourses WHERE student_id = $1 AND course_id = $2", [req.params.id, req.params.course_id]);
            res.json("Student was removed from course!");
        }
        else
        {
            await pool.query("DELETE FROM studentcourses WHERE student_id = $1 AND course_id = $2", [req.params.id, req.params.course_id]);
            const deleteStudent = await pool.query("DELETE FROM students WHERE student_id = $1 AND organizer_id = $2", [req.params.id, req.user]);

            if( deleteStudent.rows.length === 0 )
            {
                return res.json("This Student is not yours!");
            }

            res.json("Student was deleted!");
        }

        
    } catch (error) {
        console.error(error.message);
    }
})

// END TEAM ROUTES //

module.exports = router;