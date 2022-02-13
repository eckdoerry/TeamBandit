import React from "react";
import CourseTableBodyCell from "./CourseTableBodyCell";

// MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CourseTable = ({ coursesInfo, setCoursesChange }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Course Name</TableCell>
                            <TableCell>Course Organizer</TableCell>
                            <TableCell>Course Semester</TableCell>
                            <TableCell>Course Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coursesInfo.map((courseInfo) => (
                            <CourseTableBodyCell
                                key={courseInfo.course_id}
                                courseInfo={courseInfo}
                                setCoursesChange={setCoursesChange}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default CourseTable;
