import {Fragment, React, useState, useEffect} from "react";

import styles from "./Courses.module.css";

import Course from "./Course";
import FormDialogAddCourse from "./FormDialogAddCourse";
import FormDialogDeleteCourse from "./FormDialogDeleteCourse";

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


    // Delete Course
    const deleteCourse = async (inCourse) => {
        if (courses.length === 0)
        {
            alert("There are no courses to delete");
            return;
        }
        setCourses(courses.filter((course) => course.course !== inCourse.course));
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