import { React } from "react";
// @TODO: Currently commenting these out to remove
// UNUSED warnings
//import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
//import { toast } from "react-toastify";
//import styles from "./Profile.module.css";

import EditBioDialogStudent from "./Components/EditBioDialogStudent";
import EditProfilePictureStudent from "./Components/EditProfilePictureStudent";

const ProfileStudent = ({studentInfo, setStudentChange}) => {
    return(
        <>
            <h1>Profile</h1>

            <div>
                <h2>Profile Picture</h2>
                <EditProfilePictureStudent studentInfo={studentInfo} setStudentChange={setStudentChange}/>
            </div>

            <div>
                <h2>Bio:</h2>
                <p>{studentInfo.student_bio}</p>
                <EditBioDialogStudent studentInfo={studentInfo} setStudentChange={setStudentChange}/>
            </div>
        </>
    );
}

export default ProfileStudent;