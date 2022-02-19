import {Fragment, React, useState, useEffect} from "react";

import styles from "./Courses.module.css";

import CourseTable from "./Components/CourseTable";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [coursesChange, setCoursesChange] = useState(false);

    const getCourses = async () =>
    {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/courses/student`, {method: "GET", headers: {token: localStorage.token}});

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

    return(
        <Fragment>
            <h1>Courses</h1>
            <CourseTable coursesInfo={courses} setCoursesChange={setCoursesChange}/>
        </Fragment>
    );
}

export default Courses;