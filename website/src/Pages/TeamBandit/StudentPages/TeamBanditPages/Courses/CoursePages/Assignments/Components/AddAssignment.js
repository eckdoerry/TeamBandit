import React, { Fragment, useState } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";

import { toast } from "react-toastify";

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

const submissionTypes = [
    {
      value: 'Team',
      label: 'Team',
    },
    {
      value: 'Individual',
      label: 'Individual',
    },
  ];

const AddAssignment = ({ courseInfo, rows, setRowChange }) => {
    // Variables
    const [assignment_name, setAssignmentName] = useState("");
    const [assignment_due_date, setAssignmentDueDate] = useState("");
    const [assignment_description, setAssignmentDescription] = useState("");
    const [submission_type, setSubmissionType] = useState("");
    const [assignment_instructions, setAssignmentInstructions] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAssignmentName("");
        setAssignmentDueDate("");
        setAssignmentDescription("");
        setSubmissionType("");
        setAssignmentInstructions(null);
    };

    const handleSubmissionTypeChange = (e) => {
        setSubmissionType(e.target.value);
    }

    const onFileChange = (e) => {
        setAssignmentInstructions(e.target.files[0]); 
    }

    const addAssignment = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("assignmentInstructions", assignment_instructions);
            formData.append("assignment_name", assignment_name);
            formData.append("assignment_due_date", assignment_due_date);
            formData.append("assignment_description", assignment_description);
            formData.append("submission_type", submission_type);
            formData.append("course_id", courseInfo.course_id);
        
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            await fetch(`${process.env.REACT_APP_BASEURL}/assignments/addAssignment`, {
                method: "POST",
                headers: myHeaders,
                body: formData,
            });

            toast.success("Assignment was added successfully!");
            setAssignmentName("");
            setAssignmentDueDate("");
            setAssignmentDescription("");
            setSubmissionType("");
            setAssignmentInstructions(null);
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add assignment!");
        }
    };

    return (
        <Fragment>
            <Button
                sx={{ m: 3 }}
                variant="outlined"
                color="success"
                onClick={handleOpen}
                startIcon={<AddIcon />}
            >
                {" "}
                Add{" "}
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
                            Add Assignment
                        </Typography>
                    </Box>

                    <Typography>Assignment Name</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Assignment Name"
                        type="text"
                        value={assignment_name}
                        onChange={(e) => setAssignmentName(e.target.value)}
                    />

                    <Typography>Assignment Due Date</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        type="datetime-local"
                        value={assignment_due_date}
                        onChange={(e) => setAssignmentDueDate(e.target.value.toString())}
                    />

                    <Typography>Assignment Description</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Assignment Description"
                        type="text"
                        value={assignment_description}
                        onChange={(e) => setAssignmentDescription(e.target.value)}
                    />

                    <Typography>Submission Type</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        select
                        label="Submission Type"
                        value={submission_type}
                        onChange={handleSubmissionTypeChange}
                        >
                        {submissionTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Typography>Upload Assignment PDF Instructions</Typography>
                    <form encType="multipart/form-data">
                        <input type="file" accept="application/pdf" name="assignmentInstructions" onChange={onFileChange}/>
                    </form>

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="success"
                        onClick={(e) => (handleClose(), addAssignment(e))}
                        startIcon={<AddIcon />}
                    >
                        {" "}
                        Add{" "}
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

export default AddAssignment;
