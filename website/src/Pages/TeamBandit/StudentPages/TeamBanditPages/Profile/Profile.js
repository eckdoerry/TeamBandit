import { React } from "react";
// @TODO: Currently commenting these out to remove
// UNUSED warnings
//import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
//import { toast } from "react-toastify";
//import styles from "./Profile.module.css";

import EditBioDialog from "./Components/EditBioDialog";
import EditProfilePicture from "./Components/EditProfilePicture";

const Profile = ({studentInfo, setStudentChange}) => {
    return(
        <>
            <h1>Profile</h1>

            <div>
                <h2>Profile Picture</h2>
                <EditProfilePicture studentInfo={studentInfo} setStudentChange={setStudentChange}/>
            </div>

            <div>
                <h2>Bio:</h2>
                <p>{studentInfo.student_bio}</p>
                <EditBioDialog studentInfo={studentInfo} setStudentChange={setStudentChange}/>
            </div>
        </>
    );
}

export default Profile;