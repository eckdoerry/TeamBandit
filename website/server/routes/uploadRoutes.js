const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');
const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, uuid() + file.originalname);
  }
});

const upload = multer({storage: storage});

// Updates Students Bio
router.put("/studentAvatar", upload.single("avatar"), authorization, async(req, res) => {
  try {
      const oldProfilePicPath = await pool.query("SELECT student_id, profilepic_filepath FROM students WHERE student_id = $1", [req.user]);
      const filePath = "/uploads/" + req.file.path.split("/uploads/")[1];
      const updateProfilePic = await pool.query("UPDATE students SET profilepic_filepath = $1 WHERE student_id = $2 RETURNING *", [filePath, req.user]);
      if (fs.existsSync("../../public" + oldProfilePicPath.rows[0].profilepic_filepath))
      {
        fs.unlinkSync("../../public" + oldProfilePicPath.rows[0].profilepic_filepath);
      }

      if(updateProfilePic.rows.length === 0)
      {
          return res.json("This profile is not yours!");
      }

      res.json("Your profile picture was successfully updated!");
  } catch (error) {
      console.error(error.message);
  }
});

module.exports = router;