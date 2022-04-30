import {React} from "react";

//MUI Import
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';

const TeamAssignment = ({setRoute}) => {
    return(
        <div>
            <Button style={{textAlign: 'center', whiteSpace: 'nowrap'}} sx={{ m: 3 }} variant="contained" color="secondary" startIcon={<GroupsIcon />} onClick = {() => setRoute("Teams Assignment")}> Team Assignment </Button>
        </div>
    );
}

export default TeamAssignment;