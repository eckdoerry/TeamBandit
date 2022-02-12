import { useState, useEffect, React } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import styles from "./Profile.module.css";
import EditBioDialog from "./EditBioDialog";


const Profile = ({organizerInfo, setOrganizerChange}) => {

    return(
        <>
           <h1>Profile</h1>
           <h2>Your bio:</h2>
           <p>{organizerInfo.organizer_bio}</p>
           {console.log(organizerInfo)}
           <EditBioDialog setOrganizerChange={setOrganizerChange}/>
        </>
    );
}

export default Profile;