import { React, useState, useEffect } from "react";
import styles from "../EmailHub.module.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: "200px",
    lineHeight: "10px",
}));

const MessageList = (props) => {
    // JS
    // GET LIST OF ALL CONTACTS WITH UNIQUE SUBJECTS
    const [messageList, setMessageList] = useState([]);

    const getEmailClients = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/emailhub/`, {
                method: "GET",
                headers: { token: localStorage.token },
            });

            const parseData = await response.json();

            setMessageList(parseData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const changeChainHandler = (string) => {
        props.onChangeChain(string);
    };

    useEffect(() => {
        getEmailClients();
    }, []);

    // JSX
    return (
        <div className={styles.contact_list}>
            {messageList.map((message, index) => (
                <Item
                    className={styles.contact_card}
                    key={index}
                    onClick={() => {
                        changeChainHandler(message.client_email);
                    }}
                >
                    <p className={styles.contact_name}>{message.client_name}</p>
                    <p className={styles.contact_email}>
                        {message.client_email}
                    </p>
                </Item>
            ))}
        </div>
    );
};

export default MessageList;
