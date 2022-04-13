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

import TeamWebsiteRouter from "./TeamWebsiteRouter";

const theme = createTheme();



const TeamPage = () => {
    const windowValue = window.location.hash.replace("#/team-website/", "");
    const regExp = /%20/g;
    const team = windowValue.replace(regExp, " ");
    
    const [teamInfo, setTeamInfo] = useState([]);
    const [projectInfo, setProjectInfo] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const [route, setRoute] = useState("Overview");

    const [value, setValue] = useState("Overview");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRoute(newValue);
    };

    const [colorValue, setColorValue] = useState("#00000");
    const [fontColor, setFontColor] = useState("#FFFFFF");

    const drawerWidth = 300;

    // LOADING VARIABLES
    const [loading, setLoading] = useState(true);

    const setLoadingFalse = () => {
        setLoading(false);
    };

    // END LOADING VARIABLES

    const getInformation = async () => {
        try {
            const teamInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const teamData = await teamInfo.json();

            setTeamInfo(teamData);
            setColorValue(teamData[0].page_color);
            setFontColor(teamData[0].font_color);
            const teamId = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const teamIddata = await teamId.json();

            const teamMemberInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-members/${teamIddata[0].team_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const teamMemberData = await teamMemberInfo.json();

            setTeamMembers(teamMemberData);

            const projectInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/project-info/${teamIddata[0].team_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const projectData = await projectInfo.json();

            setProjectInfo(projectData);
            setLoadingFalse();
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getInformation();
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
            <div style={{height: '100vh',  backgroundColor: 'yellow', width: '100%'}}>
                
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
                            <Tab value="Overview" label="Overview" />
                            <Tab value="Solution" label="Solution" />
                            <Tab value="The Team" label="The Team" />
                            <Tab value="Deliverables" label="Deliverables" />
                            <Tab value="Schedule" label="Schedule" />
                        </Tabs>
                    </Drawer>
                    <TeamWebsiteRouter route={route} colorValue={colorValue} teamInfo={teamInfo} fontColor={fontColor} teamMembers={teamMembers} projectInfo={projectInfo}/>
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
