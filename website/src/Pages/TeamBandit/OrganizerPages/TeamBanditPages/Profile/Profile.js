import { React } from "react";
// @TODO: Currently commenting these out to remove
// UNUSED warnings
//import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
//import { toast } from "react-toastify";
//import styles from "./Profile.module.css";

import EditBioDialog from "./Components/EditBioDialog";


const Profile = ({organizerInfo, setOrganizerChange}) => {
    return(
        <>
            <h1>Profile</h1>
            <h2>Your bio:</h2>
            <p>{organizerInfo.organizer_bio}</p>
            <EditBioDialog setOrganizerChange={setOrganizerChange}/>
        </>
    );
}

export default Profile;