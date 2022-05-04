const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


// AUTHORIZATION ROUTES //

/**
 * User Registering Route, only used by Organizers
 */
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


/**
 * User Registering Route, only used by students
 */
router.post("/registerStudent", validInfo, async (req, res) =>{
    try {

        //1. destructure the req.body (fname, lname, email, password)     
        const { course, email, password } = req.body;

        //2. check if user exist (if user is not in the student database throw error)
        const user = await pool.query("SELECT * FROM students LEFT JOIN studentcourses ON students.student_id = studentcourses.student_id LEFT JOIN courses ON studentcourses.course_id = courses.course_id WHERE students.student_email = $1 AND courses.course_sign_up_id = $2", [email, course]);

        // User already exists
        if(user.rows.length === 0)
        {
            // 401 unauthenticated, 403 unauthorized
            return res.status(401).json("Student does not exist for current course");
        }

        //3. Check if user already has account (boolean in students table)
        if(user.rows[0].account_created === true)
        {
            return res.status(401).json("Account has already been created");
        }
        
        //4. Bcrypt the user password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //5. enter the new user inside our database
        const newUser = await pool.query("UPDATE students SET student_password = $1, account_created =$2 WHERE student_email = $3 RETURNING *", [bcryptPassword, true, email]);
        
        //6. generating our jwt token
        const token = jwtGenerator(newUser.rows[0].student_id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

/**
 * Login Route, used by Organizers, Mentors, and Students
 * 
 * @TODO: Currently, works under the assumption that Organizer, Student, and Mentor 
 * do not have emails in more then one table. If they do, it might throw errors as the
 * wrong comparisons might happen. 
 */
router.post("/organizerLogin", validInfo, async (req, res)=>{

    // Variables for use primarily in checks and returns
    var token = "";
    var identifier = "";
    var validPassword = "";

    try {

        // 1. destructure the req.body
        const { email, password } = req.body;

        // 2. check if user email exists in Organizers, Mentors, or Students(if not then we throw error)
        const user = await pool.query("SELECT * FROM organizers WHERE organizer_email = $1", [email]);
        const mentor = await pool.query("SELECT * FROM mentors WHERE mentor_email = $1", [email]);

        // user is not in the system
        if(user.rows.length === 0) 
        {
            if(mentor.rows.length === 0)
            {
                return res.status(401).json("Password or Email is incorrect");
            }
        }

        // 3. Check first if password is bcrypted and is correct 
        if( mentor.rows.length !== 0 )
        {
            validPassword = await bcrypt.compare(password, mentor.rows[0].mentor_password);
            if( mentor.rows[0].mentor_password != password )
                {
                    return res.status(401).json("Password or Email is incorrect");
                }
        }
        else if( user.rows.length !== 0 )
        {
            validPassword = await bcrypt.compare( password, user.rows[0].organizer_pass );

            if( !validPassword )
            {
                return res.status(401).json("Password or Email is incorrect");
            }
        }


        // Generate JWT Token and User based off of successful login
        if(mentor.rows.length !== 0)
        {
            token = jwtGenerator(mentor.rows[0].mentor_id);
            identifier = "mentor";
        }
        else 
        {
            token = jwtGenerator(user.rows[0].organizer_id);
            identifier = "organizer";
        }
        
        res.json({ token_value : token, user_identifier: identifier });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/studentLogin", validInfo, async (req, res)=>{

    // Variables for use primarily in checks and returns
    var token = "";
    var identifier = "";
    var validPassword = "";

    try {

        // 1. destructure the req.body
        const { email, password } = req.body;

        // 2. check if user email exists in Organizers, Mentors, or Students(if not then we throw error)
        const student = await pool.query("SELECT * FROM students WHERE student_email = $1", [email]);
        const mentor = await pool.query("SELECT * FROM mentors WHERE mentor_email = $1", [email]);

        // user is not in the system
        if(student.rows.length === 0)
        {
            if(mentor.rows.length === 0)
            {
                return res.status(401).json("Password or Email is incorrect");
            }
        }

        // 3. Check first if password is bcrypted and is correct 
        if(student.rows.length !== 0)
        {
            validPassword = await bcrypt.compare( password, student.rows[0].student_password );
            if(!validPassword)
            {
                return res.status(401).json("Password or Email is incorrect");
            }
        }
        else if( mentor.rows.length !== 0 )
        {
            validPassword = await bcrypt.compare(password, mentor.rows[0].mentor_password);
            if( mentor.rows[0].mentor_password != password )
                {
                    return res.status(401).json("Password or Email is incorrect");
                }
        }


        // Generate JWT Token and User based off of successful login
        if(student.rows.length !== 0)
        {
            token = jwtGenerator(student.rows[0].student_id);
            identifier = "student";
            var date = new Date(Date.now())
            await pool.query("UPDATE students SET student_last_sign_in = $1 WHERE student_id = $2", [date.toLocaleString().replace(",", " at"), student.rows[0].student_id]);
        }
        else if(mentor.rows.length !== 0)
        {
            token = jwtGenerator(mentor.rows[0].mentor_id);
            identifier = "mentor";
        }
        
        res.json({ token_value : token, user_identifier: identifier });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/changeOrganizerPassword", validInfo, authorization, async (req, res) =>{
    try {

        const { newPassword } = req.body;
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(newPassword, salt);

        const newPasswordQuery = await pool.query("UPDATE organizers SET organizer_pass = $1 WHERE organizer_id = $2", [bcryptPassword, req.user]);

        if(newPasswordQuery.rows.length !== 0)
        {
            // 401 unauthenticated, 403 unauthorized
            return res.status(401).json("Error");

        }

        res.json("Password successfully updated!");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/changeStudentPassword", validInfo, authorization, async (req, res) =>{
    try {

        const { newPassword } = req.body;
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(newPassword, salt);

        const newPasswordQuery = await pool.query("UPDATE students SET student_password = $1 WHERE student_id = $2", [bcryptPassword, req.user]);

        if(newPasswordQuery.rows.length !== 0)
        {
            // 401 unauthenticated, 403 unauthorized
            return res.status(401).json("Error");

        }

        res.json("Password successfully updated!");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

/**
 * Verifies that the current user has a valid JWT token
 * 
 * @returns true if the user does have a valid JWT token
 */
router.get("/verify", authorization, async(req, res) => {
    try {
        res.json(true);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// END AUTHORIZATION ROUTES //

module.exports = router;