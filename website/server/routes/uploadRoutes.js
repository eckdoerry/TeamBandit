const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');
const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");

const profilePictureStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../public/uploads/images/profilePictures/');
  },
  filename: function(req, file, cb) {
    cb(null, uuid() + "." + file.mimetype.split("/")[1]);
  }
});

const profilePictureUpload = multer({storage: profilePictureStorage});

// Updates Organizer Profile Pic
router.put("/organizerAvatar", profilePictureUpload.single("avatar"), authorization, async(req, res) => {
  try {

      const oldProfilePicPath = await pool.query("SELECT organizer_id, profilepic_filepath FROM organizers WHERE organizer_id = $1", [req.user]);
      const updateProfilePic = await pool.query("UPDATE organizers SET profilepic_filepath = $1 WHERE organizer_id = $2 RETURNING *", [req.file.filename, req.user]);
      
      if(updateProfilePic.rows.length === 0)
      {
          return res.json("This profile is not yours!");
      }

      // Removes old profile pic
      if (fs.existsSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath))
      {
        fs.unlinkSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath);
      }
      
      res.json("Your profile picture was successfully updated!");
  } catch (error) {
      console.error(error.message);
  }
});

// Updates Student Profile Pic
router.put("/studentAvatar", profilePictureUpload.single("avatar"), authorization, async(req, res) => {
  try {

      const oldProfilePicPath = await pool.query("SELECT student_id, profilepic_filepath FROM students WHERE student_id = $1", [req.user]);
      const updateProfilePic = await pool.query("UPDATE students SET profilepic_filepath = $1 WHERE student_id = $2 RETURNING *", [req.file.filename, req.user]);
      
      if(updateProfilePic.rows.length === 0)
      {
          return res.json("This profile is not yours!");
      }

      // Removes old profile pic
      if (fs.existsSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath))
      {
        fs.unlinkSync("../../public/uploads/images/profilePictures/" + oldProfilePicPath.rows[0].profilepic_filepath);
      }
      
      res.json("Your profile picture was successfully updated!");
  } catch (error) {
      console.error(error.message);
  }
});






const projectOverviewStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../public/uploads/documents/projectOverviews/');
  },
  filename: function(req, file, cb) {
    cb(null, uuid() + "." + file.mimetype.split("/")[1]);
  }
});

const projectOverviewUpload = multer({storage: projectOverviewStorage});

// Updates Project Overview PDF
router.put("/projectOverview/:project_id", projectOverviewUpload.single("projectOverview"), authorization, async(req, res) => {
  try {
    const {project_id} = req.params;
    const oldProfilePicPath = await pool.query("SELECT organizer_id, project_id, projectoverview_filename FROM projects WHERE project_id = $1 AND organizer_id = $2", [project_id, req.user]);
    const updateProfilePic = await pool.query("UPDATE projects SET projectoverview_filename = $1 WHERE project_id = $2 AND organizer_id = $3 RETURNING *", [req.file.filename, project_id, req.user]);
    
    if(updateProfilePic.rows.length === 0)
    {
        return res.json("This project is not yours!");
    }

    // Removes old project overview pdf
    if (fs.existsSync("../../public/uploads/documents/projectOverviews/" + oldProfilePicPath.rows[0].projectoverview_filename))
    {
      fs.unlinkSync("../../public/uploads/documents/projectOverviews/" + oldProfilePicPath.rows[0].projectoverview_filename);
    }
    
    res.json("Project Overview was successfully updated!");
} catch (error) {
    console.error(error.message);
}
});









// Deletes Organizer Profile Picture
router.put("/deleteOrganizerProfilePicture/:id", authorization, async(req, res) => {
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
      
      res.json("Your profile picture was successfully deleted!");

  } catch (error) {
        console.error(error.message);
  }
});


// Deletes Student Profile Picture
router.put("/deleteStudentProfilePicture/:id", authorization, async(req, res) => {
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
      
      res.json("Your profile picture was successfully deleted!");

  } catch (error) {
        console.error(error.message);
  }
});

module.exports = router;