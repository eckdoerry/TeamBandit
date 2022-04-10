import React, {Fragment, useState, useEffect} from "react";
import styles from "./App.module.css";
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// Page Components
import Landing from "./Pages/LandingPage/LandingPage";
import Info from "./Pages/InfoPage/Info";
import PrivacyPolicy from "./Pages/PrivacyPolicyPage/PrivacyPolicy";
import TeamBandit from "./Pages/TeamBandit/TeamBandit";
import TeamWebsite from "./Pages/TeamWebsite/TeamWebsite";
import TeamPage from "./Pages/TeamPage/TeamPage";
import ProjectPages from "./Pages/ProjectPages/ProjectPages";
import AssignmentPage from "./Pages/AssignmentPage/AssignmentPage";
import SubmissionPage from "./Pages/SubmissionPage/SubmissionPage";

// Toastify gets configured on the first page, this is the notification thing
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
toast.configure();

/**
 * Acts as the Router Page for TeamBandit, will effectively direct
 * the user to the correct location based on authentication.
 * 
 * @returns Displays the entire application TeamBandit Application
 */
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState( false );
    const [ userIdentifier, setUserIdentifier] = useState("NULL");

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    const setUser = (string) => {
        localStorage.setItem("user", string);
        setUserIdentifier(localStorage.getItem("user"));
    };

    const checkAuthenticated = async () => {
        try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/auth/verify`, {
            method: "GET",
            headers: { token: localStorage.token }
        });
        
        const parseRes = await response.json();

        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        
        } catch (error) {
            // Error 401 when first arriving on the page is good
            console.error(error.message);
        }
    };

    useEffect(()=>{
        checkAuthenticated();
        setUserIdentifier(localStorage.getItem("user"));
    }, []);

    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route exact path = "/" element={!isAuthenticated ? <Landing setAuth={setAuth} setUser={setUser}/> : <Navigate to="/team-bandit"/>}/>
                    <Route exact path = "/info" element={<Info/>}/>
                    <Route exact path = "/privacy-policy" element={<PrivacyPolicy/>}/>
                    <Route exact path = "/team-bandit" element={isAuthenticated ? <TeamBandit userIdentifier={userIdentifier} setAuth={setAuth}/> : <Navigate to="/"/>}/>
                    <Route exact path = "/team-website/:teamName" element={<TeamWebsite/>}/>
                    <Route exact path = "/team-page/:courseName" element={<TeamPage/>}/>
                    <Route exact path = "/project-pages/:projectName" element={<ProjectPages/>}/>
                    <Route exact path = "/assignment/:assignmentName" element={<AssignmentPage/>}/>
                    <Route exact path = "/submission/:submissionName" element={<SubmissionPage/>}/>
                </Routes>
            </Router>
        </Fragment>
    );
}

export default App;
