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

// Updates Students Bio
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


const projectDescriptionStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../public/uploads/documents/projectDescriptions/');
  },
  filename: function(req, file, cb) {
    cb(null, uuid() + "." + file.mimetype.split("/")[1]);
  }
});

const projectDescriptionUpload = multer({storage: projectDescriptionStorage});

// Updates Students Bio
router.put("/projectDescription", projectDescriptionUpload.single("projectDescription"), authorization, async(req, res) => {
  try {
      res.json("Your profile picture was successfully updated!");
  } catch (error) {
      console.error(error.message);
  }
});

// Updates Students Bio
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
      
      res.json("Your profile picture was successfully updated!");

  } catch (error) {
        console.error(error.message);
  }
});

module.exports = router;