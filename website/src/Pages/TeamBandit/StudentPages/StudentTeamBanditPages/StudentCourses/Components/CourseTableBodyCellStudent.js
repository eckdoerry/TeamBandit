import React from "react";
import CoursePageStudent from "./CoursePageStudent";

// MUI Imports
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const CourseTableBodyCellStudent = ({ studentInfo, courseInfo, setCoursesChange }) => {
    return (
        <TableRow
            key={courseInfo.course_id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell style={{borderRight: '1px solid #d3d3d3'}} component="th" scope="row">
                <CoursePageStudent
                    studentInfo={studentInfo}
                    courseInfo={courseInfo}
                    setCoursesChange={setCoursesChange}
                />
            </TableCell>
            <TableCell>{courseInfo.course_semester}</TableCell>
        </TableRow>
    );
};

export default CourseTableBodyCellStudent;
