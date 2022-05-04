import { React } from "react";

import { Link } from "react-router-dom";

import EditBioDialogStudent from "./Components/EditBioDialogStudent";
import EditProfilePicture from "./Components/EditProfilePicture";
import EditResumeStudent from "./Components/EditResumeStudent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


const Profile = ({userInfo, setUserChange}) => {

    if (localStorage.getItem('user') == "organizer") {
        return (
            <div style={{ width: "100%", height: "100%"}}>
            <Typography variant="h2" gutterBottom>Profile Settings</Typography>
            <Paper style={{padding: '25px'}} elevation={3}>

            <div>
            <Typography style={{borderBottom: '1px solid black', borderBottomWidth: 'thin', width: '15%'}} variant="h4" gutterBottom> Profile Picture </Typography>
                <EditProfilePicture userInfo={userInfo} setUserChange={setUserChange}/>
            </div>

            </Paper>
        </div>
            
        );
    } else if (localStorage.getItem('user') == "student") {
        return (
            <div style={{ width: "100%", height: "100%"}}>
            <Typography variant="h2" gutterBottom>Profile Settings</Typography>
            <Paper style={{padding: '25px'}} elevation={3}>

            <div>
            <Typography style={{borderBottom: '1px solid black', borderBottomWidth: 'thin', width: '15%'}} variant="h4" gutterBottom> Profile Picture </Typography>
                <EditProfilePicture userInfo={userInfo} setUserChange={setUserChange}/>
            </div>
            <div>
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Your Team Role{" "}
                    </Typography>
                    <Typography style={{ padding: "5px" }} variant="h8">
                        {userInfo.student_bio}
                    </Typography>

                    <EditBioDialogStudent
                        userInfo={userInfo}
                        setUserChange={setUserChange}
                    />
                </div>
                <div>
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Student Resume{" "}
                    </Typography>
                    <EditResumeStudent userInfo={userInfo} setUserChange={setUserChange}/>
                </div>
                <Link
                            target="_blank"
                            to={`/student-profile/${userInfo.student_id}`}
                        >
                            {" "}
                            <Typography variant="h5">Public Profile Website</Typography>
                        </Link> 
            </Paper>
        </div>
            
        );
    }
    else{
        return(
            <div>
                <p>ERROR</p>
            </div>
        )
    }
}

export default Profile;