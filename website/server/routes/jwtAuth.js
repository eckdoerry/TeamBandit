const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// registering

router.post("/register", validInfo, async (req, res) =>{
    try {
        //1. destructure the req.body (fname, lname, email, password)     
        const { fname, lname, email, password } = req.body;

        //2. check if user exist (if user exist then throw error)
        const user = await pool.query("SELECT * FROM organizers WHERE organizer_email = $1", [
            email
        ]);

        // User already exists
        if(user.rows.length !== 0)
        {
            // 401 unauthenticated, 403 unauthorized
            return res.status(401).json("User already exists");

        }
        
        //3. Bcrypt the user password
            // How encrypted the password will be
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user inside our database
        const newUser = await pool.query("INSERT INTO organizers(organizer_fname, organizer_lname, organizer_email, organizer_pass) VALUES ($1, $2, $3, $4) RETURNING *", [fname, lname, email, bcryptPassword]);
        
        //5. generating our jwt token
        const token = jwtGenerator(newUser.rows[0].organizer_id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// login route
router.post("/login", validInfo, async (req, res)=>{
    try {
        
        // 1. destructure the req.body
        const { email, password } = req.body;

        // 2. check if user doesn't exist (if not then we throw error)
        const user = await pool.query("SELECT * FROM organizers WHERE organizer_email = $1", [email]);

        // user is not in the system
        if(user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // 3. check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].organizer_pass);

        // IF PASSWORD NOT THE SAME
        if(!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // 4. give them the jwt token
        const token = jwtGenerator(user.rows[0].organizer_id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Verifys authentication
router.get("/verify", authorization, async(req, res) => {
    try {
        res.json(true);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;