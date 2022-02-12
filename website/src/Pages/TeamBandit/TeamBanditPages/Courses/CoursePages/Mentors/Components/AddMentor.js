import React, {Fragment, useState, useEffect} from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';


// Need this to change color schemes
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { toast } from 'react-toastify';

// Idk really, but need it for something I guess
import { styled } from '@mui/material/styles';

import styles from '../../Projects/projects.module.css';
import { getScopedCssBaselineUtilityClass } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

// need to make a theme so I can use custom colors for Material UI
const theme = createTheme({
    palette: {
    sameBlue: {
        // Same blue as text for button
        main: '#003466',
    },
    },
});

const DialogBig = {
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
};

const Input = styled('input')({
    display: 'none',
});



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

    const handleToggle = () => {
        setOpen(!open);
    };


    const addMentor = async (event) => {
        event.preventDefault();
        try {


            var courseId = courseInfo.course_id;
            var mentorName = mentor_name;
            var mentorEmail = mentor_email;

            const body = {mentor_name, mentor_email, courseId};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
            
            const response = await fetch("http://localhost:5000/mentors/mentors", {
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

    const theme = useTheme();

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
  
                        
                <Button sx={{ m: 3 }} variant="contained" color="success"  onClick={(e) => (handleClose(), addMentor(e))} startIcon={<AddIcon />} > Add </Button>        
                        
                        
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose} startIcon={<CloseIcon/>}> Close </Button>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default AddMentor;