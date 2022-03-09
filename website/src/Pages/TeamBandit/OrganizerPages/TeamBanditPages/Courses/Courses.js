import {Fragment, React, useState, useEffect} from "react";

import FormDialogAddCourse from "./Components/FormDialogAddCourse";
import CourseTable from "./Components/CourseTable";
import Typography from "@mui/material/Typography";

// Stylesheet
import styles from "./Courses.module.css";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [coursesChange, setCoursesChange] = useState(false);

    // LOADING VARIABLES
    // ---------------------------------------------------------------------------
    // Loading time needs to get predetermined as currently I don't know how to
    // 'wait' for all of the information to get pulled. Still works and avoids the
    // awkward data loading period. TODO: Look into adjusting time
    // ---------------------------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const loadingTime = 1250;

    const setLoadingFalse = () => {
        setTimeout(() => {
            setLoading(false);
        }, loadingTime);
    };

    // END LOADING VARIABLES

    const getCourses = async () =>
    {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/courses/`, {method: "GET", headers: {token: localStorage.token}});

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
        setLoadingFalse();
    }, [coursesChange]);

    if (loading) {
        return (
            <div style={{display:'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <div className={styles.lds}><div></div><div></div><div></div></div>
            </div>
        );
    }

    return(
        <Fragment>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h3" gutterBottom>
                    Courses
                </Typography>
            <FormDialogAddCourse setCoursesChange = {setCoursesChange}/>
            </div>
            
            <CourseTable coursesInfo={courses} setCoursesChange={setCoursesChange}/>
        </Fragment>
    );
}

export default Courses;