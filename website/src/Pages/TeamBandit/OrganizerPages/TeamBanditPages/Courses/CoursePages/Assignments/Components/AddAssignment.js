import React, { Fragment, useState, useEffect } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

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

const AddAssignment = ({ courseInfo, rows, setRowChange }) => {
    // Variables
    const [assignment_name, setAssignmentName] = useState("");
    const [assignment_due_date, setAssignmentDueDate] = useState("");
    const [assignment_description, setAssignmentDescription] = useState("");
    const [assignment_instructions, setAssignmentInstructions] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const onFileChange = (e) => {
        setAssignmentInstructions(e.target.files[0]); 
    }

    const addAssignment = async (event) => {
        event.preventDefault();
        try {
            
            var courseId = courseInfo.course_id;

            const body = {
                assignment_name,
                assignment_due_date,
                assignment_description,
                assignment_instructions,
                courseId
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(`${process.env.REACT_APP_BASEURL}/assignments/addAssignment`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            });

            toast.success("Assignment was added successfully!");
            setAssignmentName("");
            setAssignmentDueDate("");
            setAssignmentDescription("");
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

                    <Typography>Upload Assignment PDF Instructions (DON'T USE)</Typography>
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
