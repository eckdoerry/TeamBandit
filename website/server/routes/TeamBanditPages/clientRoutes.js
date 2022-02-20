const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// ROUTES //

// get all clients
router.get("/", authorization, async(req, res) => {
    try {

        const user = await pool.query(
            "SELECT client_id, client_lname, client_fname, client_email, client_organization, client_phonenumber, client_notes, organizer_id FROM clients ORDER BY client_id ASC"
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
        const { clientLName, clientFName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes } = req.body;
        const newClient = await pool.query("INSERT INTO clients (client_lname, client_fname, client_email, client_organization, client_phonenumber, client_notes, organizer_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [clientLName, clientFName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes, req.user]);

        res.json(newClient.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// update a client
router.put("/editclient/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const {clientLName, clientFName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes} = req.body;
        const updateClient = await pool.query("UPDATE clients SET client_lname = $1, client_fname = $2, client_email = $3, client_organization = $4, client_phonenumber = $5, client_notes = $6 WHERE client_id = $7 AND organizer_id = $8 RETURNING *", [clientLName, clientFName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes, id, req.user]);

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

        if( deleteClient.rows.length === 0 )
        {
            return res.json("This client is not yours!");
        }

        res.json("Client was deleted!");

    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;
