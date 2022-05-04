import { Fragment, React } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Schedule = ({teamInfo}) => {
    return (
        <div
            style={{
                height: "100vh",
                paddingLeft: "300px",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Paper elevation={4} style={{ height: "75%", width: "90%" }}>
            {teamInfo[0].schedule_image != null ? (
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/uploads/images/schedules/" +
                                    teamInfo[0].schedule_image
                                }
                                alt=""
                                style={{padding: '10px', height:'100%', width: '100%', objectFit: 'cover'}}
                            />
                        )  : <img
                                src={
                                    process.env.PUBLIC_URL + "/uploads/images/missing/missing.jpg"
                                    
                                }
                                alt=""
                                style={{padding: '10px', height:'100%', width: '100%', objectFit: 'cover'}}
                            />}
                
            </Paper>
            <div
                style={{
                    height: "20%",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                <Typography variant="h3" align="center">
                    Our Development Strategy
                </Typography>
                <Typography variant="body1" align="center">
                {teamInfo[0].development_strategy}
                </Typography>
            </div>
        </div>
    );
};

export default Schedule;
