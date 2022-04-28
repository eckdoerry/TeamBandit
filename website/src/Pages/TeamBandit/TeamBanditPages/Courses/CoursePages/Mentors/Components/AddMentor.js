import React, {Fragment, useState, useEffect} from "react";
import { toast } from 'react-toastify';

// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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

const AddMentor = ({courseInfo, setRowChange}) => {
    // Variables 
    const [mentor_name, setMentorName] = useState("");
    const [mentor_email, setMentorEmail] = useState("");

    // Value change 
    const [valueChange, setValueChange] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const addMentor = async (event) => {
        event.preventDefault();
        try {

            var courseId = courseInfo.course_id;

            const body = {mentor_name, mentor_email, courseId};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
            
            await fetch(`${process.env.REACT_APP_BASEURL}/mentors/mentors`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            toast.success("Mentor was added successfully!");
            setMentorName("");
            setMentorEmail("");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add mentor!");
        }
    }

    useEffect(() => {
        setValueChange(false);
    }, [valueChange]);

    return (
        <Fragment>
        <Button sx={{ m: 3 }} variant="outlined" color="success"  onClick={handleOpen} startIcon={<AddIcon />} > Add </Button>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Project
                        </Typography>
                    </Box>
                    <Typography>
                            Mentor Name
                    </Typography>
                    <TextField fullWidth sx={{ m: 2 }} label="Mentor Name" type = "text" value = {mentor_name} onChange = {e => setMentorName(e.target.value)}/>
                    <Typography>
                            Mentor Email
                    </Typography>
                    <TextField fullWidth sx={{ m: 2 }} label="Mentor Email" type = "text" value = {mentor_email} onChange = {e => setMentorEmail(e.target.value)}/>        
                <Button sx={{ m: 3 }} variant="contained" color="success"  onClick={(e) => (handleClose(), addMentor(e))} startIcon={<AddIcon/>} > Add </Button>        
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose} startIcon={<CloseIcon/>}> Cancel </Button>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default AddMentor;