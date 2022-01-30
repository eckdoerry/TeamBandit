import React, { Fragment, useState, useEffect } from "react";
import styles from "./EmailHub.module.css"

// COMPONENTS
import MessageList from "./MessageList";    

const EmailHub = () => {
    return (
        <Fragment className = {styles.hidden_overflow}>
            <MessageList />
        </Fragment>
    );
};

export default EmailHub;
