import React, {Fragment, useState} from "react";

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

const EditClient = ({client, setClientsChange}) => {


    // Variables
    const [clientName, setClientName] = useState(client.client_name);
    const [email, setEmail] = useState(client.client_email);
    const [company, setCompany] = useState(client.client_company);
    const [notes, setNotes] = useState(client.client_notes);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setClientName(client.client_name);
        setEmail(client.client_email);
        setCompany(client.client_company);
        setNotes(client.client_notes);
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        if (!clientName || !company || !email){
          alert("Please fill out all required fields");
          return;
        }
        try {
            const myHeaders = new Headers();
    
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
    
            const body = { clientName, email, company, notes };
            const response = await fetch("http://localhost:5000/clients/editclient", {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
    
            setClientsChange(true);
            setClientName("");
            setCompany("");
            setEmail("");
            setNotes("");
            updateClient(e);
        } catch (err) {
          console.error(err.message);
          toast.error("Failed to add client!");
        }
        handleClose();
      };

    //edit description function
    const updateClient = async e => {
        e.preventDefault();
        try {
            const body = {clientName, email, company, notes};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`http://localhost:5000/clients/editclient/${client.client_id}`, {method: "PUT", headers: myHeaders, body: JSON.stringify(body)});

            const resp = await response.json();
            toast.success(resp);
            setClientsChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update client!");
        }
        handleClose();
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
                            Edit Client
                        </Typography>
                    </Box>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Fill out the forms you would like to change:
                </Typography>


                <TextField 
                required 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Name" 
                type = "text" 
                value = {clientName} 
                error={clientName === ""} 
                helperText={clientName === "" ? 'Client name is required' : ' '}
                onChange = {e => setClientName(e.target.value)}/>
                <TextField 
                required 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Email" 
                type = "text" 
                value = {email} 
                helperText={clientName === "" ? 'Client email is required' : ' '}
                onChange = {e => setEmail(e.target.value)}/>
                <TextField 
                required 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Company" 
                type = "text" 
                value = {company} 
                helperText={clientName === "" ? 'Client company is required' : ' '}
                onChange = {e => setCompany(e.target.value)}/>
                <TextField 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Notes" 
                type = "text" 
                value = {notes}
                onChange = {e => setNotes(e.target.value)}/>


                <Button sx={{ m: 2 }} variant="contained" color="warning" onClick = {onSubmitForm}> Edit </Button>


                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose}> Close </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default EditClient;
