// Utilize React and its UseState and UseEffect
import { React, useState, useEffect } from "react";

// Import MUI Elements
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Themes for the app bar?
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Link to home page
import { Link } from "react-router-dom";

// TeamBandit Logo for use in the 404 error page
import TeamBanditLogo from "../../Images/logo.png";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <p color="inherit">TeamBandit</p> {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const TeamPage = () => {
    const windowValue = window.location.pathname.replace("/team-pages/", "");
    const regExp = /%20/g;
    const team = windowValue.replace(regExp, " ");

    const [teamInfo, setTeamInfo] = useState([]);
    const [projectInfo, setProjectInfo] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const [colorValue, setColorValue] = useState("#00000");

    const getTeam = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeamInfo(jsonData);
            setColorValue(jsonData[0].page_color);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTeamMembers = async () => {
        try {
            const teamId = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const teamIddata = await teamId.json();

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-members/${teamIddata[0].team_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeamMembers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getProjectInfo = async () => {
        try {
            const teamId = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const teamIddata = await teamId.json();

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/project-info/${teamIddata[0].team_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setProjectInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTeam();
        getTeamMembers();
        getProjectInfo();
    }, []);

    if (teamInfo[0] != null && projectInfo[0] != null) {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar
                        style={{ backgroundColor: `${colorValue}` }}
                        position="relative"
                    >
                        <Toolbar style={{ backgroundColor: `${colorValue}` }}>
                            <img
                                src={
                                    teamInfo[0].team_logo
                                        ? "/uploads/images/teamLogos/" +
                                            teamInfo[0].team_logo
                                        : null
                                }
                                alt=""
                                width="50px"
                                height="50px"
                            />
                            <Typography variant="h6" color="inherit" noWrap>
                                {teamInfo[0].team_name}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                        <div>
                            <Box
                                sx={{
                                    bgcolor: "background.paper"
                                }}
                            >
                                <Container
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                    }}
                                >
                                    <img
                                        src={
                                            teamInfo[0].team_logo
                                                ? "/uploads/images/teamLogos/" +
                                                    teamInfo[0].team_logo
                                                : null
                                        }
                                        alt="Logo"
                                        width="500px"
                                        height="500px"
                                    />

                                    <div
                                        style={{}}
                                    >
                                        <Typography
                                            component="h1"
                                            variant="h2"
                                            align="center"
                                            color="text.primary"
                                            gutterBottom
                                        >
                                            {teamInfo[0].team_name}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            color="text.secondary"
                                            paragraph
                                        >
                                            {teamInfo[0].team_description}
                                        </Typography>
                                    </div>
                                    <div style={{ padding: "50px" }}>
                                        <Typography
                                            component="h1"
                                            variant="h2"
                                            align="center"
                                            color="text.primary"
                                            gutterBottom
                                        >
                                            Team Members
                                        </Typography>
                                        {teamMembers.map((teamMember) => (
                                            <Typography
                                                variant="h5"
                                                align="center"
                                                color="text.secondary"
                                                key={teamMember.student_id}
                                            >
                                                {teamMember.student_fname}{" "}
                                                {teamMember.student_lname}
                                            </Typography>
                                        ))}
                                    </div>
                                    <div style={{ padding: "50px" }}>
                                        <Typography
                                            component="h1"
                                            variant="h2"
                                            align="center"
                                            color="text.primary"
                                            gutterBottom
                                        >
                                            Project Sponsor
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            align="center"
                                            color="text.secondary"
                                        >
                                            {projectInfo[0].project_sponsor}
                                        </Typography>
                                    </div>
                                    <div style={{ padding: "50px" }}>
                                        <Typography
                                            component="h1"
                                            variant="h2"
                                            align="center"
                                            color="text.primary"
                                            gutterBottom
                                        >
                                            Team Mentor
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            color="text.secondary"
                                        >
                                            {projectInfo[0].project_mentor}
                                        </Typography>
                                    </div>
                                </Container>
                            </Box>
                        </div>
                    </main>
                    {/* Footer */}
                    <Box
                        sx={{ bgcolor: "background.paper", p: 6 }}
                        component="footer"
                    >
                        <Copyright />
                    </Box>
                    {/* End footer */}
                </ThemeProvider>
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
                    This Team Does Not Exist{" "}
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
