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
import EditIcon from "@mui/icons-material/Edit";

import { toast } from "react-toastify";

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
    const [project_short_name, setProjectShortName] = useState(
        project.project_short_name
    );
    const [project_mentor, setProjectMentor] = useState("");
    const [project_sponsor, setProjectSponsor] = useState(
        ""
    );
    const [project_overview, setProjectOverview] = useState(null);

    // Value change
    const [valueChange, setValueChange] = useState(false);

    // Variables for drop downs
    const [mentors, setMentors] = useState([]);
    const [clients, setClients] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setProjectName(project.project_name);
        setProjectShortName(project.project_short_name);
        setProjectMentor(project.project_mentor);
        setProjectSponsor(project.project_sponsor);
    };

    const onFileChange = (e) => {
        setProjectOverview(e.target.files[0]); 
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
            const body = {
                project_name,
                project_short_name,
                project_mentor,
                project_sponsor,
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

    useEffect(() => {
        getMentors();
        getClients();
        setValueChange(false);
    }, [valueChange]);

    return (
        <Fragment>
            <Button
                sx={{ m: 3 }}
                variant="outlined"
                color="warning"
                onClick={handleOpen}
                startIcon={<EditIcon />}
            >
                {" "}
                Edit{" "}
            </Button>
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
                            Add Project
                        </Typography>
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

                    <Typography>Project Short Name</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Project Short Name"
                        type="text"
                        value={project_short_name}
                        onChange={(e) => setProjectShortName(e.target.value)}
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
                            if (selected.length === 0) {
                                return <em>Project abstract</em>;
                            }
                            return selected.mentor_name;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem disabled value="">
                            <em>Project death</em>
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
                            if (selected.length === 0) {
                                return <em>Project Sponsor</em>;
                            }
                            return selected.client_fname;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem disabled value="">
                            <em>Project Sponsor</em>
                        </MenuItem>
                        {clients.map((client) => (
                            <MenuItem key={client.client_id} value={client.client_fname}>
                                {client.client_fname}
                            </MenuItem>
                        ))}
                    </Select>

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
                        Edit{" "}
                    </Button>
                    <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                    >
                        {" "}
                        Close{" "}
                    </Button>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default EditProject;
