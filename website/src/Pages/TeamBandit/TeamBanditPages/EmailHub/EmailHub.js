import React, { Fragment, useState, useEffect } from "react";
import styles from "./EmailHub.module.css"

// COMPONENTS
import MessageList from "./MessageList";    

const EmailHub = () => {
    return (
        <div className = {styles.hidden_overflow}>
            <MessageList />
        </div>
    );
};

export default EmailHub;
