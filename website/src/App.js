import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
} from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";

import styles from "./App.module.css";

const App = () => {
    const [URL, setURL] = useState(window.location.pathname)

    return (
        <Router>
            <div className={styles.App}>
                <div className={styles.appAside} />
                <div className={styles.appForm}>
                    <div className={styles.pageSwitcher}>
                        <NavLink
                            to="/sign-in"
                            className={`${URL === "/sign-in" ? styles.pageSwitcherItem_active : styles.pageSwitcherItem}`}
                        >
                            Sign In
                        </NavLink>
                        <NavLink
                            exact
                            to="/"
                            className={`${URL !== "/sign-in" ? styles.pageSwitcherItem_active : styles.pageSwitcherItem}`}
                        >
                            Sign Up
                        </NavLink>
                    </div>

                    <div className={styles.formTitle}>
                        <NavLink to="/sign-in" className={styles.formTitleLink}>
                            Sign In
                        </NavLink>{" "}
                        or{" "}
                        <NavLink exact to="/" className={styles.formTitleLink}>
                            Sign Up
                        </NavLink>
                    </div>
                    <Routes>
                        <Route path="/sign-in" element={<SignInForm changeButton = {setURL}/>}>
                            Sign In
                        </Route>
                        <Route path="/" element={<SignUpForm changeButton = {setURL}/>}>
                            Sign Up
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
