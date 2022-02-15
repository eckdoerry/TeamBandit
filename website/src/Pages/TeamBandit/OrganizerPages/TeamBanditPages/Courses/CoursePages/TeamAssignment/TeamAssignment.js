import React, { useEffect, useState } from "react";

import "./TeamAssignment.css";

// MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TeamAssignment({ courseInfo }) {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);
    const [projects, setProjects] = useState([]);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [teams, setTeams] = useState([]);

    const WARNING = "#FFB774";
    const SUCCESS = "#9BFF8C";
    const FAILURE = "#FF8484";

    const getStudents = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/students/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getProjects = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/projects/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setProjects(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getProjectPref = (student_id, project_id) => {
        
        for(var i = 0; i < rows.length; i++)
        {
            if( rows[i].student_id === student_id )
            {
            
                if(rows[i].student_projectpref1 == project_id)
                {
                    return "First Choice";
                }
                else if(rows[i].student_projectpref2 == project_id)
                {
                    return "Second Choice";
                }
                else if(rows[i].student_projectpref3 == project_id)
                {
                    return "Third Choice";
                }
                else
                {
                    return "";
                }
            }
        }
        return "";
    };

    const teamTotal = (project_id) => {
        var total = 0;
        var teamSize = 0;
        for(var i = 0; i < assignedStudents.length; i++)
        {
            if( assignedStudents[i].project_id === project_id )
            {
                total++;
            }
        }
        for(var i = 0; i < teams.length; i++)
        {
            if( teams[i].project_id === project_id )
            {
                teamSize = teams[i].team_size;
            }
        }

        if(teamSize < total )
        {
            return "greater";
        }
        else if ( teamSize === total )
        {
            return "equal";
        }
        else
        {
            return "less";
        }
    }

    const getFirstChoice = (project_id) => {
        
        var total = 0;
        for(var i = 0; i < rows.length; i++)
        {
            if( rows[i].student_projectpref1 == project_id )
            {
                total++;
            }
        }
        return total;
    };

    const getSecondChoice = (project_id) => {
        
        var total = 0;
        for(var i = 0; i < rows.length; i++)
        {
            if( rows[i].student_projectpref2 == project_id )
            {
                total++;
            }
        }
        return total;
    };

    const getThirdChoice = (project_id) => {
        
        var total = 0;
        for(var i = 0; i < rows.length; i++)
        {
            if( rows[i].student_projectpref3 == project_id )
            {
                total++;
            }
        }
        return total;
    };

    const getChoiceTotals = (project_id) => {
        
        var total = 0;
        for(var i = 0; i < rows.length; i++)
        {
            if( rows[i].student_projectpref1 == project_id || rows[i].student_projectpref2 == project_id || rows[i].student_projectpref3 == project_id)
            {
                total++;
            }
        }
        return total;
    };

    const getTotalAssigned = (project_id) => {
        
        var total = 0;
        for(var i = 0; i < assignedStudents.length; i++)
        {
            if( assignedStudents[i].project_id === project_id )
            {
                total++;
            }
        }
        return total;
    };

    const getAssignedStudents = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/projects/getAssignedStudents/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setAssignedStudents(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTeams = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/teams/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeams(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getAssignedProject = (student_id) => {
        
        var pid = 0;
        var pname = "";

        for(var i = 0; i < assignedStudents.length; i++)
        {
            if( assignedStudents[i].student_id === student_id )
            {
                pid = assignedStudents[i].project_id;

                for( var j = 0; j < projects.length; j++ )
                {
                    if(projects[j].project_id === pid)
                    {
                        pname = projects[j].project_name;
                    }
                }
            }
        }

        return pname;
    };

    const toggleStudent = async (student_id, project_id) => {
        
        try {

            const body = {
                student_id,
                project_id
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch("http://localhost:5000/projects/toggleStudent", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            });

            setRowChange(true);
        } catch (error) {
            console.error(error.message);
        }
    };

    const studentInProject = (student_id, project_id) => {
        for (var i = 0; i < assignedStudents.length; i++)
        {
            if(assignedStudents[i].student_id == student_id && assignedStudents[i].project_id == project_id)
            {
                return true;
            }
            
        }
        return false;
    };

    useEffect(() => {
        getStudents();
        getProjects();
        getTeams();
        getAssignedStudents();
        setRowChange(false);
    }, [rowChange]);

    return (
        <div style={{ direction: "flex", padding: "25px", overflow: "auto" }}>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 1000, minHeight: 500 }}
                    aria-label="spanning table"
                >
                    <TableHead style={{ backgroundColor: "#002454" }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }}  colSpan={5}>
                        Students
                        </TableCell>
                        <TableCell style={{ color: "white" }} colSpan={1 + projects.length} align="left">Projects</TableCell>
                    </TableRow>
                        <TableRow>
                            <TableCell
                                style={{ minWidth: 200, color: "white" }}
                            >
                                Student Name
                            </TableCell>
                            <TableCell
                                style={{ minWidth: 200, color: "white" }}
                                align="right"
                            >
                                Student Email
                            </TableCell>
                            <TableCell
                                style={{ minWidth: 100, color: "white" }}
                                align="right"
                            >
                                Student UID
                            </TableCell>
                            <TableCell
                                style={{ minWidth: 100, color: "white" }}
                                align="right"
                            >
                                GPA
                            </TableCell>
                            <TableCell
                                style={{ minWidth: 150, color: "white" }}
                                align="right"
                            >
                                Assigned Project{" "}
                            </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    key={project.project_id}
                                    style={{ minWidth: 100, color: "white" }}
                                    align="right"
                                >
                                    {project.project_name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.student_id}>
                                <TableCell
                                    style={
                                        row.assigned
                                            ? { backgroundColor: SUCCESS }
                                            : { backgroundColor: FAILURE }
                                    }
                                >
                                    {row.student_fname} {row.student_lname}
                                </TableCell>
                                <TableCell align="right">
                                    {row.student_email}
                                </TableCell>
                                <TableCell align="right">
                                    {row.student_emplid}
                                </TableCell>
                                <TableCell align="right">
                                    {row.student_gpa}
                                </TableCell>
                                <TableCell align="right">{getAssignedProject(row.student_id)}</TableCell>
                                {projects.map( (project) => (
                                        <TableCell
                                        key={project.project_id}
                                        style={
                                            (studentInProject(row.student_id, project.project_id) === true)
                                                ? { cursor: 'pointer', backgroundColor: SUCCESS }
                                                : ({ cursor: 'pointer', backgroundColor: "white" })
                                        }
                                        onClick={() => toggleStudent(row.student_id, project.project_id)}
                                        align="right"
                                    >
                                        {getProjectPref(row.student_id, project.project_id)}
                                    </TableCell> 
                                ))}
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={5} />
                            <TableCell rowSpan={5} />
                            <TableCell rowSpan={5} />
                            <TableCell rowSpan={5} />
                            <TableCell> Total Assigned: </TableCell>
                            {projects.map((project) => (
                                <TableCell
                                    style={(teamTotal(project.project_id) === 'less') ? { backgroundColor: FAILURE } : (teamTotal(project.project_id) === 'equal') ? { backgroundColor: SUCCESS } : (teamTotal(project.project_id) === 'greater') ? { backgroundColor: WARNING } : { backgroundColor: "#FFFF59" } }
                                    align="right"
                                >
                                    {getTotalAssigned(project.project_id)}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
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
