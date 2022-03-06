import { React, useState} from "react";
import styles from "./EmailHub.module.css";

// COMPONENTS
import ContactList from "./Components/ContactList";
import ChatLog from "./Components/ChatLog";
import Inbox from "./Components/Inbox";

const EmailHub = () => {
    // JS
    const [selectedChain, setSelectedChain] = useState("");
    const [inboxView, setInboxView] = useState(true);

    const setSelectedChainHandler = (newEmail) => {
        setSelectedChain(newEmail);
    };

    const setInboxViewHandler = (inboxBool) => {
        setInboxView(inboxBool);
    };

    // JSX
    if (inboxView === true) {
        return (
            <div className={styles.page}>
                <ContactList
                    onChangeChain={setSelectedChainHandler}
                    onChangeInboxView={setInboxViewHandler}
                />
                <Inbox />
            </div>
        );
    } else {
        return (
            <div className={styles.page}>
                <ContactList
                    onChangeChain={setSelectedChainHandler}
                    onChangeInboxView={setInboxViewHandler}
                />
                <ChatLog clientEmail={selectedChain} />
            </div>
        );
    }
};

export default EmailHub;
