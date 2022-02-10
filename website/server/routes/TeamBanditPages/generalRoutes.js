const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

router.get("/", authorization, async(req, res) => {
  try {
      
      const user = await pool.query(
          "SELECT organizer_fname, organizer_lname FROM organizers WHERE organizer_id = $1",
          [req.user]
      );

      res.json(user.rows);

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;