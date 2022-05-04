import { React, useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import TeamBanditLogo from "../../Images/logo.png";

const theme = createTheme();

const ProfilePage = () => {
    const windowValue = window.location.hash.replace("#/student-profile/", "");
    const regExp = /%20/g;
    const windowString = windowValue.replace(regExp, " ");

    const [studentInfo, setstudentInfo] = useState([]);

    const getStudent = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/students/students/${windowString}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setstudentInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getStudent();
        document.title = "Student Profile"
    }, []);

    if (studentInfo !== null) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    width: "100%",
                }}
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar
                        style={{ backgroundColor: `#002454` }}
                        position="relative"
                    >
                        <Toolbar style={{ backgroundColor: `#002454` }}>
                            <Typography variant="h6" color="inherit" noWrap>
                                TeamBandit
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <div style={{display: 'flex', width: '100%', height: '100%'}}>
                    <div style={{display: 'flex', height: '100%', width: '100%', justifyContent: 'center', flexDirection:'column', alignItems: 'center'}}>
                        <img
                            src={
                                studentInfo.profilepic_filepath != null
                                    ? process.env.PUBLIC_URL + "/uploads/images/profilePictures/" +
                                      studentInfo.profilepic_filepath
                                    : process.env.PUBLIC_URL + "/uploads/images/profilePictures/default.jpg"
                            }
                            alt=""
                            width="500px"
                            height="500px"
                        />

                        <Typography
                            variant="h2"
                            align="center"
                            color="text.secondary"
                        >
                            {studentInfo.student_fname}{" "}
                            {studentInfo.student_lname}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            align="center"
                            variant="h5"
                            gutterBottom
                        >
                            {studentInfo.student_bio}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="h5"
                            align="center"
                            gutterBottom
                        >
                            {studentInfo.student_email}
                        </Typography>
                    </div>
                    <div style={{height: '100%', width: '100%'}}>
                        <embed
                            src={
                                studentInfo.student_resume != null
                                    ? process.env.PUBLIC_URL + "/uploads/images/studentResumes/" +
                                      studentInfo.student_resume
                                    : null
                            }
                            alt=""
                            type="application/pdf"
    frameBorder="0"
    scrolling="auto"
    height="100%"
    width="100%"
                            style={{ objectFit: 'cover'}}
                        />
                    </div>
                </div>
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
                    <AppBar
                        style={{ backgroundColor: `#002454` }}
                        position="relative"
                    >
                        <Toolbar style={{ backgroundColor: `#002454` }}>
                            <Typography variant="h6" color="inherit" noWrap>
                                TeamBandit
                            </Typography>
                        </Toolbar>
                    </AppBar>
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
                    This Student Does Not Exist{" "}
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

export default ProfilePage;
