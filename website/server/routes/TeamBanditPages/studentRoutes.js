const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');
const validInfo = require("../../middleware/validInfo");

// ROUTES //

// login route
router.post("/login", validInfo, async (req, res)=>{
    try {
        
        // 1. destructure the req.body
        const { email, password } = req.body;

        // 2. check if user doesn't exist (if not then we throw error)
        const user = await pool.query("SELECT * FROM students WHERE student_email = $1", [email]);

        // user is not in the system
        if(user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // 3. check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].organizer_pass);
        
        if(!validPassword)
        {
            if(user.rows[0].student_password != password)
            {
                return res.status(401).json("Password or Email is incorrect");
            }
        }

        // 4. give them the jwt token
        const token = jwtGenerator(user.rows[0].student_id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//create a student
router.post("/students", authorization, async(req,res) =>{
    try{
        
        console.log(req.body);
        
        const newTodo = await pool.query("INSERT INTO students(student_fname, student_lname, student_emplid, student_email, student_gpa, organizer_id, course_id, project_id) VALUES($1, $2, $3, $4, $5, $6, $7, NULL) RETURNING *", [req.body['student_fname'], req.body['student_lname'], req.body['student_emplid'], req.body['student_email'], req.body['student_gpa'], req.user, req.body['course_id']]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//create a student with CSVs
router.post("/csv", authorization, async(req,res) =>{
    try{
        
        console.log(req.body);
        
        const newTodo = await pool.query("INSERT INTO students(student_fname, student_lname, student_emplid, student_email, student_gpa, organizer_id, course_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [req.body['student_fname_csv'], req.body['student_lname_csv'], req.body['student_emplid_csv'], req.body['student_email_csv'], req.body['student_gpa_csv'], req.user, req.body['course_id']]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all students
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        const students = await pool.query("SELECT * FROM students WHERE organizer_id = $1 AND course_id = $2  ORDER BY student_id ASC", [req.user, course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//get a student
router.get("/students/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const students = await pool.query("SELECT * FROM students WHERE id = $1 AND organizers.organizer_id = $2", [id, req.user]);

        res.json(students.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//update a student
router.put("/students/:id", authorization, async(req, res) => {
    try {
        console.log(req.params);
        const updateStudents = await pool.query("UPDATE students SET student_fname = $1, student_lname = $2, student_emplid = $3, student_email = $4, student_gpa = $5  WHERE student_id = $6 AND organizer_id = $7", [req.body['student_fname'], req.body['student_lname'], req.body['student_emplid'], req.body['student_email'], req.body['student_gpa'],  req.params['id'], req.user]);

        if(updateStudents.rows.length === 0)
        {
            return res.json("This course is not yours!");
        }

        res.json("Student list was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

//delete a student
router.delete("/students/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const deleteStudent = await pool.query("DELETE FROM students WHERE student_id = $1 AND organizer_id = $2", [id, req.user]);

        if( deleteStudent.rows.length === 0 )
        {
            return res.json("This Student is not yours!");
        }

        res.json("Student was deleted!");
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;