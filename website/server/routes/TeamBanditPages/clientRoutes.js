const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// CLIENT ROUTES //

/**
 * Gets all Clients and returns them 
 * 
 * @TODO: This needs to include Organizer_ID as this currently will get all clients
 */
router.get("/", authorization, async(req, res) => {
    try {
        
        const user = await pool.query("SELECT * FROM clients ORDER BY client_id ASC");

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// END CLIENT ROUTES //

module.exports = router;