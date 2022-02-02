const router = require("express").Router();
const pool = require("../../db");
const authorization = require('../../middleware/authorization');

// get all courses
router.get("/", authorization, async(req, res) => {
    try {
        
        const user = await pool.query(
            "SELECT organizers.organizer_fname, courses.course_id, courses.course_description, courses.course_title FROM organizers LEFT JOIN courses ON organizers.organizer_id = courses.organizer_id WHERE organizers.organizer_id = $1",
            [req.user]
        );

        res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// get a course

// update a course
router.put("/courses/:id", authorization, async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *", [description, id, req.user]);

        if(updateTodo.rows.length === 0)
        {
            return res.json("This todo is not yours!");
        }

        res.json("Todo was updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Add a new course
router.post("/courses", authorization, async(req,res) =>{
    try{
        const { title } = req.body;
        console.log(req.user);
        const newCourse = await pool.query("INSERT INTO courses (organizer_id, course_title) VALUES($1, $2) RETURNING *", [req.user, title]);
        console.log(req.body);
        
        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// delete a course
router.delete("/courses/:id", authorization, async(req, res) => {
    try {
        
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *", [id, req.user]);

        if( deleteTodo.rows.length === 0 )
        {
            return res.json("This ToDo is not yours!");
        }

        res.json("Todo was deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;