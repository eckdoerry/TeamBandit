import { React, useState, useEffect } from "react";
import styles from "../Courses.module.css";

// Page Components
import CoursePage from "./CoursePage";

// MUI Imports
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const CourseTableBodyCell = ({ courseInfo, userInfo, userIdentifier, setCoursesChange }) => {

    const [projects, setProjects] = useState([]);
    const [students, setStudents] = useState([]);

    const getStatistics = async () => {
        try {
            const studentTotal = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/student-total/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            
            const projectTotal = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/project-total/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const studentData = await studentTotal.json();
            const projectData = await projectTotal.json();

            setProjects(studentData);
            setStudents(projectData);
        } catch ( error ) {
            console.error( error.message );
        }
    };

    useEffect(() => {
        getStatistics();
    }, []);
    
    var adjustedDate = "";
    if(courseInfo.course_id !== null)
    {
        if( userIdentifier == "organizer" )
        {
            adjustedDate = courseInfo.creation_date.replace("T07:00:00.000Z", "");
        }
    }

    if( userIdentifier == "organizer" )
    {
        return(
            <TableRow
                key={courseInfo.course_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row" className={styles.tableCellBorder}>
                    <CoursePage
                        userInfo={userInfo}
                        userIdentifier={userIdentifier}
                        courseInfo={courseInfo}
                        setCoursesChange={setCoursesChange}
                    />
                </TableCell>
                <TableCell className={styles.tableCellBorder}>
                    {courseInfo.organizer_fname + " " + courseInfo.organizer_lname}
                </TableCell>
                <TableCell className={styles.tableCellBorder}>{courseInfo.course_semester}</TableCell>
                <TableCell className={styles.tableCellBorder}>{projects.length}</TableCell>
                <TableCell className={styles.tableCellBorder}>{students.length}</TableCell>
                <TableCell>{adjustedDate}</TableCell>
            </TableRow> 
        );
    }
    else if ( userIdentifier == "student" )
    {
        return(
            <TableRow
                key={courseInfo.course_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell className={styles.tableCellBorder} component="th" scope="row">
                    <CoursePage
                        userInfo={userInfo}
                        courseInfo={courseInfo}
                        userIdentifier={userIdentifier}
                        setCoursesChange={setCoursesChange}
                    />
                </TableCell>
                <TableCell>{courseInfo.course_semester}</TableCell>
            </TableRow> 
        );
    }
    else if ( userIdentifier == "mentor" )
    {
        // TODO: Implement Mentor
        return(
            <p> no mentor yet </p>
        );
    }
};

export default CourseTableBodyCell;
