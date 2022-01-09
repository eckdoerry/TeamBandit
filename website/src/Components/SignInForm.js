import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SignInForm.module.css";

const SignInForm = (props) => {
    props.changeButton(window.location.pathname)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = () => {
        console.log("Submitted");
    }
    return (
        <div className={styles.formCenter}>
            <form className={styles.formFields} onSubmit={submitHandler}>
                <div className={styles.formField}>
                    <label className={styles.formFieldLabel} htmlFor="email">
                        E-Mail Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={styles.formFieldInput}
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={emailChangeHandler}
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formFieldLabel} htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={styles.formFieldInput}
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={passwordChangeHandler}
                    />
                </div>

                <div className={styles.formField}>
                    <button className={styles.formFieldButton}>Sign In</button>{" "}
                    <Link to="/" className={styles.formFieldLink}>
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
