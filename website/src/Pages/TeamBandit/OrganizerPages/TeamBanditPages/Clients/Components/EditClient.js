import React, {useState} from "react";

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

    const [clientFName, setClientFName] = useState("");
    const [clientLName, setClientLName] = useState("");
    const [clientOrganization, setClientOrganization] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhoneNumber, setClientPhoneNumber] = useState("");
    const [clientNotes, setClientNotes] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setClientFName(client.client_fname);
        setClientLName(client.client_lname);
        setClientOrganization(client.client_organization);
        setClientEmail(client.client_email);
        setClientPhoneNumber(client.client_phonenumber);
        setClientNotes(client.client_notes);
    }
    const handleClose = () => {
        setOpen(false);
        setClientFName(client.client_fname);
        setClientLName(client.client_lname);
        setClientOrganization(client.client_organization);
        setClientEmail(client.client_email);
        setClientPhoneNumber(client.client_phonenumber);
        setClientNotes(client.client_notes);
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        if (!clientFName || !clientLName || !clientOrganization || !clientEmail){
            alert("Please fill out all required fields");
            return;
        }
        try {
            const myHeaders = new Headers();
    
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
    
            const body = { clientFName, clientLName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes };
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/clients/editclient`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
    
            setClientsChange(true);
            setClientFName("");
            setClientLName("");
            setClientOrganization("");
            setClientEmail("");
            setClientPhoneNumber("");
            setClientNotes("");
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
            const body = {clientFName, clientLName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/clients/editclient/${client.client_id}`, {method: "PUT", headers: myHeaders, body: JSON.stringify(body)});

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
                autofocus
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Last name" 
                type = "text" 
                value = {clientLName} 
                error={clientLName === ""} 
                helperText={clientLName === "" ? 'Client last name is required' : ' '}
                onChange = {e => setClientLName(e.target.value)}/>
                
                <TextField 
                required 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="First name" 
                type = "text" 
                value = {clientFName} 
                error={clientFName === ""} 
                helperText={clientFName === "" ? 'Client first name is required' : ' '}
                onChange = {e => setClientFName(e.target.value)}/>

                <TextField 
                required 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Organization" 
                type = "text" 
                value = {clientOrganization} 
                error={clientOrganization === ""} 
                helperText={clientOrganization === "" ? 'Client organization is required' : ' '}
                onChange = {e => setClientOrganization(e.target.value)}/>

                <TextField 
                required 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Email" 
                type = "text" 
                value = {clientEmail} 
                error={clientEmail === ""} 
                helperText={clientEmail === "" ? 'Client email is required' : ' '}
                onChange = {e => setClientEmail(e.target.value)}/>

                <TextField 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Phone Number" 
                type = "text" 
                value = {clientPhoneNumber}
                onChange = {e => setClientPhoneNumber(e.target.value)}/>
                
                <TextField 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Notes" 
                type = "text" 
                value = {clientNotes}
                onChange = {e => setClientNotes(e.target.value)}/>


                <Button sx={{ m: 2 }} variant="contained" color="warning" onClick = {onSubmitForm}> Edit </Button>


                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose}> Close </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default EditClient;
