import React, {useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Delete} from "@mui/icons-material";


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

const FormDialogEditClient = ({client, setClientsChange}) => {

    const [clientFName, setClientFName] = useState("");
    const [clientLName, setClientLName] = useState("");
    const [clientOrganization, setClientOrganization] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhoneNumber, setClientPhoneNumber] = useState("");
    const [clientNotes, setClientNotes] = useState("");
    const [clientLocation, setClientLocation] = useState("");

    const [clientLogo, setClientLogo] = useState(null);
    const [clientLogoFilename, setClientLogoFilename] = useState(null);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleConfirmDelete = () => {
        handleDeleteConfirmClose();
        deleteClient(client.client_id);
    };

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    const onClientLogoChange = (e) => {
        setClientLogo(e.target.files[0]); 
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setClientFName(client.client_fname);
        setClientLName(client.client_lname);
        setClientOrganization(client.client_organization);
        setClientEmail(client.client_email);
        setClientPhoneNumber(client.client_phonenumber);
        setClientNotes(client.client_notes);
        setClientLocation(client.client_location);
        setClientLogo(client.client_logo);
    }
    const handleClose = () => {
        setOpen(false);
        setClientFName(client.client_fname);
        setClientLName(client.client_lname);
        setClientOrganization(client.client_organization);
        setClientEmail(client.client_email);
        setClientPhoneNumber(client.client_phonenumber);
        setClientNotes(client.client_notes);
        setClientLogo(client.client_logo);
    };

    const updateClientLogo = async (e) => {
        e.preventDefault();
        if (!clientLogo)
        {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("clientLogo", clientLogo);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/clientLogo/${client.client_id}`, {method: "PUT", body: formData, headers: myHeaders});

            toast.success(await response.json());
            setClientsChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
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
    
            const body = { clientFName, clientLName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes, clientLocation };
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
            setClientLocation("");
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
            const body = {clientFName, clientLName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes, clientLocation};
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

    const deleteClient = async (id) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/clients/deleteclient/${id}`,
                {
                    method: "DELETE",
                    headers: { token: localStorage.token },
                }
            );

            const resp = await response.json();

            toast.success(resp);
            setClientsChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete client!");
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
                </Typography>
                <Typography style={{ padding: "5px" }} variant="caption">
                        {" "}
                        *Recommend City, State{" "}
                    </Typography>
                <TextField 
                sx={{ m: 2 }} 
                variant="filled" 
                id ="filled-password-input" 
                label="Location" 
                type = "text" 
                value = {clientLocation}
                onChange = {e => setClientLocation(e.target.value)}/>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
                </Typography>
                    <form onSubmit={updateClientLogo} encType="multipart/form-data">
                        <input type="file" accept="images/*" name="clientLogo" onChange={onClientLogoChange}/>
                        <Button style={{ padding: "5px" }} type="submit">Upload</Button>
                    </form>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
                </Typography>
                <Button sx={{ m: 2 }} variant="contained" color="warning" onClick = {onSubmitForm}> Update </Button>
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose}> Cancel </Button>
                
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteConfirmOpen}
                    startIcon={<DeleteIcon />}
                >
                    {" "}
                    Delete Client
                    {" "}
                </Button>

                <Dialog 
                    open={deleteConfirmOpen}
                    onClose={handleClose}
                    fullWidth
                >

                    <DialogTitle>
                        PERMANENTLY DELETE CLIENT
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                        <div
                            style= {
                                {
                                    display: "float",
                                    float: "left"
                                }
                            }
                        >
                        Are you sure you want to delete this client forever?
                        </div>

                        </DialogContentText>
                        
                    </DialogContent>

                    <div
                        style={{display: "float"}}
                    >

                    <Button
                        sx={
                            { m: 3, pl: 1, pr: 1 }
                        }

                        style={
                            { 
                                textAlign: "center", 
                                whiteSpace: "nowrap", 
                                color:"red",
                                borderColor:"red",
                                float:"left"
                            }
                        }

                        size="medium"
                        variant="outlined"
                        startIcon={<Delete />}
                        onClick={handleConfirmDelete}
                    >
                        Delete Client Forever
                    </Button>

                    </div>
                        
                    <div
                        style={{ display: "float" }}
                    >

                    <Button 
                        sx={
                            { m: 3, pt: 2, pb:2 , pl: 10, pr: 10 }
                        }

                    style={
                        { 
                            textAlign: "center", 
                            whiteSpace: "nowrap", 
                            color:"blue", 
                            borderColor:"blue",
                            float:"right"
                        }
                    }

                    size="large"
                    variant="outlined"
                    onClick={handleDeleteConfirmClose}
                    >
                        Cancel
                    </Button>

                    </div>
                </Dialog>

                </Box>
            </Modal>
        </div>
    );
}

export default FormDialogEditClient;
