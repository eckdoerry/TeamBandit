import { React } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Solution = ({teamInfo}) => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                paddingLeft: "300px",
                backgroundColor: "white",
                display: "flex",
                flexFlow: "row",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    margin: "10px",
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    TeamBandit: Teams Management Portal
                </Typography>
                <Typography
                    component="h1"
                    variant="h6"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    Problem
                </Typography>
                <Typography variant="body1" align="left" color="text.secondary">
                    {teamInfo[0].problem_description}
                </Typography>
                <Typography
                    component="h1"
                    variant="h6"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    Solution
                </Typography>
                <Typography variant="body1" align="left" color="text.secondary">
                {teamInfo[0].solution_description}
                </Typography>
                <Paper
                    elevation={4}
                    style={{ marginTop: "10px", height: "35%" }}
                >
                {teamInfo[0].architecture_image != null ? (
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/uploads/images/architecture/" +
                                    teamInfo[0].architecture_image
                                }
                                alt=""
                                style={{padding: '10px', height:'100%', width: '100%', objectFit: 'cover'}}
                            />
                        ) : null}
                </Paper>
            </div>
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "10px",
                }}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    Requirements
                </Typography>
                <Typography variant="body1" align="left" color="text.secondary">
                {teamInfo[0].requirements_overview}
                </Typography>
                <Typography
                    
                    variant="h6"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    Key Requirements
                </Typography>
                <ul>
                    {teamInfo[0].key_requirements !== null && 
                        teamInfo[0].key_requirements.split(',').map((value) => 
                            <li key={value}>{value}</li>
                    )}
                </ul>
                <Typography
                    component="h1"
                    variant="h6"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    Technologies
                </Typography>
                <Typography variant="body1" align="left" color="text.secondary">
                    {teamInfo[0].technology_summary}
                </Typography>
                <div
                    style={{
                        display: "flex",
                        height: "40%",
                        flexDirection: "row",
                    }}
                >
                    <div style={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={4}
                            style={{ margin: "2.5px", height: "50%" }}
                        >
                        {teamInfo[0].tech_img_1 != null ? (
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/uploads/images/techLogos/" +
                                    teamInfo[0].tech_img_1
                                }
                                alt=""
                                style={{padding: '10px', height:'100%', width: '100%', objectFit: 'cover'}}
                            />
                        ) : null}
                            
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {teamInfo[0].tech_name_1}
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            {teamInfo[0].tech_description_1}
                        </Typography>
                    </div>
                    <div style={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={4}
                            style={{ margin: "2.5px", height: "50%" }}
                        >
                        {teamInfo[0].tech_img_2 != null ? (
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/uploads/images/techLogos/" +
                                    teamInfo[0].tech_img_2
                                }
                                alt=""
                                style={{padding: '10px', height:'100%', width: '100%', objectFit: 'cover'}}
                            />
                        ) : null}
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {teamInfo[0].tech_name_2}
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            {teamInfo[0].tech_description_2}
                        </Typography>
                    </div>
                    <div style={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={4}
                            style={{ margin: "2.5px", height: "50%" }}
                        >
                        {teamInfo[0].tech_img_3 != null ? (
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/uploads/images/techLogos/" +
                                    teamInfo[0].tech_img_3
                                }
                                alt=""
                                style={{padding: '10px', height:'100%', width: '100%', objectFit: 'cover'}}
                            />
                        ) : null}
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {teamInfo[0].tech_name_3}
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            {teamInfo[0].tech_description_3}
                        </Typography>
                    </div>
                    <div style={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={4}
                            style={{ margin: "2.5px", height: "50%" }}
                        >
                        {teamInfo[0].tech_img_4 != null ? (
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/uploads/images/techLogos/" +
                                    teamInfo[0].tech_img_4
                                }
                                alt=""
                                style={{padding: '10px', height:'100%', width: '100%', objectFit: 'cover'}}
                            />
                        ) : null}
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {teamInfo[0].tech_name_4}
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            {teamInfo[0].tech_description_4}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Solution;
