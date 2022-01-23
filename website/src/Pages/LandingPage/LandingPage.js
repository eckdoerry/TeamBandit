import React, {Fragment, useState} from "react";

import Logo from "../../Images/teamBanditLogo.png";

import styles from "./LandingPage.module.css";

import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";

const App = (props) => {

    const [location, setLocation] = useState("sign-in");

    const changeLocation = (newLocation) => {
        setLocation(newLocation);
    };

    return (
        <Fragment>
            <div className={styles.App}>
                <div className={styles.appAside}>
                    <div><img className = {styles.image} src={Logo} alt="Logo"/></div>
                </div>
                <div className={styles.appForm}>
                    <div className={styles.pageSwitcher}>
                        <button 
                            onClick={() => {
                                changeLocation('sign-in');
                            }}
                            className={`${location === "sign-in" ? styles.pageSwitcherItem_active : styles.pageSwitcherItem}`}>
                            Sign In
                        </button>
                        <button
                            onClick={() => {
                                changeLocation('sign-up');
                            }}
                            className={`${location !== "sign-in" ? styles.pageSwitcherItem_active : styles.pageSwitcherItem}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className={styles.formTitle}>
                        <a
                        onClick={() => {
                                changeLocation('sign-in');
                            }}
                        className={`${location === "sign-in" ? styles.formTitleLink_active : styles.formTitleLink}`}>
                            Sign In
                        {" "}
                        </a>
                        or{" "}
                        <a 
                        onClick={() => {
                                changeLocation('sign-up');
                            }}
                        className={`${location !== "sign-in" ? styles.formTitleLink_active : styles.formTitleLink}`}>
                            Sign Up
                        </a>
                    </div>
                    <DisplayCorrectForm location = {location} setAuth={props.setAuth}/>
                </div>
            </div>
        </Fragment>
    );
};

function DisplayCorrectForm(props)
{
    if(props.location === "sign-in")
    {
        return(
            <SignInForm setAuth={props.setAuth}/>
        );
    }
    else if(props.location === "sign-up")
    {
        return(
            <SignUpForm setAuth={props.setAuth}/>
        );
    }
    else
    {
        return(<p>"ERROR"</p>);
    }
}

export default App;
