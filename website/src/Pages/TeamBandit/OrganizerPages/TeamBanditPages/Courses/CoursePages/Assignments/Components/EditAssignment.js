import React, { Fragment, useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

const EditAssignment = ({ assignment, setRowChange }) => {

    // Variables
    const [assignment_name, setAssignmentName] = useState("");
    const [assignment_description, setAssignmentDescription] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setAssignmentName(assignment.assignment_name);
        setAssignmentDescription(assignment.assignment_description);
    };
    const handleClose = () => {
        setOpen(false);
        setAssignmentName(assignment.assignment_name);
        setAssignmentDescription(assignment.assignment_description);
    };

    const updateAssignment = async (e) => {
        e.preventDefault();
        try {
            
            const body = {
                assignment_name,
                assignment_description
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/editAssignment/${assignment.assignment_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            toast.success("Assignment was successfully updated!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update assignment!");
        }
    };

    // Delete function
    const deleteAssignment = async (id) => {
        try {
            await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/deleteAssignment/${id}/`,
                {
                    method: "DELETE",
                    headers: { token: localStorage.token },
                }
            );

            toast.success("Assignment was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete assignment!");
        }
    };

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
                            Edit Assignment
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom >* You can leave Mentor, Sponsor, PDF, and Team Lead fields blank if you don't want them changed.</Typography>
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

                    <Typography>Assignment Description</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Assignment Description"
                        type="text"
                        value={assignment_description}
                        onChange={(e) => setAssignmentDescription(e.target.value)}
                    />

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="warning"
                        onClick={(e) => (handleClose(), updateAssignment(e))}
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
                    <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteAssignment(assignment.assignment_id)}
                    startIcon={<DeleteIcon />}
                >
                    {" "}
                    PERMANENTLY DELETE{" "}
                </Button>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default EditAssignment;
