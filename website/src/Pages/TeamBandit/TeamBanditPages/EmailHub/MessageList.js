import React from "react";
import styles from "./EmailHub.module.css"

// COMPONENTS
import MessageCard from "./MessageCard";

// TODO: DELETE
const DUMMY_CONTACTS = ['Freddy Krueger', 'Keyser Söze', 'Mohinder Singh Pandher', 'John Wick', 'Jason Voorhees',
'Freddy Krueger', 'Keyser Söze', 'Mohinder Singh Pandher', 'John Wick', 'Jason Voorhees',
'Freddy Krueger', 'Keyser Söze', 'Mohinder Singh Pandher', 'John Wick', 'Jason Voorhees',
'Freddy Krueger', 'Keyser Söze', 'Mohinder Singh Pandher', 'John Wick', 'Jason Voorhees'];

const MessageList = () => {
    // JS


    // JSX
    return (
        <div className = {styles.contact_list}>
            {DUMMY_CONTACTS.map(DUMMY_CONTACT => <MessageCard name = {DUMMY_CONTACT}/>)}
        </div>
    )
}

export default MessageList;