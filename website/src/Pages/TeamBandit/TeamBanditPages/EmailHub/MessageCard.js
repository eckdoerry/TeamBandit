import React from "react";
import styles from "./EmailHub.module.css"

const MessageCard = (props) => {
    // JS
    console.log(props.name)

    // JSX
    return (
        <div className = {styles.contact_card}>
            {props.name}
        </div>
        
    )
}

export default MessageCard;