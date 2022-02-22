import { React } from "react";
// @TODO: Currently commenting these out to remove
// UNUSED warnings
//import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
//import { toast } from "react-toastify";
//import styles from "./Profile.module.css";

import EditBioDialog from "./Components/EditBioDialog";
import EditProfilePicture from "./Components/EditProfilePicture";


const Profile = ({organizerInfo, setOrganizerChange}) => {
    return(
        <>
            <h1>Profile</h1>

            <div>
                <h2>Profile Picture</h2>
                <EditProfilePicture studentInfo={organizerInfo} setOrganizerChange={setOrganizerChange}/>
            </div>

            <div>
                <h2>Bio:</h2>
                <p>{organizerInfo.student_bio}</p>
                <EditBioDialog studentInfo={organizerInfo} setOrganizerChange={setOrganizerChange}/>
            </div>
        </>
    );
}

export default Profile;