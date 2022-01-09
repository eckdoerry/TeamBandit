import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";

import styles from "./App.module.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className={styles.App}>
                    <div className={styles.appAside} />
                    <div className={styles.appForm}>
                        <div className={styles.pageSwitcher}>
                            <NavLink
                                to="/sign-in"
                                activeClassName={styles.pageSwitcherItem_active}
                                className={styles.pageSwitcherItem}
                            >
                                Sign In
                            </NavLink>
                            <NavLink
                                exact
                                to="/"
                                activeClassName={styles.pageSwitcherItem_active}
                                className={styles.pageSwitcherItem}
                            >
                                Sign Up
                            </NavLink>
                        </div>

                        <div className={styles.formTitle}>
                            <NavLink
                                to="/sign-in"
                                activeClassName={styles.formTitleLink_active}
                                className={styles.formTitleLink}
                            >
                                Sign In
                            </NavLink>{" "}
                            or{" "}
                            <NavLink
                                exact
                                to="/"
                                activeClassName={styles.formTitleLink_active}
                                className={styles.formTitleLink}
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
