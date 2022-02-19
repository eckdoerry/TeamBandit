const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const validInfo = require("../../middleware/validInfo");

// ROUTES //

// get all clients
router.get("/", authorization, async(req, res) => {
    try {

        const user = await pool.query(
            "SELECT client_id, client_name, client_email, client_company, client_notes, organizer_id FROM clients ORDER BY client_id ASC"
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// add a client
router.post("/addclient", authorization, async(req,res) =>{
    try{
        const { clientName, email, company, notes } = req.body;
        const newClient = await pool.query("INSERT INTO clients (client_name, client_email, client_company, client_notes, organizer_id) VALUES($1, $2, $3, $4, $5) RETURNING *", [clientName, email, company, notes, req.user]);

        console.log(newClient.rows);
        res.json(newClient.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// update a client
router.put("/editclient/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const {clientName, email, company, notes} = req.body;
        const updateClient = await pool.query("UPDATE clients SET client_name = $1, client_email = $2, client_company = $3, client_notes = $4 WHERE client_id = $5 AND organizer_id = $6 RETURNING *", [clientName, email, company, notes, id, req.user]);

        if(updateClient.rows.length === 0)
        {
            return res.json("This client is not yours!");
        }

        res.json("Client was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// delete a client
router.delete("/deleteclient/:id", authorization, async(req, res) => {
    try {

        const {id} = req.params;

        const deleteClient = await pool.query("DELETE FROM clients WHERE client_id = $1 AND organizer_id = $2 RETURNING *", [id, req.user]);

        console.log(deleteClient);

        if( deleteClient.rows.length === 0 )
        {
            return res.json("This client is not yours!");
        }

        res.json("Course was deleted!");

    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;
