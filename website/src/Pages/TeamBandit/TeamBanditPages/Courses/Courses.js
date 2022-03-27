import { Fragment, React, useState, useEffect } from "react";
import styles from "./Courses.module.css";

// Page Components
import FormDialogAddCourse from "./Components/FormDialogAddCourse";
import CourseTable from "./Components/CourseTable";

// MUI Imports
import Typography from "@mui/material/Typography";

// Toast!
import { toast } from "react-toastify";

const Courses = ({userInfo, userIdentifier}) => {
    const [courses, setCourses] = useState([]);
    const [coursesChange, setCoursesChange] = useState(false);

    // LOADING VARIABLES
    const [loading, setLoading] = useState(true);

    const setLoadingFalse = () => {
        setLoading(false);
    };
    // END LOADING VARIABLES

    const getCourses = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses`,
                { method: "GET", headers: { token: localStorage.token, type: localStorage.user } }
            );
            const parseData = await response.json();

            setCourses(parseData);
            setLoadingFalse();
        } catch (error) {
            toast.error("Failed to get course information");
            console.error(error.message);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    // Updates Page
    useEffect(() => {
        getCourses();
        setCoursesChange(false);
    }, [coursesChange]);

    // Loading element
    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.lds}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <div className={styles.row}>
                <Typography variant="h3" gutterBottom>
                    Courses
                </Typography>
                {userIdentifier == "organizer" && <FormDialogAddCourse setCoursesChange={setCoursesChange} />}
            </div>
            <CourseTable
                coursesInfo={courses}
                userInfo={userInfo}
                userIdentifier={userIdentifier}
                setCoursesChange={setCoursesChange}
            />
        </Fragment>
    );
};

export default Courses;
