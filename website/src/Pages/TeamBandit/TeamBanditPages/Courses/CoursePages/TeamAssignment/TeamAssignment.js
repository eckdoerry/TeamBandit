import React, { useEffect, useState } from "react";

import "./TeamAssignment.css";

// MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Stylesheet
import styles from "./TeamAssignment.module.css";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function TeamAssignment({ courseInfo, setRoute, userIdentifier }) {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);
    const [projects, setProjects] = useState([]);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [teams, setTeams] = useState([]);

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("student_gpa");

    const [gpaActive, setGPAActive] = useState(true);
    const [projectActive, setProjectActive] = useState(false);

    const WARNING = "#FFB774";
    const SUCCESS = "#9BFF8C";
    const FAILURE = "#FF8484";

    // LOADING VARIABLES
    const [loading, setLoading] = useState(true);

    const setLoadingFalse = () => {
        setLoading(false);
    };
    // END LOADING VARIABLES

    // SUPPORTING FUNCTIONS //
    const getProjectPref = (student_id, project_id) => {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].student_id === student_id) {
                if (rows[i].student_projectpref1 == project_id) {
                    return "1";
                } else if (rows[i].student_projectpref2 == project_id) {
                    return "2";
                } else if (rows[i].student_projectpref3 == project_id) {
                    return "3";
                } else if (rows[i].student_projectpref4 == project_id) {
                    return "4";
                } else if (rows[i].student_projectpref5 == project_id) {
                    return "5";
                } else {
                    return "";
                }
            }
        }
        return "";
    };

    const teamTotal = (project_id) => {
        var total = 0;
        var teamSize = courseInfo.team_size;

        for (var i = 0; i < assignedStudents.length; i++) {
            if (assignedStudents[i].project_id === project_id) {
                total++;
            }
        }

        if (teamSize < total) {
            return "greater";
        } else if (teamSize === total) {
            return "equal";
        } else {
            return "less";
        }
    };

    const getFirstChoice = (project_id) => {
        var total = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].student_projectpref1 == project_id) {
                total++;
            }
        }
        return total;
    };

    const getSecondChoice = (project_id) => {
        var total = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].student_projectpref2 == project_id) {
                total++;
            }
        }
        return total;
    };

    const getThirdChoice = (project_id) => {
        var total = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].student_projectpref3 == project_id) {
                total++;
            }
        }
        return total;
    };

    const getFourthChoice = (project_id) => {
        var total = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].student_projectpref4 == project_id) {
                total++;
            }
        }
        return total;
    };
    const getFifthChoice = (project_id) => {
        var total = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].student_projectpref5 == project_id) {
                total++;
            }
        }
        return total;
    };

    const getChoiceTotals = (project_id) => {
        var total = 0;
        for (var i = 0; i < rows.length; i++) {
            if (
                rows[i].student_projectpref1 == project_id ||
                rows[i].student_projectpref2 == project_id ||
                rows[i].student_projectpref3 == project_id
            ) {
                total++;
            }
        }
        return total;
    };

    const getTotalAssigned = (project_id) => {
        var total = 0;
        for (var i = 0; i < assignedStudents.length; i++) {
            if (assignedStudents[i].project_id === project_id) {
                total++;
            }
        }
        return total;
    };


    const toggleStudent = async (student_id, project_id) => {
        try {
            const course_id = courseInfo.course_id;
            const body = {
                student_id,
                project_id,
                course_id,
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/toggleStudent`,
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setRowChange(true);
        } catch (error) {
            console.error(error.message);
        }
    };

    const studentInProject = (student_id, project_id) => {
        for (var i = 0; i < assignedStudents.length; i++) {
            if (
                assignedStudents[i].student_id == student_id &&
                assignedStudents[i].project_id == project_id
            ) {
                return true;
            }
        }
        return false;
    };

    // END SUPPORTING FUNCTIONS //

    // SORTS //

    const sortByGpa = () => {
        setGPAActive(true);
        setProjectActive(false);

        const isAsc = order === "asc";
        setOrder(isAsc ? "desc" : "asc");

        setOrderBy("student_gpa");

        setRows(stableSort(rows, getComparator(order, orderBy)));
    };

    const sortByProject = () => {
        setGPAActive(false);
        setProjectActive(true);

        const isAsc = order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy("project_name");

        setRows(stableSort(rows, getComparator(order, orderBy)));
    };

    // @TODO: I think there should be a reset feature for the sort to go back to how it originally was but IDK
    const sortByStudent = () => {
        setGPAActive(false);
        setProjectActive(false);

        const isAsc = order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy("student_id");

        setRows(orderBy(rows, orderBy, order(order, orderBy)));
    };

    // END SORTS //

    const getInformation = async () => {
        try{
            const projectInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const studentInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/students/teams-assignment/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const assignedStudentInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/getAssignedStudents/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const teamInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const projectData = await projectInfo.json();
            const studentData = await studentInfo.json();
            const assignedStudentData = await assignedStudentInfo.json();
            const teamData = await teamInfo.json();

            setProjects(projectData);
            setRows(studentData);
            setTeams(teamData);
            setAssignedStudents(assignedStudentData);
            setLoadingFalse();
        }catch( error ){
            console.error( error.message )
        }
    };

    useEffect(() => {
        getInformation();
    }, []);

    useEffect(() => {
        getInformation();
        setRowChange(false);
    }, [rowChange]);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className={styles.lds}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: "25px", overflow: "auto" }}>
            <Button
                style={{ textAlign: "center", whiteSpace: "nowrap" }}
                sx={{ m: 3 }}
                variant="contained"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={() => setRoute("Projects")}
            >
                {" "}
                Back to Projects{" "}
            </Button>
            <TableContainer style={{ overflowX: "initial" }}>
                <Table aria-label="spanning table">
                    <TableHead className="sticky">
                        <TableRow
                            
                        >
                            <TableCell style={{ color: "white" }} colSpan={3}>
                                Students
                            </TableCell>
                            <TableCell
                                style={{ color: "white" }}
                                colSpan={projects.length - 1}
                                align="left"
                            >
                                Projects
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                                Team Size Goal: {courseInfo.team_size}
                            </TableCell>
                        </TableRow>
                        <TableRow
                           style={{
                                boxShadow:
                                    "0 4px 2px 0px #002454, 0 -6px 1px 0px #002454",
                            }}
                        >
                            <TableCell style={{ color: "white" }}>
                                Student Information
                            </TableCell>
                            <TableCell
                                key={"gpa"}
                                style={{ color: "white" }}
                                align="right"
                            >
                                GPA
                                <TableSortLabel
                                    sx={{
                                        "&.MuiTableSortLabel-root": {
                                            color: "white",
                                        },
                                        "&.MuiTableSortLabel-root:hover": {
                                            color: "grey",
                                        },
                                        "&.Mui-active": {
                                            color: "white",
                                        },
                                        "& .MuiTableSortLabel-icon": {
                                            color: "white !important",
                                        },
                                    }}
                                    onClick={sortByGpa}
                                    active={gpaActive}
                                    direction={order}
                                ></TableSortLabel>
                            </TableCell>
                            <TableCell
                                key={"project"}
                                style={{ color: "white", borderRight: 1,
                        borderColor: "#d3d3d3",}}
                                align="right"
                            >
                                Assigned Project{" "}
                                <TableSortLabel
                                    sx={{
                                        "&.MuiTableSortLabel-root": {
                                            color: "white",
                                        },
                                        "&.MuiTableSortLabel-root:hover": {
                                            color: "grey",
                                        },
                                        "&.Mui-active": {
                                            color: "white",
                                        },
                                        "& .MuiTableSortLabel-icon": {
                                            color: "white !important",
                                        },
                                    }}
                                    active={projectActive}
                                    direction={order}
                                    onClick={sortByProject}
                                ></TableSortLabel>
                            </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    style={{ color: "white" }}
                                    align="right"
                                >
                                    {project.project_name}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow
                            style={{
                                backgroundColor: "white",
                                boxShadow: "0 4px 2px -2px gray",
                            }}
                        >
                            <TableCell rowSpan={5} />
                            <TableCell rowSpan={5} />

                            <TableCell style={{ textAlign: "right" }}>
                                {" "}
                                Total Assigned:{" "}
                            </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    style={
                                        teamTotal(project.project_id) === "less"
                                            ? { backgroundColor: FAILURE }
                                            : teamTotal(project.project_id) ===
                                              "equal"
                                            ? { backgroundColor: SUCCESS }
                                            : teamTotal(project.project_id) ===
                                              "greater"
                                            ? { backgroundColor: WARNING }
                                            : { backgroundColor: "#FFFF59" }
                                    }
                                    align="right"
                                >
                                    {getTotalAssigned(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                sx={{ m: 2 }}
                                style={{ height: 25, padding: 2 }}
                                key={row.student_id}
                            >
                                <TableCell
                                    style={
                                        row.assigned
                                            ? {
                                                  width: 350,
                                                  backgroundColor: SUCCESS,
                                              }
                                            : { backgroundColor: "white" }
                                    }
                                >
                                    {row.student_fname} {row.student_lname},{" "}
                                    {row.student_email}, {row.student_emplid}
                                </TableCell>
                                <TableCell
                                    style={{ backgroundColor: "#ededed",borderRight: "1px solid #ededed",}}
                                    align="right"
                                >
                                    {row.student_gpa}
                                </TableCell>
                                <TableCell
                                    style={{
                                        backgroundColor: "#ededed",
                                        borderRight: "1px solid #ededed",
                                    }}
                                    align="right"
                                >
                                    {row.project_name}
                                </TableCell>
                                {projects.map((project) => (
                                    <TableCell
                                        key={project.project_id}
                                        style={
                                            studentInProject(
                                                row.student_id,
                                                project.project_id
                                            ) === true
                                                ? {
                                                      cursor: "pointer",
                                                      backgroundColor: SUCCESS,
                                                      borderRight: "1px solid #ededed",
                                                  }
                                                : {
                                                      cursor: "pointer",
                                                      backgroundColor: "white",
                                                      borderRight: "1px solid #ededed",
                                                  }
                                        }
                                        onClick={() =>
                                            toggleStudent(
                                                row.student_id,
                                                project.project_id
                                            )
                                        }
                                        align="right"
                                    >
                                        {getProjectPref(
                                            row.student_id,
                                            project.project_id
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={2} />
                            <TableCell rowSpan={2} />

                            <TableCell> First Choice: </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    align="right"
                                >
                                    {getFirstChoice(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell> Second Choice: </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    align="right"
                                >
                                    {getSecondChoice(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell rowSpan={2} />
                            <TableCell rowSpan={2} />
                            <TableCell> Third Choice: </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    align="right"
                                >
                                    {getThirdChoice(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell> Fourth Choice: </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    align="right"
                                >
                                    {getFourthChoice(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell rowSpan={2} />
                            <TableCell rowSpan={2} />
                            <TableCell> Fifth Choice: </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    align="right"
                                >
                                    {getFifthChoice(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell> Total Choice: </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    align="right"
                                >
                                    {getChoiceTotals(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
