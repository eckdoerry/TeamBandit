import React, { Fragment, useState } from "react";

// Material UI Imports
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// Visuals
import Logo from "../../Images/teamBanditLogo.png";
import styles from "./LandingPage.module.css";

// Page Components
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";

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
        <Fragment>
            <div className={styles.App}>
                <div className={styles.appAside}>
                    <div>
                        <img className={styles.image} src={Logo} alt="Logo" />
                    </div>
                </div>
                <div className={styles.appForm}>
                    <div className={styles.pageSwitcher}>
                        <button
                            onClick={() => {
                                changeLocation("sign-in");
                            }}
                            className={`${
                                location === "sign-in"
                                    ? styles.pageSwitcherItem_active
                                    : styles.pageSwitcherItem
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => {
                                changeLocation("sign-up");
                            }}
                            className={`${
                                location !== "sign-in"
                                    ? styles.pageSwitcherItem_active
                                    : styles.pageSwitcherItem
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className={styles.formTitle}>
                        <a
                            onClick={() => {
                                changeLocation("sign-in");
                            }}
                            className={`${
                                location === "sign-in"
                                    ? styles.formTitleLink_active
                                    : styles.formTitleLink
                            }`}
                        >
                            Sign In{" "}
                        </a>
                        or{" "}
                        <a
                            onClick={() => {
                                changeLocation("sign-up");
                            }}
                            className={`${
                                location !== "sign-in"
                                    ? styles.formTitleLink_active
                                    : styles.formTitleLink
                            }`}
                        >
                            Sign Up
                        </a>
                    </div>
                    <DisplayCorrectForm
                        location={location}
                        setAuth={setAuth}
                        setUser={setUser}
                    />
                </div>
            </div>
        </Fragment>
    );
};

/**
 * Utilizing an enum system, checks what the location is and displays
 * the correct location
 *
 * @param location String enum declaring what should get displayed
 * @param setAuth Passed along to give the user authentication
 * @param setUser Passed along to determine which type of user
 * is signed in
 */
function DisplayCorrectForm({ location, setAuth, setUser }) {
    if (location === "sign-in") {
        return <SignInForm setAuth={setAuth} setUser={setUser} />;
    } else if (location === "sign-up") {
        return <SignUpForm setAuth={setAuth} setUser={setUser} />;
    } else {
        return (
            <div>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    The page is not displayed correctly —{" "}
                    <strong>please refresh!</strong>
                </Alert>
            </div>
        );
    }
}

export default LandingPage;
