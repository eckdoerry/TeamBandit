import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import styles from "./SignUpForm.module.css"

const SignUpForm = (props) => {
    
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        fname: "",
        lname: ""
    });

    const { email, password, fname, lname } = inputs;

    const [hasAgreed, setHasAgreed] = useState(false);

    const onChange = (event) => {
        setInputs({...inputs, [event.target.name] : event.target.value});
    };

    const hasAgreedChangeHandler = (event) => {
        setHasAgreed( hasAgreed ? false : true);
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();

        try {
            const body = {email, password, fname, lname};

            const response = await fetch("http://34.216.91.228:3000/auth/register", { method: "POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(body)});
            
            const parseRes = await response.json();
            console.log(parseRes)
            if(parseRes.token)
            {
                localStorage.setItem("token", parseRes.token);

                props.setAuth(true);
                toast.success("Registered Successfully!");
            } else {
                props.setAuth(false);
                toast.error(parseRes);
            }
            

        } catch (error) {
            console.error(error.message);
        }
    };
    
    // JSX
        return (
            <div className={styles.formCenter}>
                <form onSubmit={onSubmitForm} className={styles.formFields}>
                    <div className={styles.formField}>
                        <label className={styles.formFieldLabel} htmlFor="fname">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="fname"
                            className={styles.formFieldInput}
                            placeholder="Enter your first name"
                            name="fname"
                            value={fname}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.formFieldLabel} htmlFor="lname">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lname"
                            className={styles.formFieldInput}
                            placeholder="Enter your last name"
                            name="lname"
                            value={lname}
                            onChange={event => onChange(event)}
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
                            onChange={event => onChange(event)}
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
                            onChange={event => onChange(event)}
                        />
                    </div>

                    <div className={styles.formField}>
                        <label className={styles.formFieldCheckboxLabel}>
                            <input
                                className={styles.formFieldCheckbox}
                                type="checkbox"
                                name="hasAgreed"
                                value={hasAgreed}
                                onChange={event => onChange(event)}
                            />{" "}
                            I agree to all statements in the
                            <a href="/privacy-policy" target="_blank" className={styles.formFieldTermsLink}>
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    <div className="formField">
                        <button className={styles.formFieldButton}>Sign Up</button>{" "}
                        <Link to="/sign-in" className={styles.formFieldLink}>
                            I'm already a member
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
export default SignUpForm;
