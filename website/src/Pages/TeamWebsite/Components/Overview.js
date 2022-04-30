import { Fragment, React } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Paper from '@mui/material/Paper';
import Card from "@mui/material/Card";
import { TabPanelUnstyled } from "@mui/material";

const Overview = ({ colorValue, teamInfo, fontColor }) => {
    console.log(teamInfo)
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
                            variant="h2"
                            color="white"
                            gutterBottom
                        >
                            {teamInfo[0].project_name}
                        </Typography>
                        <Typography
                            style={{
                                color: `${fontColor}`,
                            }}
                            variant="h2"
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
                    variant="body1"
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
                    <div style={{ height: '100%', width: '100%', margin: '5px'}}>
                        <Typography variant="h6">Deliverable 1</Typography>
                        <img src="https://source.unsplash.com/random/301x150" alt="Example1" style={{height:'67%', width:'97.5%', objectFit: 'cover'}}/>
                        <Button>Learn More</Button>
                    </div>
                </Paper>
                <Paper elevation={4} style={{ margin: "10px", width: '50%', height: '75%' }}>
                <div style={{ height: '100%', width: '100%', margin: '5px'}}>
                        <Typography variant="h6">Deliverable 2</Typography>
                        <img src="https://source.unsplash.com/random/302x150" alt="Example2" style={{height:'67%', width:'97.5%', objectFit: 'cover'}}/>
                        <Button>Learn More</Button>
                    </div>
                </Paper>
                <Paper elevation={4} style={{ margin: "10px", width: '50%', height: '75%' }}>
                <div style={{ height: '100%', width: '100%', margin: '5px'}}>
                        <Typography variant="h6">Deliverable 3</Typography>
                        <img src="https://source.unsplash.com/random/303x150" alt="Example3" style={{height:'67%', width:'97.5%', objectFit: 'cover'}}/>
                        <Button>Learn More</Button>
                    </div>
                </Paper>
                <Paper elevation={4} style={{ margin: "10px", width: '50%', height: '75%' }}>
                <div style={{ height: '100%', width: '100%', margin: '5px'}}>
                        <Typography variant="h6">Deliverable 4</Typography>
                        <img src="https://source.unsplash.com/random/304x150" alt="Example4" style={{height:'67%', width:'97.5%', objectFit: 'cover'}}/>
                        <Button>Learn More</Button>
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default Overview;
