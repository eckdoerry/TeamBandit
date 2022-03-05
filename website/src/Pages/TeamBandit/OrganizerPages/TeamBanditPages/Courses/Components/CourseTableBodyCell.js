import { React, useState, useEffect } from "react";
import CoursePage from "./CoursePage";

// MUI Imports
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const CourseTableBodyCell = ({ courseInfo, setCoursesChange }) => {
    const [projects, setProjects] = useState([]);
    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/student-total/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setStudents(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/project-total/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setProjects(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getStudents();
        getProjects();
    }, []);
    
    var adjustedDate = "";
    if(courseInfo.course_id !== null)
    {
        adjustedDate = courseInfo.creation_date.replace("T07:00:00.000Z", "");
    }

    return (
        <TableRow
            key={courseInfo.course_id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row" style={{borderRight: '1px solid #d3d3d3'}}>
                <CoursePage
                    courseInfo={courseInfo}
                    setCoursesChange={setCoursesChange}
                />
            </TableCell>
            <TableCell style={{borderRight: '1px solid #d3d3d3'}}>
                {courseInfo.organizer_fname + " " + courseInfo.organizer_lname}
            </TableCell>
            <TableCell style={{borderRight: '1px solid #d3d3d3'}}>{courseInfo.course_semester}</TableCell>
            <TableCell style={{borderRight: '1px solid #d3d3d3'}}>{projects.length}</TableCell>
            <TableCell style={{borderRight: '1px solid #d3d3d3'}}>{students.length}</TableCell>
            <TableCell>{adjustedDate}</TableCell>
        </TableRow>
    );
};

export default CourseTableBodyCell;
