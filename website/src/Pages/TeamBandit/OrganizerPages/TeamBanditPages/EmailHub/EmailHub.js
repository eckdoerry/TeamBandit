import React from "react";
import styles from "./EmailHub.module.css"

// COMPONENTS
import MessageList from "./Components/MessageList";    

const EmailHub = () => {
    return (
        <div className = {styles.hidden_overflow}>
            <MessageList />
        </div>
    );
};

export default EmailHub;
