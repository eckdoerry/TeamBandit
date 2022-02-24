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
                    <TableHead >
                        <TableRow>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Course Name</TableCell>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Course Organizer</TableCell>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Course Semester</TableCell>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Total Projects</TableCell>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Total Students</TableCell>
                            <TableCell style={{ background: "#002454", color: 'white'}}>Date Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coursesInfo.length === 0 ? null : coursesInfo.map((courseInfo) => (
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
