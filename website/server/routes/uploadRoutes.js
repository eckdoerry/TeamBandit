const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');
const uuid = require("uuid").v4;
const fs = require("fs");

router.put("/organizerAvatar", authorization, async(req, res) => {
  try {
      if(!req.files) {
        res.json("No files selected!");
    } else {
        const oldProfilePicPath = await pool.query("SELECT organizer_id, profilepic_filepath FROM organizers WHERE organizer_id = $1", [req.user]);

        // Removes old profile pic
        if (fs.existsSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath))
        {
            fs.unlinkSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath);
        }

        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;

        const new_filename = "organizer_" + req.user.toString() + "_" + uuid().toString() + "." + avatar.mimetype.split("/")[1];
        
        //Use the mv() method to place the file in upload directory
        avatar.mv("../../public/uploads/images/profilePictures/" + new_filename);

        const updateProfilePic = await pool.query("UPDATE organizers SET profilepic_filepath = $1 WHERE organizer_id = $2 RETURNING *", [new_filename, req.user]);
      
        if(updateProfilePic.rows.length === 0)
        {
            return res.json("This profile is not yours!");
        }

        //send response
        res.json("Your profile picture was successfully updated!");
      }
      
      
  } catch (error) {
      console.error(error.message);
  }
});

// Updates Student Profile Pic
router.put("/studentAvatar", authorization, async(req, res) => {
    try {
        if(!req.files) 
        {
            res.json("No files selected!");
        } 
        else 
        {
            const oldProfilePicPath = await pool.query("SELECT student_id, profilepic_filepath FROM students WHERE student_id = $1", [req.user]);

            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath))
            {
                fs.unlinkSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath);
            }

            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;

            const new_filename = "student_" + req.user.toString() + "_" + uuid().toString() + "." + avatar.mimetype.split("/")[1];
            
            //Use the mv() method to place the file in upload directory
            avatar.mv("../../public/uploads/images/profilePictures/" + new_filename);

            const updateProfilePic = await pool.query("UPDATE students SET profilepic_filepath = $1 WHERE student_id = $2 RETURNING *", [new_filename, req.user]);
          
            if(updateProfilePic.rows.length === 0)
            {
                return res.json("This profile is not yours!");
            }

            //send response
            res.json("Your profile picture was successfully updated!");
        }
    } 
    catch (error) 
    {
        console.error(error.message);
    }
});

// Updates Project Overview PDF
router.put("/projectOverview/:project_id", authorization, async(req, res) => {
    try {
        const {project_id} = req.params;
        if(!req.files) 
        {
            res.json("No files selected!");
        } 
        else 
        {
            const oldProjectOverviewPath = await pool.query("SELECT organizer_id, projectoverview_filename FROM projects WHERE organizer_id = $1", [req.user]);

            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/documents/projectOverviews/" + oldProjectOverviewPath.rows[0].projectoverview_filename))
            {
                fs.unlinkSync("../../public/uploads/documents/projectOverviews/" + oldProjectOverviewPath.rows[0].projectoverview_filename);
            }

            let projectOverview = req.files.projectOverview;

            const new_filename = "projectOverview_" + project_id.toString() + "_" + req.user.toString() + "_" + uuid().toString() + "." + projectOverview.mimetype.split("/")[1];
            
            //Use the mv() method to place the file in upload directory
            projectOverview.mv("../../public/uploads/documents/projectOverviews/" + new_filename);

            const updateProjectOverview = await pool.query("UPDATE projects SET projectoverview_filename = $1 WHERE project_id = $2 AND organizer_id = $3 RETURNING *", [new_filename, project_id, req.user]);
          
            if(updateProjectOverview.rows.length === 0)
            {
                return res.json("This project is not yours!");
            }

            //send response
            res.json("Your project overview was successfully updated!");
        }
    } 
    catch (error) 
    {
        console.error(error.message);
    }
});

// Updates Project Overview PDF
router.put("/assignmentInstructions/:assignment_id", authorization, async(req, res) => {
    try {
        const {assignment_id} = req.params;
        if(!req.files) 
        {
            res.json("No files selected!");
        } 
        else 
        {
            const oldAssignmentInstructionsPath = await pool.query("SELECT organizer_id, assignment_instructions FROM assignments WHERE organizer_id = $1", [req.user]);

            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/documents/assignmentInstructions/" + oldAssignmentInstructionsPath.rows[0].projectoverview_filename))
            {
                fs.unlinkSync("../../public/uploads/documents/assignmentInstructions/" + oldAssignmentInstructionsPath.rows[0].projectoverview_filename);
            }

            let assignmentInstructions = req.files.assignmentInstructions;

            const new_filename = "assignmentInstructions_" + assignment_id.toString() + "_" + req.user.toString() + "_" + uuid().toString() + "." + assignmentInstructions.mimetype.split("/")[1];
            
            //Use the mv() method to place the file in upload directory
            assignmentInstructions.mv("../../public/uploads/documents/assignmentInstructions/" + new_filename);

            const updateProjectOverview = await pool.query("UPDATE assignments SET assignment_instructions = $1 WHERE assignment_id = $2 AND organizer_id = $3 RETURNING *", [new_filename, assignment_id, req.user]);
          
            if(updateProjectOverview.rows.length === 0)
            {
                return res.json("This project is not yours!");
            }

            //send response
            res.json("Your project overview was successfully updated!");
        }
    } 
    catch (error) 
    {
        console.error(error.message);
    }
});

// Deletes Organizer Profile Picture
router.put("/deleteOrganizerProfilePicture", authorization, async(req, res) => {
    try {
        const oldProfilePicPath = await pool.query("SELECT organizer_id, profilepic_filepath FROM organizers WHERE organizer_id = $1", [req.user]);
        const updateProfilePic = await pool.query("UPDATE organizers SET profilepic_filepath = $1 WHERE organizer_id = $2 RETURNING *", [null, req.user]);
      
        if(updateProfilePic.rows.length === 0)
        {
            return res.json("This profile is not yours!");
        }

        // Removes old profile pic
        if (fs.existsSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath))
        {
            fs.unlinkSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath);
        }

        //send response
        res.json("Your profile picture was successfully deleted!");
    } 
    catch (error) 
    {
        console.error(error.message);
    }
});


// Deletes Student Profile Picture
router.put("/deleteStudentProfilePicture", authorization, async(req, res) => {
    try {
        const oldProfilePicPath = await pool.query("SELECT student_id, profilepic_filepath FROM students WHERE student_id = $1", [req.user]);
        const updateProfilePic = await pool.query("UPDATE students SET profilepic_filepath = $1 WHERE student_id = $2 RETURNING *", [null, req.user]);
      
        if(updateProfilePic.rows.length === 0)
        {
            return res.json("This profile is not yours!");
        }

        // Removes old profile pic
        if (fs.existsSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath))
        {
            fs.unlinkSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath);
        }

        //send response
        res.json("Your profile picture was successfully deleted!");
    } 
    catch (error) 
    {
        console.error(error.message);
    }
});

// Updates Team Logo
router.put("/teamLogo", authorization, async(req, res) => {
    try 
    {
        if(!req.files) 
        {
            res.json("No files selected!");
        } 
        else 
        {
            const oldTeamLogoPath = await pool.query("SELECT team_lead, team_logo FROM teams WHERE team_lead = $1", [req.user]);

            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/images/teamLogos/" + oldTeamLogoPath.rows[0].team_logo))
            {
                fs.unlinkSync("../../public/uploads/images/teamLogos/" + oldTeamLogoPath.rows[0].team_logo);
            }

            let teamLogo = req.files.teamLogo;

            const new_filename = "teamLogo_" + req.user.toString() + "_" + uuid().toString() + "." + teamLogo.mimetype.split("/")[1];
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            teamLogo.mv("../../public/uploads/images/teamLogos/" + new_filename);

            const updateTeamLogo = await pool.query("UPDATE teams SET team_logo = $1 WHERE team_lead = $2 RETURNING *", [new_filename, req.user]);
          
            if(updateTeamLogo.rows.length === 0)
            {
                return res.json("This team is not yours!");
            }

            //send response
            res.json("Your team logo was successfully updated!");
        }
    } 
    catch (error) {
        console.error(error.message);
    }
});


// Updates Team Backdrop
router.put("/teamBackdrop", authorization, async(req, res) => {
    try 
    {
        if(!req.files) 
        {
            res.json("No files selected!");
        } 
        else 
        {
            const oldTeamBackdropPath = await pool.query("SELECT team_lead, team_backdrop FROM teams WHERE team_lead = $1", [req.user]);

            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/images/teamBackdrop/" + oldTeamBackdropPath.rows[0].team_backdrop))
            {
                fs.unlinkSync("../../public/uploads/images/teamBackdrop/" + oldTeamBackdropPath.rows[0].team_backdrop);
            }

            let teamBackdrop = req.files.teamBackdrop;

            const new_filename = "teamBackdrop_" + req.user.toString() + "_" + uuid().toString() + "." + teamBackdrop.mimetype.split("/")[1];
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            teamBackdrop.mv("../../public/uploads/images/teamBackdrop/" + new_filename);

            const updateTeamBackdrop = await pool.query("UPDATE teams SET team_backdrop = $1 WHERE team_lead = $2 RETURNING *", [new_filename, req.user]);

            if(updateTeamBackdrop.rows.length === 0)
            {
                return res.json("This team is not yours!");
            }

            //send response
            res.json("Your team logo was successfully updated!");
        }
    } 
    catch (error) {
        console.error(error.message);
    }
});

// Updates Team Backdrop
router.put("/clientLogo/:id", authorization, async(req, res) => {
    try 
    {
        if(!req.files) 
        {
            res.json("No files selected!");
        } 
        else 
        {
            const oldClientLogoPath = await pool.query("SELECT client_logo FROM clients WHERE client_id = $1", [req.params.id]);

            // Removes old profile pic
            if (fs.existsSync("../../public/uploads/images/clientLogos/" + oldClientLogoPath.rows[0].client_logo))
            {
                fs.unlinkSync("../../public/uploads/images/clientLogos/" + oldClientLogoPath.rows[0].client_logo);
            }

            let clientLogo = req.files.clientLogo;

            const new_filename = "clientLogo_" + req.user.toString() + "_" + uuid().toString() + "." + clientLogo.mimetype.split("/")[1];
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            clientLogo.mv("../../public/uploads/images/clientLogos/" + new_filename);

            const updateClientLogo = await pool.query("UPDATE clients SET client_logo = $1 WHERE client_id = $2 RETURNING *", [new_filename, req.params.id]);

            if(updateClientLogo.rows.length === 0)
            {
                return res.json("This client is not yours!");
            }

            //send response
            res.json("The client logo was successfully updated!");
        }
    } 
    catch (error) {
        console.error(error.message);
    }
});

module.exports = router;