import { React, useState, useEffect } from "react";
import styles from "../EmailHub.module.css";

// COMPONENTS
import MessageCard from "./MessageCard";

const MessageList = () => {
    // JS
    // GET LIST OF ALL CONTACTS WITH UNIQUE SUBJECTS
    const [messageChain, setMessageChain] = useState([]);

    const getEmailClients = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/emailhub/`, {
                method: "GET",
                headers: { token: localStorage.token },
            });

            const parseData = await response.json();

            console.log(parseData);

            setMessageChain(parseData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getEmailClients();
    }, []);

    // JSX
    return (
        <div className={styles.contact_list}>
            {messageChain.map((message) => (
                <MessageCard name={message.sender} />
            ))}
        </div>
    );
};

export default MessageList;
