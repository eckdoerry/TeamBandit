import { Fragment, React } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Paper from '@mui/material/Paper';
import Card from "@mui/material/Card";

const Overview = ({ colorValue, teamInfo, fontColor }) => {
    return (
        <div
            style={{
                display: "flex",
                flexFlow: "column",
                backgroundColor: "white",
                width: "100%",
                height: "100vh",
            }}
        >
            <div
                style={{
                    backgroundColor: `${colorValue}`,
                    backgroundImage: `url(/uploads/images/teamBackdrop/${teamInfo[0].team_backdrop})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    boxShadow: '0 4px 2px -2px gray',
                }}
            >
                <Container
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
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
                        width="250px"
                        height="250px"
                    />
                    <div style={{ paddingLeft: "20px" }}>
                        <Typography
                            style={{
                                color: `${fontColor}`,
                            }}
                            variant="h1"
                            color="white"
                            gutterBottom
                        >
                            {teamInfo[0].team_name}
                        </Typography>
                    </div>
                </Container>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
                <Typography
                    variant="h6"
                    paragraph
                    style={{
                        padding: "30px",
                        paddingLeft: "330px",
                    }}
                >
                    {teamInfo[0].team_description}
                </Typography>
            </div>
            <div style={{width:'25%'}}>
                <Typography
                    variant="h6"
                    paragraph
                    style={{
                        paddingLeft: "330px",
                        borderBottom: '1px solid black',
                    }}
                    gutterBottom
                >
                    Highlights
                </Typography>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    paddingLeft: "300px",
                    width: "100%",
                }}
            >
                <Paper elevation={4} style={{ margin: "10px", width: '50%', height: '75%' }}>
                    
                    </Paper>
                <Paper elevation={4} style={{ margin: "10px", width: '50%', height: '75%' }}>
                    
                </Paper>
                <Paper elevation={4} style={{ margin: "10px", width: '50%', height: '75%' }}>
                    
                </Paper>
                <Paper elevation={4} style={{ margin: "10px", width: '50%', height: '75%' }}>
                    
                </Paper>
            </div>
        </div>
    );
};

export default Overview;
