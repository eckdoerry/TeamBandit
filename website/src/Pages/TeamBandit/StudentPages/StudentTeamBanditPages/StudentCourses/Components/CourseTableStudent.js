import React from "react";
import CourseTableBodyCellStudent from "./CourseTableBodyCellStudent";

// MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CourseTable = ({ studentInfo, coursesInfo, setCoursesChange }) => {
    return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Course Name</TableCell>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Course Semester</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coursesInfo.map((courseInfo) => (
                            <CourseTableBodyCellStudent
                                key={courseInfo.course_id}
                                studentInfo={studentInfo}
                                courseInfo={courseInfo}
                                setCoursesChange={setCoursesChange}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
};

export default CourseTable;
