import React, {useState} from "react";

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditStudent = ({team, setRowChange}) => {
    
    // Variables 
    const [teamName, setTeamName] = useState(team.team_name + "");
    const [teamSize, setTeamSize] = useState(team.team_size + "");


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTeamName(team.team_name);
        setTeamName(team.team_size);
    };

    //edit description function
    const updateTeam = async e => {
        e.preventDefault();
        try {
            const body = {teamName, teamSize};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`http://localhost:5000/teams/teams/${team.team_id}`, {method: "PUT", headers: myHeaders, body: JSON.stringify(body)});

            toast.success("Team was successfully updated!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update student!");
        }
    };

    return (
        <div>
            <Button variant="outlined" color="warning" onClick={handleOpen} startIcon={<EditIcon />}>
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Student
                        </Typography>
                    </Box>
                
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Fill out the forms you would like to change:
                </Typography>
                
                        
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Team Name" type = "text" value = {teamName} onChange = {e => setTeamName(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Team Name" type = "text" value = {teamSize} onChange = {e => setTeamSize(e.target.value)}/>      
                <Button sx={{ m: 2 }} variant="contained" color="warning" onClick = {(e) => (handleClose(), updateTeam(e))}> Edit </Button>
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose}> Close </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default EditStudent;

