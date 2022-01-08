import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";

import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="appAside" />
                    <div className="appForm">
                        <div className="pageSwitcher">
                            <NavLink
                                to="/sign-in"
                                activeClassName="pageSwitcherItem-active"
                                className="pageSwitcherItem"
                            >
                                Sign In
                            </NavLink>
                            <NavLink
                                exact
                                to="/"
                                activeClassName="pageSwitcherItem-active"
                                className="pageSwitcherItem"
                            >
                                Sign Up
                            </NavLink>
                        </div>

                        <div className="formTitle">
                            <NavLink
                                to="/sign-in"
                                activeClassName="formTitleLink-active"
                                className="formTitleLink"
                            >
                                Sign In
                            </NavLink>{" "}
                            or{" "}
                            <NavLink
                                exact
                                to="/"
                                activeClassName="formTitleLink-active"
                                className="formTitleLink"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                        <Routes>
                            <Route path="/sign-in" element={<SignInForm />}>
                                Sign In
                            </Route>
                            <Route path="/" element={<SignUpForm />}>
                                Sign Up
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
