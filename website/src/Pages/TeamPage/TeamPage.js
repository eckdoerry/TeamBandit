import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Stylesheet
import styles from "./TeamPage.module.css";

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
    const [coursePublic, setCoursePublic] = useState(false);

    const [allAssignedStudents, setAllAssignedStudents] = useState([]);

    // LOADING VARIABLES
    // ---------------------------------------------------------------------------
    // Loading time needs to get predetermined as currently I don't know how to
    // 'wait' for all of the information to get pulled. Still works and avoids the
    // awkward data loading period. TODO: Look into adjusting time
    // ---------------------------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const loadingTime = 1500;

    const setLoadingFalse = () => {
        setTimeout(() => {
            setLoading(false);
        }, loadingTime);
    };

    // END LOADING VARIABLES

    const teamPage = (params) => {
        const studentsOnTeam = [];

        var project_id = params.row.project_id;
        for (var i = 0; i < allAssignedStudents.length; i++) {
            if (allAssignedStudents[i].project_id === project_id) {
                studentsOnTeam.push(allAssignedStudents[i]);
            }
        }

        return (
            <div style={{ height: "100%" }}>
                <Link
                    target="_blank"
                    to={`/team-website/${params.row.team_name}`}
                >
                    {" "}
                    <Typography variant="h5">
                        {params.row.team_name}
                    </Typography>{" "}
                </Link>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
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
                            {studentsOnTeam.map((student) =>
                                displayStudent(student)
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const displayStudent = (student) => {
        const string = `mailto:` + student.student_email;
        if (isTeamLead(student.student_id) === true) {
            return (
                <li>
                    <a href={string}>
                        {student.student_fname} {student.student_lname} (Lead)
                    </a>
                </li>
            );
        } else {
            return (
                <li>
                    {student.student_fname} {student.student_lname}
                </li>
            );
        }
    };

    const isTeamLead = (student_id) => {
        for (var i = 0; i < teams.length; i++) {
            if (teams[i].team_lead == student_id) {
                return true;
            }
        }
        return false;
    };

    const projectPage = (params) => {
        return (
            <div>
                <Typography variant="h5">{params.row.project_name}</Typography>
                <div style={{ display: "flex" }}>
                    <Link
                        target="_blank"
                        to={`/project-pages/${params.row.project_name}`}
                    >
                        Project Description
                    </Link>
                    <Link
                        style={{ paddingLeft: "7px" }}
                        target="_blank"
                        to={`/team-pages/${params.row.team_name}`}
                    >
                        Student Team Page
                    </Link>
                </div>
            </div>
        );
    };

    const displayMentor = (params) => {
        var mentorName = "";
        var mentorEmail = "";
        for (var i = 0; i < mentors.length; i++) {
            if (mentors[i].mentor_id === params.row.mentor_id) {
                mentorName = `${mentors[i].mentor_name}`;
                mentorEmail = `${mentors[i].mentor_email}`;
            }
        }
        return (
            <div>
                <Typography>{mentorName}</Typography>
                <a href="">{mentorEmail}</a>
            </div>
        );
    };

    const displaySponsor = (params) => {
        var sponsorName = "";
        var sponsorNote = "";
        var sponsorOrg = "";
        var sponsorLocation = "";
        var sponsorLogo = "";

        for (var i = 0; i < sponsors.length; i++) {
            if (sponsors[i].client_id === params.row.client_id) {
                sponsorName = `${sponsors[i].client_fname} ${sponsors[i].client_lname}`;
                sponsorNote = `${sponsors[i].client_notes}`;
                sponsorOrg = `${sponsors[i].client_organization}`;
                sponsorLocation = `${sponsors[i].client_location}`;
                sponsorLogo = `${sponsors[i].client_logo}`;
            }
        }

        return (
            <div>
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ paddingRight: "50px" }}>
                        <div style={{ display: "flex" }}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: "bold" }}
                            >
                                {sponsorName}{" "}
                            </Typography>
                            <Typography
                                variant="h8"
                                style={{
                                    paddingLeft: "5px",
                                    paddingTop: "7.5px",
                                }}
                            >
                                {sponsorNote}
                            </Typography>
                        </div>

                        <Typography>{sponsorOrg}</Typography>
                        <Typography>{sponsorLocation}</Typography>
                    </div>
                    <div style={{ alignItems: "right" }}>
                        {sponsorLogo != "null" ? (
                            <img
                                src={
                                    sponsorLogo
                                        ? "/uploads/images/clientLogos/" +
                                          sponsorLogo
                                        : null
                                }
                                alt=""
                                width="100px"
                                height="100px"
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    };

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
    ];

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }}>
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

            if (jsonData != null) {
                setIsCourse(true);
            } else {
                setIsCourse(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const isCoursePublic = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/isPublic/${course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();
            if (jsonData != null) {
                setCoursePublic(jsonData.course_public);
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
        isCoursePublic();
        setLoadingFalse();
    }, [isCourse]);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
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

    if (!coursePublic) {
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
                    variant="h4"
                    style={{
                        color: "#FAC01A",
                        textShadow: "1px 1px 2px black",
                    }}
                >
                    {" "}
                    This Course is set to Private{" "}
                </Typography>

                <img
                    src={TeamBanditLogo}
                    alt="Logo"
                    width="250px"
                    height="250px"
                />
                <Link to="/">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#002454" }}
                    >
                        {" "}
                        GO BACK TO HOME PAGE{" "}
                    </Button>
                </Link>
            </div>
        );
    }

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
                        autoHeight
                        rowHeight={150}
                        getRowId={(rows) => rows.project_id}
                        components={{ Toolbar: CustomToolbar }}
                        disableSelectionOnClick
                    />
                    </Box>
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
                <Link to="/">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#002454" }}
                    >
                        {" "}
                        GO BACK TO HOME PAGE{" "}
                    </Button>
                </Link>
            </div>
        );
    }
};

export default TeamPage;
