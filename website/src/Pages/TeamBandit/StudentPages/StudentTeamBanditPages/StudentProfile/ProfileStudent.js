import { React } from "react";

// MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import EditBioDialogStudent from "./Components/EditBioDialogStudent";
import EditProfilePictureStudent from "./Components/EditProfilePictureStudent";

const ProfileStudent = ({ studentInfo, setStudentChange }) => {
    return (
        <>
            <Paper style={{ padding: "25px" }} elevation={3}>
                <Typography
                    style={{
                        borderBottom: "1px solid black",
                        borderBottomWidth: "thin",
                        width: "15%",
                    }}
                    variant="h4"
                    gutterBottom
                >
                    Profile
                </Typography>
                <div>
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Update Profile Picture{" "}
                    </Typography>
                    <EditProfilePictureStudent
                        studentInfo={studentInfo}
                        setStudentChange={setStudentChange}
                    />
                </div>

                <div>
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Your Team Title{" "}
                    </Typography>
                    <Typography style={{ padding: "5px" }} variant="h8">
                        {studentInfo.student_bio}
                    </Typography>

                    <EditBioDialogStudent
                        studentInfo={studentInfo}
                        setStudentChange={setStudentChange}
                    />
                </div>
            </Paper>
        </>
    );
};

export default ProfileStudent;
