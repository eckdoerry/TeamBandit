import React, { useEffect, useState } from "react";

// MUI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PeopleIcon from "@mui/icons-material/People";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SchoolIcon from "@mui/icons-material/School";

// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    color: "#005249",
    backgroundColor: "#C8FACD",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: "#007B55",
    backgroundImage: `linear-gradient(135deg, ${alpha(
        "#007B55",
        0
    )} 0%, ${alpha("#007B55", 0.24)} 100%)`,
}));

const RootStyle1 = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    color: "#04297A",
    backgroundColor: "#D0F2FF",
}));

const IconWrapperStyle1 = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.info.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
        theme.palette.info.dark,
        0
    )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 135;

export default function Homepage({ courseInfo }) {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProjects();
        setRowChange(false);
    }, [rowChange]);

    return (
        <div style={{ padding: "25px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "25px",
                }}
            >
                <div>
                    <Typography variant="h5">Course Statistics</Typography>
                    <div style={{ height: "3%" }}></div>
                    <RootStyle style={{ width: "250px" }}>
                        <IconWrapperStyle>
                            <ContentPasteIcon />
                        </IconWrapperStyle>
                        <Typography variant="h3">{TOTAL}</Typography>
                        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                            Total Projects
                        </Typography>
                    </RootStyle>
                    <div style={{ height: "10%" }}></div>
                    <RootStyle1 style={{ width: "250px" }}>
                        <IconWrapperStyle1>
                            <PeopleIcon />
                        </IconWrapperStyle1>
                        <Typography variant="h3">{TOTAL}</Typography>
                        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                            Total Students
                        </Typography>
                    </RootStyle1>
                </div>
                <div style={{ width: "3%" }}></div>
                <div>
                    <Typography variant="h5">Course Projects</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#FAC01A" }}>
                                <TableRow>
                                    <TableCell>Project Name</TableCell>
                                    <TableCell align="right">
                                        Project Short Name
                                    </TableCell>
                                    <TableCell align="right">
                                        Student Team
                                    </TableCell>
                                    <TableCell align="right">
                                        Team Mentor
                                    </TableCell>
                                    <TableCell align="right">
                                        Project Sponsor
                                    </TableCell>
                                    <TableCell align="right">
                                        Status Tracker
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Team Bandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-CS476c
                                    </TableCell>
                                    <TableCell align="right">
                                        Team Outlaws
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">READY</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Team Bandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-CS476c
                                    </TableCell>
                                    <TableCell align="right">
                                        Team Outlaws
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">READY</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Team Bandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-CS476c
                                    </TableCell>
                                    <TableCell align="right">
                                        Team Outlaws
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">READY</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Team Bandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-CS476c
                                    </TableCell>
                                    <TableCell align="right">
                                        Team Outlaws
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">
                                        Eck Doerry
                                    </TableCell>
                                    <TableCell align="right">READY</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ width: "3%" }}></div>
                <div>
                    <Typography variant="h5">Course Assignments</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#FAC01A" }}>
                                <TableRow>
                                    <TableCell>Assignment</TableCell>
                                    <TableCell align="right">
                                        % Turned In
                                    </TableCell>
                                    <TableCell align="right">
                                        Due Date
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Peer Eval 1
                                    </TableCell>
                                    <TableCell align="right">76%</TableCell>
                                    <TableCell align="right">
                                        2/22/2022 11:59pm
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Peer Eval 1
                                    </TableCell>
                                    <TableCell align="right">76%</TableCell>
                                    <TableCell align="right">
                                        2/22/2022 11:59pm
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Peer Eval 1
                                    </TableCell>
                                    <TableCell align="right">76%</TableCell>
                                    <TableCell align="right">
                                        2/22/2022 11:59pm
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Peer Eval 1
                                    </TableCell>
                                    <TableCell align="right">76%</TableCell>
                                    <TableCell align="right">
                                        2/22/2022 11:59pm
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Peer Eval 1
                                    </TableCell>
                                    <TableCell align="right">76%</TableCell>
                                    <TableCell align="right">
                                        2/22/2022 11:59pm
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}
