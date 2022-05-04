import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from "./SignUpForm.module.css"

/**
 * Displays the registering page for the user to see and
 * registers the user once they fill out information
 * 
 * @param setAuth Authorizes the user once they register
 * @TODO: Implement the checkbox doing something or we should take it out 
 */
const SignUpForm = ({setAuth, setUser, changeLocation}) => {
    
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        course: "",
    });

    const { email, password, course } = inputs;

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
            const body = {email, password, course};

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/auth/registerStudent`, { method: "POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(body)});
            
            const parseRes = await response.json();
            
            if(parseRes.token)
            {
                localStorage.setItem("token", parseRes.token);
                setUser('student');
                setAuth(true);
                toast.success("Registered Successfully!");
            } else {
                setAuth(false);
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
                    <label className={styles.formFieldLabel} htmlFor="course">
                        Course Code
                    </label>
                    <input
                        type="text"
                        id="course"
                        className={styles.formFieldInput}
                        placeholder="Enter your given course code"
                        name="course"
                        value={course}
                        onChange={event => onChange(event)}
                    />
                </div>
                <div className="formField">
                    <button className={styles.formFieldButton}>Sign Up</button>{" "}
                    <p onClick={()=> changeLocation("sign-in")} className={styles.formFieldLink}>
                        I'm already a member
                    </p>
                </div>
            </form>
        </div>
        );
    }
export default SignUpForm;
