const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');
const multer = require("multer");
const uuid = require("uuid").v4;

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
      const updateProfilePic = await pool.query("UPDATE students SET profilepic_filepath = $1 WHERE student_id = $2 RETURNING *", [req.file.path.replace("../../public/", ""), req.user]);

      if(updateProfilePic.rows.length === 0)
      {
          return res.json("This bio is not yours!");
      }

      res.json("Profile Pic was updated!");
  } catch (error) {
      console.error(error.message);
  }
});

module.exports = router;