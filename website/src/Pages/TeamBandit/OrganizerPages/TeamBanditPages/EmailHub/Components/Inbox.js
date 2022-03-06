import { React, useState, useEffect } from "react";
import styles from "../EmailHub.module.css";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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

const Inbox = () => {
    // JS
    const [messageChain, setMessageChain] = useState([]);
    const [messagesChange, setMessagesChange] = useState(false);

    const getEmails = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/emailhub/getinbox`,
                {
                    method: "GET",
                    headers: { token: localStorage.token },
                }
            );
            const parseData = await response.json();

            setMessageChain(parseData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getEmails();
        setMessagesChange(false);
    }, [messagesChange]);
    
    // JSX
    return (
        <div className={`${styles.message} ${styles.lineheight}`}>
            {messageChain.map((message, index) => (
                <Item className={styles.text} key={index}>
                    <p className={styles.lineheight}>{message.message}</p>
                </Item>
            ))}
        </div>
    );
};

export default Inbox;
