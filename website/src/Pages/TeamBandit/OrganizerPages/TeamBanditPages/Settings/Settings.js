import {Fragment, React} from "react";

import EditPassword from "./Components/EditPassword";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Settings = ({organizerInfo, setOrganizerChange}) => {
    return(
        <div style={{ width: "100%", height: "100%"}}>
        <Typography variant="h2" gutterBottom>Account Settings</Typography>
            <Paper style={{padding: '25px'}} elevation={3}>
                <Typography style={{borderBottom: '1px solid black', borderBottomWidth: 'thin', width: '20%'}} variant="h4" gutterBottom> Password Settings </Typography>
                <EditPassword organizerInfo={organizerInfo} setOrganizerChange={setOrganizerChange}/>
            </Paper>
        </div>
    );
}

export default Settings;
