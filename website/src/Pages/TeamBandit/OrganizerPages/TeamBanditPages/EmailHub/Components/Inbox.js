import { React, useState, useEffect } from "react";
import styles from "../EmailHub.module.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

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

    // MODAL STATES
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // PULL ALL EMAILS WHERE CURRENT ORGANIZER IS THE RECIPIENT
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
                <Item
                    className={
                        message.read === true
                            ? `${styles.inboxEmail}`
                            : `${styles.inboxEmailUnread}`
                    }
                    key={index}
                    onClick={handleOpen}
                >
                    <Checkbox size="small"></Checkbox>
                    <p className={styles.leftpane}>{message.sender}</p>
                    <p className={styles.middlepane}>TeamBandit</p>
                    <p className={styles.rightpane}>{message.datetime}</p>
                </Item>
            ))}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className = {styles.modal_style}>
                    <p> Sender:</p>
                    
                </Box>
            </Modal>
        </div>
    );
};

export default Inbox;
