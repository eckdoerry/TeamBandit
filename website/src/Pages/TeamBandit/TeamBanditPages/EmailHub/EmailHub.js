import { React, useState, useEffect} from "react";
import styles from "./EmailHub.module.css";

// COMPONENTS
import ContactList from "./Components/ContactList";
import ChatLog from "./Components/ChatLog";
import Inbox from "./Components/Inbox";
import EmailHubRouter from "./EmailHubRouter";

const EmailHub = () => {
    // JS
    const [selectedChain, setSelectedChain] = useState("");
    const [inboxView, setInboxView] = useState(true);
    const [highlight, setHighlight] = useState(-1);

    const setSelectedChainHandler = (newEmail) => {
        setSelectedChain(newEmail);
    };

    const setInboxViewHandler = (inboxBool) => {
        setInboxView(inboxBool);
    };

    const changeInboxView = () => {
        setInboxView(!inboxView);
    };

    return (
        <EmailHubRouter highlight={highlight} setHighlight={setHighlight} changeInboxView={changeInboxView} selectedChain={selectedChain} inboxView={inboxView} setSelectedChainHandler={setSelectedChainHandler} setInboxViewHandler={setInboxViewHandler}/>
    );
};

export default EmailHub;
