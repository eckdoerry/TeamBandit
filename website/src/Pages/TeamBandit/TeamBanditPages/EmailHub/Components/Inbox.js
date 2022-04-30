import { React, useState, useEffect } from "react";
import styles from "../EmailHub.module.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import DeleteIcon from "@mui/icons-material/Delete";
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
    const [modalData, setModalData] = useState({
        sender: "",
        subject: "",
        date: "",
        message: "",
        attachment: "",
    });

    // LIST OF CHECKBOXES CLICKED TO BE USED LATER
    let selectedMessages = [];

    const handleOpen = async (emailkey, isread) => {
        // OPEN MODAL
        setOpen(true);

        // SET EMAIL TO READ
        if (isread === false) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASEURL}/emailhub/markread/${emailkey}`,
                    {
                        method: "PUT",
                        headers: { token: localStorage.token },
                    }
                );
                const parseData = await response.json();
                setMessagesChange(parseData);
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    // CLOSES MODAL
    const handleClose = () => setOpen(false);

    // HANDLES CLICKING CHECKBOXES
    const onCheckboxClick = (messageid) => {
        // IF ITEM IS ON ARRAY, TAKE IT OFF
        if (selectedMessages.includes(messageid)) {
            const index = selectedMessages.indexOf(messageid);
            selectedMessages.splice(index, 1);
        }

        // IF ITEM IS NOT IN ARRAY, ADD IT
        else {
            selectedMessages.push(messageid);
        }
    };

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

    const markArchived = async () => {
        console.log(selectedMessages.length)
        for (let i = 0; i < selectedMessages.length; i++) {
            console.log("Deleting " + selectedMessages[i])
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASEURL}/emailhub/markarchived/${selectedMessages[i]}`,
                    {
                        method: "PUT",
                        headers: { token: localStorage.token },
                    }
                );
                const parseData = await response.json();
                setMessagesChange(parseData);
                selectedMessages = [];
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    useEffect(() => {
        getEmails();
        setMessagesChange(false);
    }, [messagesChange]);

    // JSX
    return (
        <div className={`${styles.message} ${styles.lineheight}`}>
            <Item className={styles.titles}>
                <p className={styles.farleftpanetitle}>
                    <DeleteIcon fontSize="small" onClick = {markArchived} />
                </p>
                <p className={styles.leftpane}>From</p>
                <p className={styles.middleleftpane}>Subject</p>
                <p className={styles.middlerightpane}>Date</p>
                <p className={styles.rightpanetitle}>Attachment</p>
            </Item>
            {messageChain.map((message, index) => (
                <Item
                    className={
                        message.read === true
                            ? `${styles.inboxEmail}`
                            : `${styles.inboxEmailUnread}`
                    }
                    key={index}
                    onClick={() => {
                        handleOpen(message.message_id, message.read);
                        setModalData({
                            sender: message.sender,
                            subject: message.subject,
                            date: message.datetime,
                            message: message.message,
                            attachment: message.attachment,
                        });
                    }}
                >
                    <Checkbox
                        size="small"
                        className={styles.farleftpane}
                        onClick={(e) => {
                            e.stopPropagation();
                            onCheckboxClick(message.message_id);
                        }}
                    ></Checkbox>
                    <p className={styles.leftpane}>{message.sender}</p>
                    <p className={styles.middleleftpane}>{message.subject}</p>
                    <p className={styles.middlerightpane}>
                        {message.datetime.slice(11, 16) +
                            " " +
                            message.datetime.slice(5, 10)}
                    </p>
                    <p className={styles.rightpaneicon}>
                        {message.attachment != null && (
                            <AttachEmailIcon fontSize="small" />
                        )}
                    </p>
                </Item>
            ))}

            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modal_style}>
                    <p className={styles.modal_sender}>
                        From: {modalData.sender}
                    </p>
                    <hr />
                    <p>Subject: {modalData.subject}</p>
                    <hr />
                    <p>
                        Date:{" "}
                        {modalData.date.slice(11, 16) +
                            " " +
                            modalData.date.slice(5, 10)}
                    </p>
                    <hr />
                    <p>
                        Body:
                        <br /> {modalData.message}
                    </p>
                    {modalData.attachment != null && (
                        <div>
                            {" "}
                            <hr />
                            <p>
                                Attachment:{" "}
                                <a
                                    target="__blank"
                                    href={
                                        "/emailAttachments/" +
                                        modalData.attachment
                                    }
                                >
                                    {modalData.attachment}
                                </a>
                            </p>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Inbox;
