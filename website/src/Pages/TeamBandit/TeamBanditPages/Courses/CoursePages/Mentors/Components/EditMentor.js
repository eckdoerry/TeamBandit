import React, {useState} from "react";

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
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

const EditMentor = ({courseInfo, mentor, setRowChange}) => {
    
    // Variables 
    const [mentor_name, setMentorName] = useState(mentor.mentor_name);
    const [mentor_email, setMentorEmail] = useState(mentor.mentor_email);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMentorName(mentor.mentor_name);
        setMentorEmail(mentor.mentor_email);
    };

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleConfirmDelete = () => {
        handleDeleteConfirmClose();
        deleteMentor(mentor.mentor_id);
    };

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    // Delete function
    const deleteMentor= async (id) => {
        try {

            await fetch(`${process.env.REACT_APP_BASEURL}/mentors/mentors/${id}/${courseInfo.course_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });


            toast.success("Mentor was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete mentor!");
        }
    }

    //edit description function
    const updateMentor = async e => {
        e.preventDefault();
        try {
            const body = {mentor_name, mentor_email};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/mentors/mentors/${mentor.mentor_id}`, {method: "PUT", headers: myHeaders, body: JSON.stringify(body)});

            toast.success("Mentor was successfully updated!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update mentor!");
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
                            Edit Mentor
                        </Typography>
                    </Box>
                
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Fill out the forms you would like to change:
                </Typography>
                
                        
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Mentor Name" type = "text" value = {mentor_name} onChange = {e => setMentorName(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Mentor Email" type = "text" value = {mentor_email} onChange = {e => setMentorEmail(e.target.value)}/>
                <Button sx={{ m: 2 }} variant="contained" color="warning" onClick = {(e) => (handleClose(), updateMentor(e))}> Edit </Button>
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose}> Cancel </Button>
                <Button variant="outlined" color="error" onClick={handleDeleteConfirmOpen} startIcon={<DeleteIcon />}> PERMANENTLY DELETE </Button>

                <Dialog 
                    open={deleteConfirmOpen}
                    onClose={handleClose}
                    fullWidth
                >

                    <DialogTitle>
                        Delete Mentor
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
                        Are you sure you want to delete this mentor?
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
                        Delete Mentor
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

export default EditMentor;
