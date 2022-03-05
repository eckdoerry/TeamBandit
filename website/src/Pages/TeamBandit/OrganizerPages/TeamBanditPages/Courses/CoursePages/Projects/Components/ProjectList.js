import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// MUI Imports
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid";

// Page Components
import AddProject from "./AddProject";
import TeamsAssignment from "./TeamAssignmentButton";
import EditProject from "./EditProject";

const Projects = ({ courseInfo, setRoute }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const [sponsors, setSponsors] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [teams, setTeams] = useState([]);

    const [allAssignedStudents, setAllAssignedStudents] = useState([]);

    const editButton = (params) => {
        return (
            <EditProject
                project={params.row}
                setRowChange={setRowChange}
                courseInfo={courseInfo}
            />
        );
    };

    const teamPage = (params) => {
        const studentsOnTeam = [];
        
        var project_id = params.row.project_id;
        for(var i = 0; i < allAssignedStudents.length; i++)
        {
            if(allAssignedStudents[i].project_id === project_id)
            {
                studentsOnTeam.push(allAssignedStudents[i]);
            }
        }

        return (
            <div style={{height:'100%'}}>
                <Link target="_blank" to ={`/team-pages/${params.row.team_name}`}> {params.row.team_name} </Link>
                <div style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                    <div>
                        <img
                            src={
                                    params.row.team_logo
                                        ? "/uploads/images/teamLogos/" +
                                            params.row.team_logo
                                        : null
                                }
                            alt=""
                            width="100px"
                            height="100px"
                        />
                    </div>
                    <div>
                        <ul>
                            {studentsOnTeam.map((student) => (
                                displayStudent(student)
                            ))}
                            
                        </ul>
                    </div>  
                </div>
            </div>
        );
    };

    const displayStudent =  (student) => {
        
        const string = `mailto:` + student.student_email;
        if(isTeamLead(student.student_id) === true)
        {
            return(
                <li><a href={string}>{student.student_fname} {student.student_lname} (Lead)</a></li>
            ); 
        }
        else
        {
            return (<li>{student.student_fname} {student.student_lname}</li>);
        }
    };

    const isTeamLead =  (student_id) => {

        for(var i = 0; i < teams.length; i++)
        {
            if(teams[i].team_lead == student_id)
            {
                return true;
            }
        }
        return false;
    };

    const projectPage = (params) => {
        
        return (
            <div>
            <Typography variant="h5">{params.row.project_name}</Typography>
            <div style={{display:'flex'}}>
            <Link target="_blank" to={`/project-pages/${params.row.project_name}`}>
                Project Description
            </Link>
            <Link style={{paddingLeft:'7px'}}target="_blank" to={`/team-pages/${params.row.team_name}`}>
                Student Team Page
            </Link>
            </div>
            
            </div>
        );
    };

    const displayMentor = (params) => {
        var mentorName = "";
        var mentorEmail = "";
        for(var i = 0; i < mentors.length; i++)
        {
            if(mentors[i].mentor_id === params.row.mentor_id)
            {
                mentorName = `${mentors[i].mentor_name}`;
                mentorEmail = `${mentors[i].mentor_email}`;
            }
        }
        return(
            <div>
                <Typography>{mentorName}</Typography>
                <a href="">{mentorEmail}</a>
            </div>
        );
    }

    const displaySponsor = (params) => {
        var sponsorName = "";
        var sponsorNote = "";
        var sponsorOrg = "";
        for(var i = 0; i < sponsors.length; i++)
        {
            if(sponsors[i].client_id === params.row.client_id)
            {
                sponsorName = `${sponsors[i].client_fname} ${sponsors[i].client_lname}`;
                sponsorNote = `${sponsors[i].client_notes}`;
                sponsorOrg = `${sponsors[i].client_organization}`;
            }
        }
        return(
            <div>
                <div style={{display:'flex'}}>
                    <Typography style={{fontWeight: 'bold'}} >{sponsorName} </Typography>
                    <Typography style={{paddingLeft: '5px'}}>{sponsorNote}</Typography>
                </div>
                <br></br>
                <Typography>{sponsorOrg}</Typography>
                
            </div>
        );
    }

    const columns = [
        {
            field: "project_name",
            headerName: "Project Title",
            renderCell: projectPage,
            cellClassName: 'death',
            flex: 2,
        },
        {
            field: "client_name",
            headerName: "Project Sponsor",
            renderCell: displaySponsor,
            cellClassName: 'death',
            flex: 2,
        },
        {
            field: "team_name",
            headerName: "Student Team",
            renderCell: teamPage,
            cellClassName: 'death',
            flex: 3,
        },
        {
            field: "mentor_name",
            headerName: "Team Mentor",
            renderCell: displayMentor,
            cellClassName: 'death',
            flex: 1,
        },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: editButton,
            disableClickEventBubbling: true,
        },
    ];

    const CustomToolbar = () => {
        return (
            
                <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }} >
                    <Typography sx={{ m: 1 }} variant="h4">
                        Projects
                    </Typography>
                    <GridToolbarColumnsButton sx={{ m: 1 }} />
                    <GridToolbarFilterButton sx={{ m: 1 }} />
                    <GridToolbarExport sx={{ m: 1 }} />
                    <AddProject
                        courseInfo={courseInfo}
                        rows={rows}
                        setRowChange={setRowChange}
                    />
                    <TeamsAssignment setRoute={setRoute} />
                    <Typography sx={{ m: 1 }} variant="h6">
                        Public Address:
                    </Typography>
                    <Link target="_blank" to={`/team-page/${courseInfo.course_id}`}>
                {" "}
                { `http://34.216.91.228/team-page/${courseInfo.course_id}/`}{" "}
            </Link>
                </GridToolbarContainer>
        );
    };

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getSponsors = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/sponsors/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setSponsors(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getMentors = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/mentors/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setMentors(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getAssignedStudents = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/getAssignedStudents/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setAllAssignedStudents(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTeams = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/getTeams/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeams(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProjects();
        getAssignedStudents();
        getSponsors();
        getMentors();
        getTeams();
        setRowChange(false);
    }, [rowChange]);

    return (
            <div
                style={{
                    padding: "25px",
                    display: "flex",
                    height: "100%",
                    width: "100%",
                }}
            >
            <Box
                sx={{
                    height:'100%',
                    width:'100%',
                    '& .death': {
                        borderRight: 1,
                        borderColor: '#d3d3d3'
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={150}
                    getRowId={(rows) => rows.project_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                />
                </Box>
            </div>
    );
};

export default Projects;
