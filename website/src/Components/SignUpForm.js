import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SignUpForm.module.css"

const SignUpForm = () => {
    // JS

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [hasAgreed, setHasAgreed] = useState(false);

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const hasAgreedChangeHandler = (event) => {
        setHasAgreed( hasAgreed ? false : true);
    }

    const submitHandler = () => {
        console.log("Submitted");
    }
    
    // JSX
        return (
            <div className={styles.formCenter}>
                <form onSubmit={submitHandler} className={styles.formFields}>
                    <div className={styles.formField}>
                        <label className={styles.formFieldLabel} htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={styles.formFieldInput}
                            placeholder="Enter your full name"
                            name="name"
                            value={name}
                            onChange={nameChangeHandler}
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
                        <label className={styles.formFieldCheckboxLabel}>
                            <input
                                className={styles.formFieldCheckbox}
                                type="checkbox"
                                name="hasAgreed"
                                value={hasAgreed}
                                onChange={hasAgreedChangeHandler}
                            />{" "}
                            I agree all statements in{" "}
                            <a href="null" className={styles.formFieldTermsLink}>
                                terms of service
                            </a>
                        </label>
                    </div>

                    <div className="formField">
                        <button className={styles.formFieldButton}>Sign Up</button>{" "}
                        <Link to="/sign-in" className={styles.formFieldLink}>
                            I'm already member
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
export default SignUpForm;
