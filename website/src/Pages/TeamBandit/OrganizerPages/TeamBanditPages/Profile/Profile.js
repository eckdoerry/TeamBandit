import { React } from "react";


import EditBioDialog from "./Components/EditBioDialog";
import EditProfilePicture from "./Components/EditProfilePicture";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


const Profile = ({organizerInfo, setOrganizerChange}) => {
    return(
        <div style={{ width: "100%", height: "100%"}}>
            <Typography variant="h2" gutterBottom>Profile Settings</Typography>
            <Paper style={{padding: '25px'}} elevation={3}>

            <div>
            <Typography style={{borderBottom: '1px solid black', borderBottomWidth: 'thin', width: '15%'}} variant="h4" gutterBottom> Profile Picture </Typography>
                <EditProfilePicture organizerInfo={organizerInfo} setOrganizerChange={setOrganizerChange}/>
            </div>

            <div>
            <Typography style={{borderBottom: '1px solid black', borderBottomWidth: 'thin', width: '15%'}} variant="h4" gutterBottom> Biography </Typography>
                <p>{organizerInfo.student_bio}</p>
                <EditBioDialog organizerInfo={organizerInfo} setOrganizerChange={setOrganizerChange}/>
            </div>
            </Paper>
        </div>
    );
}

export default Profile;