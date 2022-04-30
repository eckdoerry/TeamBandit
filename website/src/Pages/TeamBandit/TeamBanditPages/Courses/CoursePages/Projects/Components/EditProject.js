import React, { Fragment, useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {Delete} from "@mui/icons-material";

import { toast } from "react-toastify";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const EditProject = ({ project, setRowChange, courseInfo }) => {

    // Variables
    const [project_name, setProjectName] = useState(project.project_name);
    const [project_mentor, setProjectMentor] = useState("");
    const [project_sponsor, setProjectSponsor] = useState("");
    const [team_lead, setTeamLead] = useState("");
    
    const [project_overview, setProjectOverview] = useState(null);

    // Value change
    const [valueChange, setValueChange] = useState(false);
    const [studentsChange, setStudentsChange] = useState(false);

    // Variables for drop downs
    const [mentors, setMentors] = useState([]);
    const [clients, setClients] = useState([]);
    const [allAssignedStudents, setAllAssignedStudents] = useState([]);
    const [students, setStudents] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setProjectName(project.project_name);
        setProjectMentor("");
        setProjectSponsor("");
        setTeamLead("");
    };

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleConfirmDelete = () => {
        handleDeleteConfirmClose();
        deleteProject(project.project_id);
    };

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    const onFileChange = (e) => {
        setProjectOverview(e.target.files[0]); 
    }

    const updateStudents =  () => {
        const studentsOnTeam = [];
            
            
    }

    const updateProjectOverview = async (e) => {
        e.preventDefault();
        if (!project_overview)
        {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("projectOverview", project_overview);
  
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/projectOverview/${project.project_id}`, {method: "PUT", body: formData, headers: myHeaders});
  
            toast.success(await response.json());
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
      };

    const updateProject = async (e) => {
        e.preventDefault();
        try {

            var projectMentor = "";
            var projectSponsor = "";
            var teamLead = "";

            if( project_mentor === "")
            {
                projectMentor = project.mentor_id;
            }
            else
            {
                projectMentor = getMentorId(project_mentor);
            }

            if( project_sponsor === "")
            {
                projectSponsor = project.client_id;
            }
            else
            {
                projectSponsor = getClientId(project_sponsor);
            }

            if( team_lead === "")
            {
                teamLead = project.team_lead;
            }
            else
            {
                teamLead = getTeamLeadId(team_lead);
            }

            

            const body = {
                project_name,
                projectMentor,
                projectSponsor,
                teamLead
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/projects/${project.project_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            toast.success("Project was successfully updated!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update project!");
        }
    };

    const getMentorId = (mentor_name) => {
        
        for(var i = 0; i < mentors.length; i++)
        {
            if( mentors[i].mentor_name == mentor_name)
            {
                return mentors[i].mentor_id;
            }
        }
        return -1;
    };

    const getClientId = (client_name) => {
        
        for(var i = 0; i < clients.length; i++)
        {
            
            if( `${clients[i].client_fname} ${clients[i].client_lname}` == client_name)
            {
                return clients[i].client_id;
            }
        }
        return -1;
    };

    const getTeamLeadId = (team_lead) => {
        
        for(var i = 0; i < allAssignedStudents.length; i++)
        {
            
            if( `${allAssignedStudents[i].student_fname} ${allAssignedStudents[i].student_lname}` == team_lead)
            {
                return allAssignedStudents[i].student_id;
            }
        }
        return null;
    };

    const handleChangeTeamMentor = (event) => {
        const {
            target: { value },
        } = event;
        setProjectMentor(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleChangeProjectSponsor = (event) => {
        const {
            target: { value },
        } = event;
        setProjectSponsor(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleChangeTeamLead = (event) => {
        const {
            target: { value },
        } = event;
        setTeamLead(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const getMentors = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/mentors/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setMentors(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getClients = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/clients/`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setClients(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getStudents = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/getAssignedStudents/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();
            

            ;
            var studentsOnTeam = [];

            for(var i = 0; i < jsonData.length; i++)
            {
                if(jsonData[i].project_id === project.project_id)
                {
                    studentsOnTeam.push(`${jsonData[i].student_fname} ${jsonData[i].student_lname}`)
                }
            }

            setStudents(studentsOnTeam);
            setAllAssignedStudents(jsonData);
            
            
        } catch (err) {
            console.error(err.message);
        }
        
    };

    // Delete function
    const deleteProject = async (id) => {
        try {
            await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/projects/${id}/`,
                {
                    method: "DELETE",
                    headers: { token: localStorage.token },
                }
            );

            toast.success("Project was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete project!");
        }
    };

    useEffect(() => {
        getMentors();
        getClients();
        getStudents();
        
        setValueChange(false);
    }, [valueChange]);

    return (
        <Fragment>
            <EditIcon style={{cursor: 'pointer', color: '#f57c00', alignItems:'center', justifyContent: 'center'}} onClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit Project
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom >* You can leave Mentor, Sponsor, PDF, and Team Lead fields blank if you don't want them changed.</Typography>
                    </Box>

                    <Typography>Project Name</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Project Name"
                        type="text"
                        value={project_name}
                        onChange={(e) => setProjectName(e.target.value)}
                    />


                    <Typography>Team Mentor</Typography>
                    <Select
                        sx={{ m: 2 }}
                        displayEmpty
                        fullWidth
                        value={project_mentor}
                        onChange={handleChangeTeamMentor}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if(selected === null)
                            {
                                return;
                            }
                            if (selected.length === 0) {
                                return <em>Team Mentor</em>;
                            }
                            return selected;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem disabled value="">
                            <em>Team Mentor</em>
                        </MenuItem>
                        {mentors.map((mentor) => (
                            <MenuItem key={mentor.mentor_id} value={mentor.mentor_name}>
                                {mentor.mentor_name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography>Project Sponsor</Typography>
                    <Select
                        sx={{ m: 2 }}
                        displayEmpty
                        fullWidth
                        value={project_sponsor}
                        onChange={handleChangeProjectSponsor}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if(selected === null)
                            {
                                return;
                            }
                            if (selected.length === 0) {
                                return <em>Project Sponsor</em>;
                            }
                            return selected;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem disabled value="">
                            <em>Project Sponsor</em>
                        </MenuItem>
                        {clients.map((client) => (
                            <MenuItem key={client.client_id} value={`${client.client_fname} ${client.client_lname}`}>
                                {client.client_fname} {client.client_lname}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography>Team Lead</Typography>
                    <Select
                        sx={{ m: 2 }}
                        displayEmpty
                        fullWidth
                        value={team_lead}
                        onChange={handleChangeTeamLead}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if(selected === null)
                            {
                                return;
                            }
                            if (selected.length === 0) {
                                return <em>Team Lead</em>;
                            }
                            return selected;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem disabled value="">
                            <em>Team Lead</em>
                        </MenuItem>
                        {students.map((student) => (
                            <MenuItem key={student} value={student}>
                                {student}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography>Upload Project PDF Description</Typography>
                    <form encType="multipart/form-data">
                        <input type="file" accept="application/pdf" name="projectOverview" onChange={onFileChange}/>
                    </form>

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="warning"
                        onClick={(e) => (handleClose(), updateProject(e), updateProjectOverview(e))}
                        startIcon={<EditIcon />}
                    >
                        {" "}
                        Save{" "}
                    </Button>
                    <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                    >
                        {" "}
                        Cancel{" "}
                    </Button>
                    <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteConfirmOpen}
                    startIcon={<DeleteIcon />}
                >
                    {" "}
                    PERMANENTLY DELETE PROJECT
                    {" "}
                </Button>

                <Dialog 
                    open={deleteConfirmOpen}
                    onClose={handleClose}
                    fullWidth
                >

                    <DialogTitle>
                        Delete Project
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
                        Are you sure you want to delete this project forever?
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
                        Delete Project Forever
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
        </Fragment>
    );
};

export default EditProject;
