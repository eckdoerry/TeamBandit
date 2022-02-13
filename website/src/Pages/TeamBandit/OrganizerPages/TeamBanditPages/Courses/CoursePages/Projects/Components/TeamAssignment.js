import {React} from "react";

//MUI Import
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';

const TeamAssignment = () => {
    return(
        <div>
            <Button style={{textAlign: 'center', whiteSpace: 'nowrap'}} sx={{ m: 3 }} variant="outlined" color="secondary" startIcon={<GroupsIcon />}> Team Assignment </Button>
        </div>
    );
}

export default TeamAssignment;