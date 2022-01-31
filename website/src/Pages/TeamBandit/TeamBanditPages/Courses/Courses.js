import {Fragment, React, useState} from "react";

import styles from "./Courses.module.css";

import Course from "./Course";
import FormDialogAddCourse from "./FormDialogAddCourse";
import FormDialogDeleteCourse from "./FormDialogDeleteCourse";
import CoursePage from "./CoursePage";

const Courses = () => {

    const [courses, setCourses] = useState([])

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
            <div className={styles.courseContainer}>
                {courses.map((course) => (
                <Course key={course.id} courseInfo={course}/>))}
                <div className={styles.courseBtns}>
                    <FormDialogAddCourse addCourse={addCourse}/>
                    <FormDialogDeleteCourse deleteCourse={deleteCourse}/>
                </div>
            </div>
        </Fragment>
    );
}

export default Courses;