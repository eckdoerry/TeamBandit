const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');
const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../public/uploads/images/');
  },
  filename: function(req, file, cb) {
    cb(null, uuid() + file.originalname);
  }
});

const upload = multer({storage: storage});

// Updates Students Bio
router.put("/studentAvatar", upload.single("avatar"), authorization, async(req, res) => {
  try {
      // Used to change filename from uuid to something understandable
        // const filename = "student_" + req.user  + "_profilePicture." + req.file.mimetype.split("/")[1];

      const oldProfilePicPath = await pool.query("SELECT student_id, profilepic_filepath FROM students WHERE student_id = $1", [req.user]);
      const updateProfilePic = await pool.query("UPDATE students SET profilepic_filepath = $1 WHERE student_id = $2 RETURNING *", [req.file.filename, req.user]);
      
      if(updateProfilePic.rows.length === 0)
      {
          return res.json("This profile is not yours!");
      }

      // Removes old profile pic
      if (fs.existsSync("../../public/uploads/images/" + oldProfilePicPath.rows[0].profilepic_filepath))
      {
        fs.unlinkSync("../../public/uploads/images/" + oldProfilePicPath.rows[0].profilepic_filepath);
      }

      // Used to change filename from uuid to something understandable
        /*
        const oldFilePath = req.file.path;
        const newFilePath = "../../public/uploads/images/student_" + req.user  + "_profilePicture." + req.file.mimetype.split("/")[1];

        fs.rename(oldFilePath, newFilePath, (err) => { 
          if (err) { 
            console.log(err); 
          } 
        });
        */
      
      res.json("Your profile picture was successfully updated!");
  } catch (error) {
      console.error(error.message);
  }
});

module.exports = router;