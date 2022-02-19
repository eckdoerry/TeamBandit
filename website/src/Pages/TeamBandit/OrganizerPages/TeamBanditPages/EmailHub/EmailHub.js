import { React, useState, useEffect } from "react";
import styles from "./EmailHub.module.css";

// COMPONENTS
import MessageList from "./Components/MessageList";
import ChatLog from "./Components/ChatLog";

const EmailHub = () => {
    // JS
    const [selectedChain, setSelectedChain] = useState("");

    const setSelectedChainHandler = (newEmail) => {
        setSelectedChain(newEmail);
    };

    // JSX
    return (
        <div className={styles.page}>
            <MessageList onChangeChain={setSelectedChainHandler} />
            <ChatLog className={styles.log} clientEmail={selectedChain} />
        </div>
    );
};

export default EmailHub;
