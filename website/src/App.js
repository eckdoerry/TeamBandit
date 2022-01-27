import React, {Fragment, useState, useEffect} from "react";
import './App.module.css';

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// components
import Landing from "./Pages/LandingPage/LandingPage";
import Info from "./Pages/InfoPage/Info";
import PrivacyPolicy from "./Pages/PrivacyPolicyPage/PrivacyPolicy";
import TeamBandit from "./Pages/TeamBandit/TeamBandit";

// Toastify is on first app page to get configured
toast.configure();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState( false );

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    const checkAuthenticated = async () => {
        try {
        const response = await fetch("http://localhost:5000/auth/verify", {
            method: "GET",
            headers: { token: localStorage.token}
        });
        
        const parseRes = await response.json();

        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        
        } catch (error) {
            
            console.error(error.message);
        }
    };

    useEffect(()=>{
        checkAuthenticated();
    }, []);

    return (
        <Fragment>
            <Router>
                <div className="container">
                    <Routes>
                        <Route exact path = "/" element={!isAuthenticated ? <Landing setAuth={setAuth}/> : <Navigate to="/team-bandit"/>}/>
                        <Route exact path = "/info" element={<Info/>}/>
                        <Route exact path = "/privacy-policy" element={<PrivacyPolicy/>}/>
                        <Route exact path = "/team-bandit" element={isAuthenticated ? <TeamBandit setAuth={setAuth}/> : <Navigate to="/"/>}/>
                    </Routes>
                </div>
            </Router>
        </Fragment>
    );
}

export default App;
