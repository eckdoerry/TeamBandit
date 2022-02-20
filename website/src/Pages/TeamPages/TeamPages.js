import { React, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ColorPicker from 'material-ui-color-picker'

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

/**
 * Acts as an info page for TeamBandit,
 * may or not be used
 */
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
            setColorValue(jsonData[0].page_color)
        } catch (err) {
            console.error(err.message);
        }
    };


    const updateColor = async (color) => {
        
        try {
            const body = {color};

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(`${process.env.REACT_APP_BASEURL}/teams/updateColor/${teamInfo[0].team_id}`, {method: "PUT", headers: myHeaders, body: JSON.stringify(body)});
            
            setColorValue(color);
        } catch (err) {
            console.error(err.message)
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
            console.log(jsonData);
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
                <ColorPicker
                name='color'
                defaultValue='#def54'
                value={colorValue}
                onChange={color => updateColor(color)}
                
                />
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar style={{backgroundColor: `${colorValue}`}} position="relative">
                        <Toolbar style={{backgroundColor: `${colorValue}`}}>
                            <Paper variant="outlined">
                                <img src={require('./logo.png')} alt="" width = "50px" height = "50px" />
                            </Paper>
                            <Typography variant="h6" color="inherit" noWrap>
                                {teamInfo[0].team_name}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                    <div >
                            {/* Hero unit */}
                            <Box
                                
                                sx={{
                                    bgcolor: "background.paper",
                                    pt: 8,
                                    pb: 6,
                                }}
                            >
                            <Container style={{display: "flex", justifyContent: "center", width: "100%"}} maxWidth="sm">
                                <Paper style = {{margin: "50px"}} variant="outlined">
                                        <img src={require('./logo.png')}  alt="Logo" width = "500px" height = "500px" />
                                </Paper>
                                <div style= {{padding:"50px", width:"100%"}}>
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
                                    <div style={{padding:"50px"}}>
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
                                        <Typography variant="h5"
                                        align="center"
                                        color="text.secondary" key={teamMember.student_id}>
                                            {teamMember.student_fname} {teamMember.student_lname}
                                        </Typography>
                                    ))}
                                    </div>
                                    <div style={{padding:"50px"}}>
                                    <Typography
                                        component="h1"
                                        variant="h2"
                                        align="center"
                                        color="text.primary"
                                        gutterBottom
                                    >
                                        Project Sponsor
                                    </Typography>
                                    
                                        <Typography variant="h5"
                                        align="center"
                                        color="text.secondary">
                                            {projectInfo[0].project_sponsor}
                                        </Typography>
                                    
                                    </div>
                                    <div style={{padding:"50px"}}>
                                    <Typography
                                        component="h1"
                                        variant="h2"
                                        align="center"
                                        color="text.primary"
                                        gutterBottom
                                    >
                                        Team Mentor
                                    </Typography>
                                    <Typography variant="h5"
                                        align="center"
                                        color="text.secondary">
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
        return <h1> ERROR TEAM DOES NOT EXIST </h1>;
    }
};

export default TeamPage;
