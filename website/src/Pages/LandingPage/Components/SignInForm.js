import React, { Fragment, useState} from "react";

import styles from "./SignInForm.module.css";
import { toast } from 'react-toastify';

/**
 * Displays the sign in information and accesses the login
 * route to log the user in
 * 
 * @param setAuth Passed along to give the user authentication
 * @param setUser Passed along to determine which type of user
 * is signed in
 */
const SignInForm = ({setAuth, setUser, changeLocation}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    
    const { email, password } = inputs;

    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name] : event.target.value});
    };

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {

            const body = { email, password };

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/auth/login`, { method: "POST", headers : {"Content-Type": "application/json"}, body: JSON.stringify(body)});

            const parseRes = await response.json();

            if( parseRes.token_value )
            {
                localStorage.setItem("token", parseRes.token_value);
                setAuth(true);
                toast.success("Login successful!");
                setUser(parseRes.user_identifier);
            } else {
                setAuth(false);
                toast.error(parseRes);
                setUser("NULL");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <div className={styles.formCenter}>
                <form className={styles.formFields} onSubmit={onSubmitForm}>
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
                        <button className={styles.formFieldButton}>Sign In</button>{" "}
                        <p onClick={() => changeLocation("sign-up")} className={styles.formFieldLink}>
                            Create an account
                        </p>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default SignInForm;
