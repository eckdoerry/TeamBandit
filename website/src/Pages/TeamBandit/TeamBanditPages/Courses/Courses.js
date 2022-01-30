import {Fragment, React, useState} from "react";

import styles from "./Courses.module.css";

import SimpleModal from "./SimpleModal";
import Course from "./Course";

const Courses = () => {

    const [courses, setCourses] = useState([])

    // Add Course
    const addCourse = async (course) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newCourse = {id, ...course}
        setCourses([...courses, newCourse])
    }

    return(
        <Fragment>
            <p>Courses</p>
            <SimpleModal addCourse={addCourse}/>
            <div className={styles.courseContainer}>
                {courses.map((course) => (
                <Course key={course.id} course={course.course}/>
      ))}
            </div>
        </Fragment>
    );
}

export default Courses;