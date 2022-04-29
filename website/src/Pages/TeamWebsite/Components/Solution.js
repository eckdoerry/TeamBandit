import { Fragment, React } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Solution = () => {
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem
                    Ipsum.printer took a galley of type and scrambled it to make
                    a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem
                    Ipsum.printer took a galley of type and scrambled it to make
                    a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged.
                </Typography>
                <Paper
                    elevation={4}
                    style={{ marginTop: "10px", height: "35%" }}
                >
                    <p>* INSERT ARCHITECTURE HERE* </p>
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
                    variant="h6"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    Requirements
                </Typography>
                <Typography variant="body1" align="left" color="text.secondary">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
                <ul>
                    <li>
                        {" "}
                        <Typography variant="body1">Requirement # 1</Typography>
                    </li>
                    <li>
                        {" "}
                        <Typography variant="body1">Requirement # 1</Typography>
                    </li>
                    <li>
                        {" "}
                        <Typography variant="body1">Requirement # 1</Typography>
                    </li>
                    <li>
                        {" "}
                        <Typography variant="body1">Requirement # 1</Typography>
                    </li>
                    <li>
                        {" "}
                        <Typography variant="body1">Requirement # 1</Typography>
                    </li>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
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
                            <p>*INSERT IMAGE*</p>
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Technologies
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s
                        </Typography>
                    </div>
                    <div style={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={4}
                            style={{ margin: "2.5px", height: "50%" }}
                        >
                            <p>*INSERT IMAGE*</p>
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Technologies
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s
                        </Typography>
                    </div>
                    <div style={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={4}
                            style={{ margin: "2.5px", height: "50%" }}
                        >
                            <p>*INSERT IMAGE*</p>
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Technologies
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s
                        </Typography>
                    </div>
                    <div style={{ width: "100%", height: "100%" }}>
                        <Paper
                            elevation={4}
                            style={{ margin: "2.5px", height: "50%" }}
                        >
                            <p>*INSERT IMAGE*</p>
                        </Paper>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Technologies
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Solution;
