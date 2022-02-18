import { React } from "react";
// @TODO: Currently commenting these out to remove
// UNUSED warnings
//import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
//import { toast } from "react-toastify";
//import styles from "./Profile.module.css";

import EditBioDialog from "./Components/EditBioDialog";
import TestProfilePicture from "./Components/TestProfilePicture";

const Profile = ({studentInfo, setStudentChange}) => {
    return(
        <>
            <h1>Profile</h1>
            <h2>Your bio:</h2>
            <p>{studentInfo.student_bio}</p>
            <EditBioDialog setStudentChange={setStudentChange}/>
            <TestProfilePicture setStudentChange={setStudentChange}/>
        </>
    );
}

export default Profile;