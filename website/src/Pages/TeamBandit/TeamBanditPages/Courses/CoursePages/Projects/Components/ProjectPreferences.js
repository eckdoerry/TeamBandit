import {React, useState, useEffect} from "react";

//MUI Import
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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

const ProjectPreferences = ({userInfo, rows, setRowChange, courseInfo}) => {
    const [pref1, setPref1] = useState(userInfo.student_projectpref1);
    const [pref2, setPref2] = useState(userInfo.student_projectpref2);
    const [pref3, setPref3] = useState(userInfo.student_projectpref3);
    const [pref4, setPref4] = useState(userInfo.student_projectpref4);
    const [pref5, setPref5] = useState(userInfo.student_projectpref5);
    const [prefUpdate, setPrefUpdate] = useState(false);

    const handleChange1 = (event) => {
        setPref1(event.target.value);
    };

    const handleChange2 = (event) => {
        setPref2(event.target.value);
    };

    const handleChange3 = (event) => {
        setPref3(event.target.value);
    };

    const handleChange4 = (event) => {
        setPref4(event.target.value);
    };

    const handleChange5 = (event) => {
        setPref5(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Reset Preferences
    };

    const updatePreferences = async () => {
        
        try {

            const body = {
                pref1,
                pref2,
                pref3,
                pref4,
                pref5
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(
                `${process.env.REACT_APP_BASEURL}/students/preferences/${userInfo.student_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            toast.success("Preferences were successfully updated!");
            setPrefUpdate(true);
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update project!");
        }
    };

    useEffect(() => {
        setPrefUpdate(false);
    }, [prefUpdate]);
    
    return(
        <div>
            {courseInfo.project_prefs && <Button style={{textAlign: 'center', whiteSpace: 'nowrap'}} sx={{ m: 3 }} variant="outlined" color="secondary" startIcon={<AssignmentIcon />} onClick = {handleOpen}> Project Preferences </Button>}
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Project Preferences
                        </Typography>
                    </Box>
                
                    <Typography variant="h7">Select Project Preference:</Typography>
            <div>
            
                <InputLabel id="pref1"> First Choice </InputLabel>
                <Select
                    labelId="pref1"
                    id = "preferenceSelect1"
                    value = {pref1}
                    fullWidth
                    label ="Preference1"
                    onChange={handleChange1}
                >
                    {rows.map( (project) => <MenuItem key = {project.project_id} value={project.project_id}> {project.project_name}</MenuItem>)}
                </Select>
                <InputLabel id="pref2"> Second Choice </InputLabel>
                <Select
                    labelId="pref2"
                    id = "preferenceSelect2"
                    value = {pref2}
                    fullWidth
                    label ="Preference2"
                    onChange={handleChange2}
                >
                    {rows.map( (project) => <MenuItem key = {project.project_id} value={project.project_id}> {project.project_name}</MenuItem>)}
                </Select>
                <InputLabel id="pref3"> Third Choice </InputLabel>
                <Select
                    labelId="pref3"
                    id = "preferenceSelect3"
                    value = {pref3}
                    fullWidth
                    label ="Preference3"
                    onChange={handleChange3}
                >
                    {rows.map( (project) => <MenuItem key = {project.project_id} value={project.project_id}> {project.project_name}</MenuItem>)}
                </Select>
                <InputLabel id="pref4"> Fourth Choice </InputLabel>
                <Select
                    labelId="pref4"
                    id = "preferenceSelect4"
                    value = {pref4}
                    fullWidth
                    label ="Preference4"
                    onChange={handleChange4}
                >
                    {rows.map( (project) => <MenuItem key = {project.project_id} value={project.project_id}> {project.project_name}</MenuItem>)}
                </Select>
                <InputLabel id="pref5"> Fifth Choice </InputLabel>
                <Select
                    labelId="pref5"
                    id = "preferenceSelect5"
                    value = {pref5}
                    fullWidth
                    label ="Preference5"
                    onChange={handleChange5}
                >
                    {rows.map( (project) => <MenuItem key = {project.project_id} value={project.project_id}> {project.project_name}</MenuItem>)}
                </Select>
            
            </div>       
                <Button sx={{ m: 2 }} variant="contained" color="warning" onClick = {(e) => (handleClose(), updatePreferences(e))}> Save </Button>
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose}> Cancel </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ProjectPreferences;