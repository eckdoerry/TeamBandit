import React, { useState } from "react";

import { Link } from "react-router-dom";
// Material UI Imports
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Visuals
import Logo from "../../Images/teamBanditLogo.png";
import styles from "./LandingPage.module.css";

// Page Components
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";

import SearchBar from "./Components/SearchBar";

/**
 * Displays the current landing page and the sign in or
 * sign up page depending on the users location
 *
 * @param setAuth Passed along to give the user authentication
 * @param setUser Passed along to determine which type of user
 * is signed in
 */
const LandingPage = ({ setAuth, setUser }) => {
    const [location, setLocation] = useState("sign-in");

    const changeLocation = (newLocation) => {
        setLocation(newLocation);
    };

    return (
        <div className={styles.App}>
            <div className={styles.appAside} style={{ width: "70%" }}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    <img className={styles.imageNew} src={Logo} alt="Logo" />
                    <SearchBar />
                </div>
            </div>
            <div className={styles.appFormNew} style={{ width: "30%" }}>
                <Typography
                    variant="h2"
                    align="center"
                    style={{ fontWeight: "bold", color: "white" }}
                >
                    {" "}
                    TeamBandit
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    style={{ fontWeight: "bold", color: "white" }}
                >
                    {" "}
                    TeamBandit has been created to help reduce the demand of
                    managing team based courses. This application offers the
                    ability for organizers to easily manage information
                    regarding their courses and for students to submit digitized
                    information.{" "}
                </Typography>
                <Link
                    style={{ textDecoration: "none" }}
                    to={`/student-sign-in`}
                >
                    <Button
                        variant="contained"
                        fullWidth
                        style={{
                            backgroundColor: "white",
                            color: "#002454",
                            margin: "10px",
                        }}
                    >
                        STUDENT SIGN IN
                    </Button>
                </Link>
                <Link
                    style={{ textDecoration: "none" }}
                    to={`/organizer-sign-in`}
                >
                <Button
                    variant="contained"
                    fullWidth
                    style={{
                        backgroundColor: "white",
                        color: "#002454",
                        margin: "10px",
                    }}
                >
                    ORGANIZER SIGN IN
                </Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
