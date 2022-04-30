import { React, useState, useEffect} from "react";
import styles from "./EmailHub.module.css";

// COMPONENTS
import ContactList from "./Components/ContactList";
import ChatLog from "./Components/ChatLog";
import Inbox from "./Components/Inbox";


const EmailHubRouter = ({changeInboxView, selectedChain, inboxView, setSelectedChainHandler, setInboxViewHandler}) => {

    // JSX
    if (inboxView === true) {
        return (
            <div className={styles.page}>
                <ContactList
                    onChangeChain={setSelectedChainHandler}
                    onChangeInboxView={setInboxViewHandler}
                />
                <Inbox  />
            </div>
        );
    } else {
        return (
            <div className={styles.page}>
                <ContactList
                    onChangeChain={setSelectedChainHandler}
                    onChangeInboxView={setInboxViewHandler}
                />
                <ChatLog selectedChain={selectedChain} changeInboxView={changeInboxView}/>
            </div>
        );
    }
};

export default EmailHubRouter;