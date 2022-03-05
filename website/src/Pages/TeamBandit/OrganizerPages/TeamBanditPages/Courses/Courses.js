import {Fragment, React, useState, useEffect} from "react";

import FormDialogAddCourse from "./Components/FormDialogAddCourse";
import CourseTable from "./Components/CourseTable";
import Typography from "@mui/material/Typography";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [coursesChange, setCoursesChange] = useState(false);

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
    }, [coursesChange]);

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