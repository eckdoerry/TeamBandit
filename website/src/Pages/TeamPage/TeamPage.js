import { React, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid";

import TeamBanditLogo from "../../Images/logo.png";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                TeamBandit
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const TeamPage = () => {
    const windowValue = window.location.pathname.replace("/team-page/", "");
    const regExp = /%20/g;
    const course_id = windowValue.replace(regExp, " ");

    const [rows, setRows] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isCourse, setIsCourse] = useState(false);

    const [allAssignedStudents, setAllAssignedStudents] = useState([]);

    const teamPage = (params) => {
        const studentsOnTeam = [];
        var project_id = params.row.project_id;
        for(var i = 0; i < allAssignedStudents.length; i++)
        {
            if(allAssignedStudents[i].project_id === project_id)
            {
                studentsOnTeam.push(`${allAssignedStudents[i].student_fname} ${allAssignedStudents[i].student_lname}`)
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
                                <li key={student}>{displayStudent(student)}</li>
                            ))}
                            
                        </ul>
                    </div>  
                </div>
            </div>
        );
    };

    const displayStudent =  (student) => {
        const studentName = student.split(' ');

        if(isTeamLead(studentName[0], studentName[1]) === true)
        {
            return `Team Lead: ${student}` 
        }
        else
        {
            return student;
        }
    };

    const isTeamLead =  (fname, lname) => {
        var student_id = -1;

        for(var i = 0; i < allAssignedStudents.length; i++)
        {
            if(allAssignedStudents[i].student_fname === fname && allAssignedStudents[i].student_lname === lname)
            {
                student_id = allAssignedStudents[i].student_id;
            }
        }
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
            <Link target="_blank" to={`/project-pages/${params.row.project_name}`}>
                {" "}
                {params.row.project_name}{" "}
            </Link>
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
            flex: 2,
        },
        {
            field: "client_name",
            headerName: "Project Sponsor",
            renderCell: displaySponsor,
            flex: 2,
        },
        {
            field: "team_name",
            headerName: "Student Team",
            renderCell: teamPage,
            flex: 3,
        },
        {
            field: "mentor_name",
            headerName: "Team Mentor",
            renderCell: displayMentor,
            flex: 1,
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
                </GridToolbarContainer>
        );
    };

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/projects/${course_id}`,
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
                `${process.env.REACT_APP_BASEURL}/general/sponsors/${course_id}`,
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
                `${process.env.REACT_APP_BASEURL}/general/mentors/${course_id}`,
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
                `${process.env.REACT_APP_BASEURL}/general/getAssignedStudents/${course_id}`,
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
                `${process.env.REACT_APP_BASEURL}/general/getTeams/${course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeams(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const isACourse = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/isCourse/${course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            
            if(jsonData != null)
            {
                console.log(true)
                setIsCourse(true);
            }
            else {
                console.log(false)
                setIsCourse(false);
            }
            
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
        isACourse();
    }, [isCourse]);

    
    if (isCourse == true && rows != []) {
        return (
            <div>
            <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar
                        style={{ backgroundColor: `#002454` }}
                        position="relative"
                    >
                        <Toolbar style={{ backgroundColor: `#002454` }}>
                            <Typography variant="h6" color="inherit" noWrap>
                                TeamBandit
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <div
                style={{
                    padding: "25px",
                    display: "flex",
                    height: "100%",
                    width: "100%",
                }}
            >
            
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    rowHeight={150}
                    getRowId={(rows) => rows.project_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                />
            </div>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar
                        style={{ backgroundColor: `#002454` }}
                        position="relative"
                    >
                        <Toolbar style={{ backgroundColor: `#002454` }}>
                            <Typography variant="h6" color="inherit" noWrap>
                                TeamBandit
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <Typography
                    variant="h1"
                    style={{
                        color: "#002454",
                        textShadow: "1px 1px 2px black",
                    }}
                >
                    {" "}
                    404{" "}
                </Typography>
                <Typography
                    variant="h4"
                    style={{
                        color: "#FAC01A",
                        textShadow: "1px 1px 2px black",
                    }}
                >
                    {" "}
                    This Course Does Not Exist{" "}
                </Typography>
                
                    <img
                        src={TeamBanditLogo}
                        alt="Logo"
                        width="250px"
                        height="250px"
                    />
                <Link to="/"><Button variant="contained" style={{backgroundColor:"#002454"}}> GO BACK TO HOME PAGE </Button></Link>
            </div>
        );
    }
};

export default TeamPage;
