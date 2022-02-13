import React, {Fragment, useState, useEffect} from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import { toast } from 'react-toastify';


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

const EditProject = ({project, setRowChange, courseInfo}) => {
        // Variables 
    const [project_name, setProjectName] = useState(project.project_name);
    const [project_description, setProjectDescription] = useState(project.project_description);
    const [project_members, setProjectMembers] = useState([project.project_member1, project.project_member2, project.project_member3, project.project_member4]);
    const [project_mentor, setProjectMentor] = useState(project.project_mentor);
    const [project_sponsor, setProjectSponsor] = useState(project.project_sponsor);

    // Value change 
    const [valueChange, setValueChange] = useState(false);

    // Variables for drop downs
    const [students, setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [clients, setClients] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setProjectName(project.project_name);
        setProjectDescription(project.project_description);
        setProjectMembers([project.project_member1, project.project_member2, project.project_member3, project.project_member4]);
        setProjectMentor(project.project_mentor);
        setProjectSponsor(project.project_sponsor);
    };

    const updateProject = async e => {
        e.preventDefault();
        try {
            const body = {project_name};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(`http://localhost:5000/projects/projects/${project.project_id}`, {method: "PUT", headers: myHeaders, body: JSON.stringify(body)});

            toast.success("Student was successfully updated!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update student!");
        }
    };

    const handleChangeTeamMembers= (event) => {
        const {
        target: { value },
        } = event;
        setProjectMembers(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeTeamMentor = (event) => {
        const {
        target: { value },
        } = event;
        setProjectMentor(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeProjectSponsor = (event) => {
        const {
        target: { value },
        } = event;
        setProjectSponsor(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const getStudents = async () => {
        try {
            const response = await fetch(`http://localhost:5000/students/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setStudents(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };

    const getMentors = async () => {
        try {
            const response = await fetch(`http://localhost:5000/mentors/`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
            
            setMentors(jsonData);
                
        } catch (err) {
            console.error(err.message);
        }
    };

    const getClients = async () => {
        try {
            const response = await fetch(`http://localhost:5000/clients/`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
            
            setClients(jsonData);
                
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        updateProject();
        getStudents();
        getMentors();
        getClients();
        setValueChange(false);
    }, [valueChange]);
    

    return (
        <Fragment>
        <Button sx={{ m: 3 }} variant="outlined" color="warning"  onClick={handleOpen} startIcon={<EditIcon />} > Edit </Button>
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
                            Project Name
                    </Typography>
                    <TextField fullWidth sx={{ m: 2 }} label="Project Name" type = "text" value = {project_name} onChange = {e => setProjectName(e.target.value)}/>
                
                    <Typography>
                            Project Description
                    </Typography>
                    <TextField fullWidth sx={{ m: 2 }} label="Project Description" type = "text" value = {project_description} onChange = {e => setProjectDescription(e.target.value)}/>
                    
                    <Typography>
                            Team Members
                    </Typography>
                <Select
                sx={{ m: 2 }}
                multiple
                fullWidth
                displayEmpty
                value={project_members}
                onChange={handleChangeTeamMembers}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    var string = "";
                    if (selected.length === 0) {
                    return <em>Team Members (Select up to Four)</em>;
                    }
                    for(var i = 0; i < selected.length; i++)
                    {
                        string += selected[i].student_fname + " " + selected[i].student_lname;
                        if(i + 1 !== selected.length)
                        {
                            string += ", ";
                        }
                    }
                    return string;
                    
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem disabled value="">
                    <em>Team Members</em>
                </MenuItem>
                {students.map((student) => (
                    <MenuItem
                    key={student.student_id}
                    value={student}
                    
                    >
                    {student.student_fname} {student.student_lname}
                    </MenuItem>
                ))}
                </Select>

                <Typography >
                            Team Mentor
                        </Typography>
                <Select
                sx={{ m: 2 }}
                displayEmpty
                fullWidth
                value={project_mentor}
                onChange={handleChangeTeamMentor}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <em>Team Mentor</em>;
                    }
                    return selected.mentor_name;
                    
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem disabled value="">
                    <em>Team Mentor</em>
                </MenuItem>
                {mentors.map((mentor) => (
                    <MenuItem
                    key={mentor.mentor_id}
                    value={mentor}
                    
                    >
                    {mentor.mentor_name}
                    </MenuItem>
                ))}
                </Select>

                <Typography >
                            Project Sponsor
                        </Typography>
                <Select
                sx={{ m: 2 }}
                displayEmpty
                fullWidth
                value={project_sponsor}
                onChange={handleChangeProjectSponsor}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <em>Project Sponsor</em>;
                    }
                    return selected.client_name;
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem disabled value="">
                    <em>Project Sponsor</em>
                </MenuItem>
                {clients.map((client) => (
                    <MenuItem
                    key={client.client_id}
                    value={client}
                    >
                    {client.client_name}
                    </MenuItem>
                ))}
                </Select>
                        
                <Button sx={{ m: 3 }} variant="contained" color="warning"  onClick={(e) => (handleClose(), EditProject(e))} startIcon={<EditIcon />} > Edit </Button>     
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose} startIcon={<CloseIcon/>}> Close </Button>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default EditProject;