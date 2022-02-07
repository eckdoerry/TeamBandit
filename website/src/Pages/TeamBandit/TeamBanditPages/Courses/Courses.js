import {Fragment, React, useState, useEffect} from "react";

import styles from "./Courses.module.css";

import Course from "./Course";
import FormDialogAddCourse from "./FormDialogAddCourse";

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [coursesChange, setCoursesChange] = useState(false);

    const getCourses = async () =>
    {
        try {
            const response = await fetch("http://localhost:5000/courses/", {method: "GET", headers: {token: localStorage.token}});

            const parseData = await response.json();

            setCourses(parseData);

        } catch (error) {
            console.error(error.message);
        }
    }

    // Updates Page
    useEffect(() => {
        getCourses();
        setCoursesChange(false);
    }, [coursesChange]);

    console.log(courses);

    return(
        <Fragment>
            <h1>Courses</h1>
            <div className={styles.courseBtns}>
                <FormDialogAddCourse setCoursesChange = {setCoursesChange}/>
            </div>
            <div className={styles.courseContainer}>
                {courses.map((course) => (                   
                <Course key={course.course_id} courseInfo={course} courseChange={setCoursesChange}/>))}
                
            </div>
        </Fragment>
    );
}

export default Courses;