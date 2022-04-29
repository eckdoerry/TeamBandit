import { React, useState, useEffect } from "react";
import styles from "../EmailHub.module.css";
import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: "200px",
    lineHeight: "10px",
}));

const ContactList = (props) => {
    // JS
    // GET LIST OF ALL CONTACTS WITH UNIQUE SUBJECTS
    const [contactList, setContactList] = useState([]);

    const getEmailClients = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/emailhub/`, {
                method: "GET",
                headers: { token: localStorage.token },
            });

            const parseData = await response.json();

            setContactList(parseData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const changeChainHandler = (string) => {
        props.onChangeChain(string);
    };

    const changeInboxViewhandler = (inboxViewBool) => {
        props.onChangeInboxView(inboxViewBool);
    }

    useEffect(() => {
        getEmailClients();
    }, []);

    // JSX
    return (
        <Stack spacing = {1} className={styles.contact_list}>
            <Item
                    className={styles.contact_card}
                    style={{height: '68px', backgroundColor: '#003466', color: 'white', textAlign: 'center', fontSize: 'large', fontWeight: '500', alignItems: 'center', justifyContent: 'center'}}
                    onClick={() => {
                        changeInboxViewhandler(true);
                    }}
                >
                    <Typography variant="h5" style={{justifyContent: 'center', alignItems: 'center'}}> Inbox </Typography>
                </Item>
            {contactList.map((message, index) => (
                
                <Item
                    className={styles.contact_card}
                    key={index}
                    onClick={() => {
                        changeChainHandler(message.client_email);
                        changeInboxViewhandler(false);
                    }}
                >
                    <p className={styles.contact_name}>{message.client_fname} {message.client_lname}</p>
                    <p className={styles.contact_email}>
                        {message.client_email}
                    </p>
                </Item>
            ))}
        </Stack>
    );
};

export default ContactList;
