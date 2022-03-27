// Utilize React and its UseState and UseEffect
import { React, useState, useEffect } from "react";

// Import MUI Elements
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Themes for the app bar?
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Link to home page
import { Link } from "react-router-dom";

// TeamBandit Logo for use in the 404 error page
import TeamBanditLogo from "../../Images/logo.png";

// Stylesheet
import styles from "./TeamWebsite.module.css";

const theme = createTheme();

function Copyright() {
    return (
        <Typography
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            variant="body2"
            color="text.secondary"
            align="center"
        >
            {"Copyright © "}
            <p
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
                color="inherit"
            >
                TeamBandit
            </p>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const TeamPage = () => {
    const windowValue = window.location.pathname.replace("/team-website/", "");
    const regExp = /%20/g;
    const team = windowValue.replace(regExp, " ");

    const [teamInfo, setTeamInfo] = useState([]);
    const [projectInfo, setProjectInfo] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const [value, setValue] = useState("one");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [colorValue, setColorValue] = useState("#00000");
    const [fontColor, setFontColor] = useState("#FFFFFF");

    const drawerWidth = 300;

    // LOADING VARIABLES
    // ---------------------------------------------------------------------------
    // Loading time needs to get predetermined as currently I don't know how to
    // 'wait' for all of the information to get pulled. Still works and avoids the
    // awkward data loading period. TODO: Look into adjusting time
    // ---------------------------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const loadingTime = 2500;

    const setLoadingFalse = () => {
        setTimeout(() => {
            setLoading(false);
        }, loadingTime);
    };

    // END LOADING VARIABLES

    const getTeam = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeamInfo(jsonData);
            setColorValue(jsonData[0].page_color);
            setFontColor(jsonData[0].font_color);
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
        setLoadingFalse();
    }, []);

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
    if (teamInfo[0] != null && !teamInfo[0].course_public) {
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
                </ThemeProvider>

                <Typography
                    variant="h4"
                    style={{
                        color: "#FAC01A",
                        textShadow: "1px 1px 2px black",
                    }}
                >
                    {" "}
                    This Team's Webpage is set to Private{" "}
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
    if (teamInfo[0] != null && projectInfo[0] != null) {
        return (
            <div>
                <Box
                    style={{ backgroundColor: "pink" }}
                    sx={{ display: "flex" }}
                >
                    <Drawer
                        PaperProps={{
                            sx: {
                                backgroundColor: `${colorValue}`,
                                color: `${fontColor}`,
                            },
                        }}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box",
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Toolbar
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="inherit"
                                noWrap
                                style={{
                                    paddingRight: "10px",
                                    paddingLeft: "10px",
                                }}
                            >
                                {teamInfo[0].team_name}
                            </Typography>
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
                        </Toolbar>

                        <Divider />
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            textColor="inherit"
                            indicatorColor="inherit"
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: "divider" }}
                        >
                            <Tab value="one" label="Overview" />
                            <Tab value="two" label="Solution" />
                            <Tab value="three" label="Deliverables" />
                            <Tab value="four" label="Schedule" />
                        </Tabs>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: `${colorValue}`,
                                backgroundImage: `url(/uploads/images/teamBackdrop/${teamInfo[0].team_backdrop})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "100% 100%",
                                height: "auto",
                                paddingTop: "200px",
                                paddingBottom: "200px",
                                boxShadow: "5px 10px #888888",
                            }}
                        >
                            <Container
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    padding: "20px",
                                }}
                            >
                                <img
                                    style={{ border: "2px solid white" }}
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
                                <div style={{ paddingLeft: "20px" }}>
                                    <Typography
                                        style={{
                                            borderBottom: `2px solid ${fontColor}`,
                                            color: `${fontColor}`,
                                        }}
                                        variant="h2"
                                        color="white"
                                        gutterBottom
                                    >
                                        {teamInfo[0].team_name}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="#ffffff"
                                        paragraph
                                        style={{
                                            padding: "20px",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            color: `${fontColor}`,
                                        }}
                                    >
                                        {teamInfo[0].team_description}
                                    </Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            style={{
                                                margin: "5px",
                                                backgroundColor: `${colorValue}`,
                                            }}
                                            variant="contained"
                                        >
                                            {" "}
                                            SOLUTION{" "}
                                        </Button>
                                        <Button
                                            style={{
                                                margin: "5px",
                                                backgroundColor: `${colorValue}`,
                                            }}
                                            variant="contained"
                                        >
                                            {" "}
                                            WATCH VIDEO{" "}
                                        </Button>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div style={{ backgroundColor: "white" }}>
                            <div style={{ padding: "50px" }}>
                                <Typography
                                    component="h1"
                                    variant="h2"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Meet the Team
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {teamMembers.map((teamMember) => (
                                        <Card
                                            key={teamMember.student_id}
                                            style={{ margin: "15px" }}
                                        >
                                            <img
                                                src={
                                                    teamMember.profilepic_filepath !=
                                                    null
                                                        ? "/uploads/images/profilePictures/" +
                                                          teamMember.profilepic_filepath
                                                        : null
                                                }
                                                alt=""
                                                width="250px"
                                                height="250px"
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="h5"
                                                    align="center"
                                                    color="text.secondary"
                                                >
                                                    {teamMember.student_fname}{" "}
                                                    {teamMember.student_lname}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    align="center"
                                                    gutterBottom
                                                >
                                                    {teamMember.student_bio}
                                                </Typography>
                                            </CardContent>
                                            <CardActions
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Button size="small">
                                                    Learn More
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: "100px",
                                }}
                            >
                                <div style={{padding: "50px" }}>
                                
                                    <Typography
                                        component="h1"
                                        variant="h2"
                                        align="center"
                                        color="text.primary"
                                        gutterBottom
                                    >
                                        Project Sponsor
                                    </Typography>
                                    <div style={{display: 'flex'}}>
                                    <div>
                                    <Typography
                                        variant="h3"
                                        align="center"
                                        color="text.secondary"
                                    >
                                        {projectInfo[0].client_fname}{" "}
                                        {projectInfo[0].client_lname}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        color="text.secondary"
                                    >
                                        {projectInfo[0].client_organization}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        color="text.secondary"
                                    >
                                        {projectInfo[0].client_location}
                                    </Typography>
                                    </div>
                                    <div style={{paddingLeft: '20px'}}>
                                    {projectInfo[0].client_logo != null ? (
                                        <img
                                            src={
                                                projectInfo[0].client_logo
                                                    ? "/uploads/images/clientLogos/" +
                                                    projectInfo[0].client_logo
                                                    : null
                                            }
                                            alt=""
                                            width="150px"
                                            height="150px"
                                        />
                                    ) : null}
                                    </div>
                                    </div>
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
                                        {projectInfo[0].mentor_name}
                                    </Typography>
                                </div>
                            </div>
                            {/* Footer */}
                            <Box
                                sx={{ bgcolor: "background.paper", p: 6 }}
                                component="footer"
                            >
                                <Copyright />
                            </Box>
                            {/* End footer */}
                        </div>
                    </Box>
                </Box>
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
