import { React } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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

const Team = ({ teamMembers, projectInfo }) => {
    return (
        <div style={{ 
            height: "100vh", 
            backgroundColor: "white", 
            display: "flex",
            flexFlow: "column", 
            }}
        >
            <div style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: '300px' }}>
                <Typography
                    component="h1"
                    variant="h1"
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
                                    teamMember.profilepic_filepath != null
                                        ? process.env.PUBLIC_URL + "/uploads/images/profilePictures/" +
                                            teamMember.profilepic_filepath
                                        : process.env.PUBLIC_URL + "/uploads/images/profilePictures/default.jpg"
                                }
                                alt=""
                                width="350px"
                                height="350px"
                            />
                            <CardContent>
                                <Typography
                                    variant="h4"
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
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center',
                    paddingLeft: "300px",
                    height: '100%',
                    width: '100%',
                }}
            >
                <div>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Project Sponsor
                    </Typography>
                    <div style={{ display: "flex" }}>
                        <div>
                            <Typography
                                variant="h4"
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
                        <div style={{ paddingLeft: "20px" }}>
                            {projectInfo[0].client_logo != null ? (
                                <img
                                    src={
                                        projectInfo[0].client_logo
                                            ? process.env.PUBLIC_URL + "/uploads/images/clientLogos/" +
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
                <div style={{padding: '50px'}}>
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
        </div>
    );
};

export default Team;
