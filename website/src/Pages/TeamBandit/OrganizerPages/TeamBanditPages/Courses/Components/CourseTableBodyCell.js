import React from "react";
import CoursePage from "./CoursePage";

// MUI Imports
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const CourseTableBodyCell = ({ courseInfo, setCoursesChange }) => {
    return (
        <TableRow
            key={courseInfo.course_id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <CoursePage
                    courseInfo={courseInfo}
                    setCoursesChange={setCoursesChange}
                />
            </TableCell>
            <TableCell>
                {courseInfo.organizer_fname + " " + courseInfo.organizer_lname}
            </TableCell>
            <TableCell>{courseInfo.course_semester}</TableCell>
            <TableCell>{courseInfo.course_description}</TableCell>
        </TableRow>
    );
};

export default CourseTableBodyCell;
