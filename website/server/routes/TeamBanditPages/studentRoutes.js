const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// STUDENT ROUTES //

// Creates a student using normal add method
router.post("/students", authorization, async(req,res) =>{
    try{
        
        // 1. Checks if the student already exists
        const existingStudent = await pool.query("SELECT student_email FROM students WHERE student_email = $1", [req.body['student_email']]);

        // 2. If student already exists, adds student to the new course if they are not already added
        if(existingStudent.rows.length !== 0)
        {
            var tempStudent = await pool.query("SELECT student_id FROM students WHERE student_email = $1", [req.body['student_email']]);
            var alreadyCourse = await pool.query("SELECT student_id, course_id FROM studentcourses WHERE student_id = $1 AND course_id = $2", [tempStudent.rows[0].student_id, req.body['course_id']]);

            if(alreadyCourse.rows.length === 0)
            {
                await pool.query("INSERT INTO studentcourses(student_id, course_id) VALUES ($1, $2)", [tempStudent.rows[0].student_id, req.body['course_id']]);
            }

            return res.status(401).json("Student already Exists");
        }

        // 3. Student does not already exist so they are added to the students db and the students courses db as well
        const student = await pool.query("INSERT INTO students(student_fname, student_lname, student_emplid, student_email, student_gpa, organizer_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [req.body['student_fname'], req.body['student_lname'], req.body['student_emplid'], req.body['student_email'], req.body['student_gpa'], req.user]);
        await pool.query("INSERT INTO studentcourses(student_id, course_id) VALUES ($1, $2)", [student.rows[0].student_id, req.body['course_id']]);

        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

/** 
 * Creates a student using normal CSV uploader
 * 
 * @TODO: This can probably get merged into the above function, primary
 * differece is variable names
*/
router.post("/csv", authorization, async(req,res) =>{
    try{
        // 1. Checks if the student already exists
        const existingStudent = await pool.query("SELECT student_email FROM students WHERE student_email = $1", [req.body['student_email_csv']]);

        // 2. If student already exists, adds student to the new course if they are not already added
        if(existingStudent.rows.length !== 0)
        {
            
            var tempStudent = await pool.query("SELECT student_id FROM students WHERE student_email = $1", [req.body['student_email_csv']]);
            var alreadyCourse = await pool.query("SELECT student_id, course_id FROM studentcourses WHERE student_id = $1 AND course_id = $2", [tempStudent.rows[0].student_id, req.body['course_id']]);
            
            if(alreadyCourse.rows.length === 0)
            {
                await pool.query("INSERT INTO studentcourses(student_id, course_id) VALUES ($1, $2)", [tempStudent.rows[0].student_id, req.body['course_id']]);
                return res.status(401).json("Student Already Added them to course");
            }

            return res.status(401).json("Student Already Exists");
        }
        
        // 3. Student does not already exist so they are added to the students db and the students courses db as well
        const student = await pool.query("INSERT INTO students(student_fname, student_lname, student_emplid, student_email, student_gpa, organizer_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [req.body['student_fname_csv'], req.body['student_lname_csv'], req.body['student_emplid_csv'], req.body['student_email_csv'], req.body['student_gpa_csv'], req.user]);
        await pool.query("INSERT INTO studentcourses(student_id, course_id) VALUES ($1, $2)", [student.rows[0].student_id, req.body['course_id']]);

        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Gets all students associated with a course
router.get("/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT * FROM students LEFT JOIN studentcourses ON students.student_id = studentcourses.student_id  WHERE students.organizer_id = $1 AND studentcourses.course_id = $2 ORDER BY students.student_id ASC ", [req.user, course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Gets all students associated with a course
router.get("/team-association/:student_id", async(req, res) => {
    try {
        const {student_id} = req.params;
        
        const students = await pool.query("SELECT project_id, team_id FROM studentteambridgetable WHERE student_id = $1 ", [student_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Gets all students associated with a course
router.get("/is-team-lead/:student_id/:team_id", async(req, res) => {
    try {
        const {student_id, team_id} = req.params;
        
        const students = await pool.query("SELECT team_name, page_color, team_logo FROM teams WHERE team_id = $1 AND team_lead = $2", [team_id, student_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Gets all students associated with a course
router.get("/teams-assignment/:course_id", authorization, async(req, res) => {
    try {
        const {course_id} = req.params;
        
        const students = await pool.query("SELECT students.assigned, students.student_id, students.student_projectpref1, students.student_projectpref2, students.student_projectpref3, students.student_projectpref4, students.student_projectpref5, students.student_fname, students.student_lname, students.student_email, students.student_gpa, projects.project_name FROM students LEFT JOIN studentcourses ON students.student_id = studentcourses.student_id LEFT JOIN studentteambridgetable ON studentteambridgetable.student_id = students.student_id LEFT JOIN projects ON studentteambridgetable.project_id = projects.project_id WHERE students.organizer_id = $1 AND studentcourses.course_id = $2 ORDER BY students.student_id ASC ", [req.user, course_id]);

        res.json(students.rows);
    } catch (error) {
        console.error(error.message);
    }
})

/**
 * Grabs a student from the DB based on their id
 * 
 * @TODO: Verify this isn't used anywhere and delete it
 */
router.get("/students/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const students = await pool.query("SELECT * FROM students WHERE id = $1 AND organizers.organizer_id = $2", [id, req.user]);

        res.json(students.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Updates a student based on student id
router.put("/preferences/:id", async(req, res) => {
    try {
        
        const updateStudents = await pool.query("UPDATE students SET student_projectpref1 = $1, student_projectpref2 = $2, student_projectpref3 = $3, student_projectpref4 = $4, student_projectpref5 = $5  WHERE student_id = $6", [req.body['pref1'], req.body['pref2'], req.body['pref3'], req.body['pref4'], req.body['pref5'],  req.params['id']]);
        
        if(updateStudents.rows.length === 0)
        {
            return res.json("This student is not yours!");
        }

        res.json("Student list was updated!");
    } catch (error) {
        console.error(error.message);
    }
});


// Deletes a student from given course if associated with one, or permanently if not (Based on student id and course id)
router.delete("/students/:id/:course_id", authorization, async(req, res) => {
    try {
        
        // 1. Check for how many courses the student is associated with
        const checkForStudentAmount = await pool.query("SELECT * FROM studentcourses WHERE student_id = $1", [req.params.id]);

        // 2. If more than one, simply delete the course associatation, otherwise delete the student
        if(checkForStudentAmount.rows.length > 1)
        {
            await pool.query("DELETE FROM studentcourses WHERE student_id = $1 AND course_id = $2", [req.params.id, req.params.course_id]);
            res.json("Student was removed from course!");
        }
        else
        {
            await pool.query("DELETE FROM studentcourses WHERE student_id = $1 AND course_id = $2", [req.params.id, req.params.course_id]);
            const deleteStudent = await pool.query("DELETE FROM students WHERE student_id = $1 AND organizer_id = $2", [req.params.id, req.user]);

            if( deleteStudent.rows.length === 0 )
            {
                return res.json("This Student is not yours!");
            }

            res.json("Student was deleted!");
        }

        
    } catch (error) {
        console.error(error.message);
    }
})

// END STUDENT ROUTES //

module.exports = router;