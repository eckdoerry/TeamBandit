import { React, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import styles from "../EmailHub.module.css";
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

const ChatLog = (props) => {
    // JS
    const [messageChain, setMessageChain] = useState([]);

    const getEmails = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/emailhub/getchain/${props.clientEmail}`,
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
    }, [props.clientEmail]);

    // JSX
    return (
        <div className={`${styles.message} ${styles.lineheight}`}>
            {messageChain.map((message, index) => (
                <Item
                    className={message.sender === props.clientEmail ? `${styles.text}` : `${styles.textSent}`}
                    key={index}
                >
                    <p className={styles.lineheight}>{message.message}</p>
                </Item>
            ))}
        </div>
    );
};

export default ChatLog;
