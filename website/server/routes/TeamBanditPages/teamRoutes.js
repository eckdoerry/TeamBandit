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
});

router.get("/isTeamLead/:fname/:lname", async(req, res) => {
    try {
        const {fname, lname} = req.params;

        const student = await pool.query("SELECT student_id FROM students WHERE student_lname = $1 AND student_fname = $2", [lname, fname]);
        
        const teamLead = await pool.query("SELECT teams.team_lead FROM teams WHERE teams.team_lead = $1 ", [student.rows[0].student_id]);


        res.json(teamLead.rows);
    } catch (error) {
        console.error(error.message);
    }
});

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
router.put("/updateProblemDesc/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET problem_description = $1 WHERE team_id = $2", [req.body['problemDesc'], req.params['id']]);

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
router.put("/updateSolutionDesc/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET solution_description = $1 WHERE team_id = $2", [req.body['solutionDesc'], req.params['id']]);

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
router.put("/updateReqOverview/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET requirements_overview = $1 WHERE team_id = $2", [req.body['reqOverview'], req.params['id']]);

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
router.put("/updateKeyReq/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET key_requirements = $1 WHERE team_id = $2", [req.body['keyReq'], req.params['id']]);

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
router.put("/updateTechSum/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET technology_summary = $1 WHERE team_id = $2", [req.body['techSum'], req.params['id']]);

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
router.put("/updateTechName1/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_name_1 = $1 WHERE team_id = $2", [req.body['techName1'], req.params['id']]);

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
router.put("/updateTechName2/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_name_2 = $1 WHERE team_id = $2", [req.body['techName2'], req.params['id']]);

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
router.put("/updateTechName4/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_name_4 = $1 WHERE team_id = $2", [req.body['techName4'], req.params['id']]);

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
router.put("/updateTechName3/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_name_3 = $1 WHERE team_id = $2", [req.body['techName3'], req.params['id']]);

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
router.put("/updateTechDes1/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_description_1 = $1 WHERE team_id = $2", [req.body['techDes1'], req.params['id']]);

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
router.put("/updateTechDes2/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_description_2 = $1 WHERE team_id = $2", [req.body['techDes2'], req.params['id']]);

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
router.put("/updateTechDes3/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_description_3 = $1 WHERE team_id = $2", [req.body['techDes3'], req.params['id']]);

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
router.put("/updateTechDes4/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_description_4 = $1 WHERE team_id = $2", [req.body['techDes4'], req.params['id']]);

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
router.put("/updateTechName1/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_name_1 = $1 WHERE team_id = $2", [req.body['techName1'], req.params['id']]);

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
router.put("/updateTechName1/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET tech_name_1 = $1 WHERE team_id = $2", [req.body['techName1'], req.params['id']]);

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
router.put("/updateDevStrat/:id", async(req, res) => {
    try {
        const updateColor = await pool.query("UPDATE teams SET development_strategy = $1 WHERE team_id = $2", [req.body['devStrat'], req.params['id']]);

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
});


// Gets all teams based off of course_id and project id 
router.get("/team-name/:team_name", async(req, res) => {
    try {
        const {team_name} = req.params;

        const teams = await pool.query("SELECT teams.team_id, teams.team_name, teams.team_logo, teams.organizer_id, teams.course_id, teams.project_id, teams.team_size, teams.page_color, teams.team_lead, teams.team_description, courses.course_public, teams.team_backdrop, teams.font_color, teams.information_link, teams.problem_description, teams.solution_description, teams.architecture_image, teams.requirements_overview, teams.key_requirements, teams.technology_summary, teams.tech_img_1, teams.tech_img_2, teams.tech_img_3, teams.tech_img_4, teams.tech_name_1, teams.tech_name_2, teams.tech_name_3, teams.tech_name_4, teams.tech_description_1, teams.tech_description_2, teams.tech_description_3, teams.tech_description_4, teams.development_strategy, teams.schedule_image, projects.project_name FROM teams LEFT JOIN courses ON teams.course_id = courses.course_id LEFT JOIN projects ON teams.project_id = projects.project_id WHERE team_id = $1 ORDER BY team_id ASC ", [team_name]);

        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Gets all teams based off of course_id and project id 
router.get("/team-members/:team_id", async(req, res) => {
    try {
        const {team_id} = req.params;
        
        const teams = await pool.query("SELECT students.student_id, students.student_fname, students.student_lname, students.profilepic_filepath, students.student_bio FROM studentteambridgetable LEFT JOIN students ON studentteambridgetable.student_id = students.student_id WHERE studentteambridgetable.team_id = $1", [team_id]);
        
        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Gets all teams based off of course_id and project id 
router.get("/project-info/:team_id", async(req, res) => {
    try {
        const {team_id} = req.params;
        
        const teams = await pool.query("SELECT projects.mentor_id, projects.client_id, mentors.mentor_name, clients.client_fname, clients.client_lname, clients.client_organization, clients.client_location, clients.client_logo FROM teams LEFT JOIN projects ON teams.project_id = projects.project_id LEFT JOIN mentors on projects.mentor_id = mentors.mentor_id LEFT JOIN clients on clients.client_id = projects.client_id WHERE teams.team_id = $1", [team_id]);
        res.json(teams.rows);
    } catch (error) {
        console.error(error.message);
    }
});

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
});

// Gets a single student's team id from that student's id 
router.get("/getTeamId/:student_id", async(req, res) => {
    try {
        const {student_id} = req.params;
        const team_id = await pool.query("SELECT student_id, team_id FROM studentteambridgetable WHERE student_id = $1", [student_id]);

        res.json(team_id.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

// END TEAM ROUTES //

module.exports = router;