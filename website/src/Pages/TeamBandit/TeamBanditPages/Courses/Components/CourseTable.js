import {React} from "react";
import styles from "../Courses.module.css";

// Page Components
import CourseTableBodyCell from "./CourseTableBodyCell";

// MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CourseTable = ({ coursesInfo, userInfo, userIdentifier, setCoursesChange }) => {
    
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead >
                    {userIdentifier == "organizer" ? 
                        <TableRow>
                            <TableCell className={styles.tableCell}>Course Name</TableCell>
                            <TableCell className={styles.tableCell}>Course Organizer</TableCell>
                            <TableCell className={styles.tableCell}>Course Semester</TableCell>
                            <TableCell className={styles.tableCell}>Course Year</TableCell>
                            <TableCell className={styles.tableCell}>Total Projects</TableCell>
                            <TableCell className={styles.tableCell}>Total Students</TableCell>
                            <TableCell className={styles.tableCell}>Date Created</TableCell>
                        </TableRow> : userIdentifier == "student" ? 
                        <TableRow>
                            <TableCell className={styles.tableCell}>Course Name</TableCell>
                            <TableCell className={styles.tableCell}>Course Semester</TableCell>
                            <TableCell className={styles.tableCell}>Course Year</TableCell>
                        </TableRow> : userIdentifier == "mentor" ? null : null
                    }
                    </TableHead>
                    <TableBody>
                        {(coursesInfo.length == 0 || coursesInfo[0].course_id == null) ? null : coursesInfo.map((courseInfo) => (
                            <CourseTableBodyCell
                                key={courseInfo.course_id}
                                courseInfo={courseInfo}
                                userInfo={userInfo}
                                userIdentifier={userIdentifier}
                                setCoursesChange={setCoursesChange}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CourseTable;
