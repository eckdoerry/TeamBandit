import {Fragment, React, useState} from "react";

import styles from "./Courses.module.css";

import Course from "./Course";
import FormDialogAddCourse from "./FormDialogAddCourse";
import FormDialogDeleteCourse from "./FormDialogDeleteCourse";

const Courses = () => {

    const [courses, setCourses] = useState([]);

    /*
    // Fetch Tasks
    const fetchCourses = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        
        return data 
    }

    // Fetch Task
    const fetchCourse = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        
        return data 
    }

    // Add Course
    const addCourse = async (course) => {
        try {
            const body = {name, semester};

            const response = await fetch("http://localhost:5000/courses/addcourse", { method: "POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(body)});
            
            const parseRes = await response.json();
            console.log(parseRes)

        } catch (error) {
            console.error(error.message);
        }
    }

    // Delete Course
    const deleteCourse = async (id) => {
        await fetch(`http://localhost:5000/courses/${id}`, {
        method: 'DELETE'
        })

        setCourses(courses.filter((course) => course.id !== id))
    }
    */

    // Add Course
    const addCourse = async (course) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newCourse = {id, ...course}
        setCourses([...courses, newCourse])
    }

    // Delete Course
    const deleteCourse = async (inCourse) => {
        if (courses.length === 0)
        {
            alert("There are no courses to delete");
            return;
        }
        setCourses(courses.filter((course) => course.course !== inCourse.course));
    }

    return(
        <Fragment>
            <h1>Courses</h1>
            <div className={styles.courseBtns}>
                <FormDialogAddCourse addCourse={addCourse}/>
                <FormDialogDeleteCourse deleteCourse={deleteCourse}/>
            </div>
            <div className={styles.courseContainer}>
                {courses.map((course) => (
                <Course key={course.id} courseInfo={course}/>))}
            </div>
        </Fragment>
    );
}

export default Courses;