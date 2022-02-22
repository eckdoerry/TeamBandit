import React, { useEffect, useState } from "react";
import "./Dashboard.css";

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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";

// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

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

const RootStyle2 = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    color: "#7A4F01",
    backgroundColor: "#FFF7CD",
}));

const IconWrapperStyle2 = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: "#B78103",
    backgroundImage: `linear-gradient(135deg, ${alpha(
        "#B78103",
        0
    )} 0%, ${alpha("#B78103", 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const RootStyle3 = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    color: "#091A7A",
    backgroundColor: "#D6E4FF",
}));

const IconWrapperStyle3 = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: "#1939B7",
    backgroundImage: `linear-gradient(135deg, ${alpha(
        "#1939B7",
        0
    )} 0%, ${alpha("#1939B7", 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const RootStyle4 = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    color: "#7A0C2E",
    backgroundColor: "#FFE7D9",
}));

const IconWrapperStyle4 = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: "#B72136",
    backgroundImage: `linear-gradient(135deg, ${alpha(
        "#B72136",
        0
    )} 0%, ${alpha("#B72136", 0.24)} 100%)`,
}));

const TOTAL = 111;

// TODO: Create the components for each individual element of the dashboard
// currently all those breaklines are being used for visualization

// Controls display of the dashboard shell/card for
// nested components to be displayed within
const Dashboard = ({ organizerInfo }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/homepage/${organizerInfo.organizer_id}`,
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
            <Typography variant="h5"> App Statistics </Typography>
            <div
                style={{
                    display: "flex",
                    paddingBottom: "25px",
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <RootStyle2 style={{ width: "250px", height:'250px', }}>
                    <IconWrapperStyle2>
                        <SchoolIcon />
                    </IconWrapperStyle2>
                    <Typography variant="h3">{TOTAL}</Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        Total Courses
                    </Typography>
                </RootStyle2>
                <div style={{ width: "5%" }}></div>
                <RootStyle3 style={{ width: "250px", height:'250px', }}>
                    <IconWrapperStyle3>
                        <AccountBoxIcon />
                    </IconWrapperStyle3>
                    <Typography variant="h3">{TOTAL}</Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        Total Clients
                    </Typography>
                </RootStyle3>
                <div style={{ width: "5%" }}></div>
                <RootStyle style={{ width: "250px", height:'250px', }}>
                    <IconWrapperStyle>
                        <ContentPasteIcon />
                    </IconWrapperStyle>
                    <Typography variant="h3">{TOTAL}</Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        Total Projects
                    </Typography>
                </RootStyle>
                <div style={{ width: "5%" }}></div>
                <RootStyle1 style={{ width: "250px", height:'250px', }}>
                    <IconWrapperStyle1>
                        <PeopleIcon />
                    </IconWrapperStyle1>
                    <Typography variant="h3">{TOTAL}</Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        Total Students
                    </Typography>
                </RootStyle1>
                <div style={{ width: "5%" }}></div>
                <RootStyle4 style={{ width: "250px", height:'250px', }}>
                    <IconWrapperStyle4>
                        <EmailIcon />
                    </IconWrapperStyle4>
                    <Typography variant="h3">{TOTAL}</Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        Unread Emails
                    </Typography>
                </RootStyle4>
                <div style={{ width: "5%" }}></div>
                <div>
                    <Typography variant="h5">Most Recent Emails</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead
                                style={{
                                    backgroundColor: "#002454",
                                    color: "white",
                                }}
                            >
                                <TableRow>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                    >
                                        Client Name
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Email Blurb
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Date
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="right">
                                        {" "}
                                        Max Mosier{" "}
                                    </TableCell>
                                    <TableCell align="right">
                                        {" "}
                                        I would like to sponsor a project...{" "}
                                    </TableCell>
                                    <TableCell align="right">
                                        {" "}
                                        2/21/22 07:40pm{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        {" "}
                                        Quinn Melssen{" "}
                                    </TableCell>
                                    <TableCell align="right">
                                        {" "}
                                        Don't listen to Max hes lame, I would...
                                    </TableCell>
                                    <TableCell align="right">
                                        {" "}
                                        2/21/22 07:40pm{" "}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        {" "}
                                        Tyler Durden{" "}
                                    </TableCell>
                                    <TableCell align="right">
                                        {" "}
                                        You are not your job, you're not how ...{" "}
                                    </TableCell>
                                    <TableCell align="right">
                                        {" "}
                                        2/21/22 07:40pm{" "}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ width: "5%" }}></div>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ width: "65%" }}>
                    <Typography variant="h5"> Project Overview </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead
                                style={{
                                    backgroundColor: "#002454",
                                    color: "white",
                                }}
                            >
                                <TableRow>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                    >
                                        Project Name
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Project Short Name
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Student Team
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Team Mentor
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Project Sponsor
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Status Tracker
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        TeamBandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-cs476
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
                                        TeamBandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-cs476
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
                                        TeamBandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-cs476
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
                                        TeamBandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-cs476
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
                                        TeamBandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-cs476
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
                                        TeamBandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-cs476
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
                                        TeamBandit
                                    </TableCell>
                                    <TableCell align="right">
                                        fall21-cs476
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
                <div style={{ width: "5%" }}></div>
                <div style={{ width: "35%" }}>
                    <Typography variant="h5"> Course Overview </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead
                                style={{
                                    backgroundColor: "#002454",
                                    color: "white",
                                }}
                            >
                                <TableRow>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                    >
                                        Course Name
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Course Organizer
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: "#002454",
                                            color: "white",
                                        }}
                                        align="right"
                                    >
                                        Course Semester
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        CS 476C
                                    </TableCell>
                                    <TableCell align="right">
                                        Max Mosier
                                    </TableCell>
                                    <TableCell align="right">
                                        Fall 2021
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        CS 476C
                                    </TableCell>
                                    <TableCell align="right">
                                        Max Mosier
                                    </TableCell>
                                    <TableCell align="right">
                                        Fall 2021
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        CS 476C
                                    </TableCell>
                                    <TableCell align="right">
                                        Max Mosier
                                    </TableCell>
                                    <TableCell align="right">
                                        Fall 2021
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        CS 476C
                                    </TableCell>
                                    <TableCell align="right">
                                        Max Mosier
                                    </TableCell>
                                    <TableCell align="right">
                                        Fall 2021
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        CS 476C
                                    </TableCell>
                                    <TableCell align="right">
                                        Max Mosier
                                    </TableCell>
                                    <TableCell align="right">
                                        Fall 2021
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        CS 476C
                                    </TableCell>
                                    <TableCell align="right">
                                        Max Mosier
                                    </TableCell>
                                    <TableCell align="right">
                                        Fall 2021
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        CS 476C
                                    </TableCell>
                                    <TableCell align="right">
                                        Max Mosier
                                    </TableCell>
                                    <TableCell align="right">
                                        Fall 2021
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
