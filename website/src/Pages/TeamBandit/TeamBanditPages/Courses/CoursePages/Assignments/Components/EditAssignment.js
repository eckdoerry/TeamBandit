import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Delete} from "@mui/icons-material";

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
    const [assignment_start_date, setAssignmentStartDate] = useState("");
    const [assignment_due_date, setAssignmentDueDate] = useState("");
    const [assignment_instructions, setAssignmentInstructions] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setAssignmentName(assignment.assignment_name);
        setAssignmentStartDate(assignment.assignment_start_date);
        setAssignmentDueDate(assignment.assignment_due_date);
        setAssignmentInstructions(null);
    };
    const handleClose = () => {
        setOpen(false);
    };
  
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleConfirmDelete = () => {
        handleDeleteConfirmClose();
        deleteAssignment(assignment.assignment_id);
    };

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };
  
    const onFileChange = (e) => {
        setAssignmentInstructions(e.target.files[0]); 
    }

    const updateAssignmentInstructions = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("assignmentInstructions", assignment_instructions);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/assignmentInstructions/${assignment.assignment_id}`, {method: "PUT", body: formData, headers: myHeaders});
  
            setRowChange(true);

        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update assignment!");
        }
    }

    const updateAssignment = async (e) => {
        e.preventDefault();
        try {
            const body = {
                assignment_name,
                assignment_start_date,
                assignment_due_date
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

            toast.success("Assignment information was successfully updated!");
            
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
        <div>
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
                            Edit Assignment
                        </Typography>
                    </Box>

                    <Typography>Assignment Start Date</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        type="datetime-local"
                        value={assignment_start_date}
                        onChange={(e) => setAssignmentStartDate(e.target.value)}
                    />

                    <Typography>Assignment Due Date</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        type="datetime-local"
                        value={assignment_due_date}
                        onChange={(e) => setAssignmentDueDate(e.target.value)}
                    />

                    <Typography>Assignment Name</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Assignment Name"
                        type="text"
                        value={assignment_name}
                        onChange={(e) => setAssignmentName(e.target.value)}
                    />

                    <Typography>Upload Assignment PDF Instructions</Typography>
                    <form encType="multipart/form-data">
                        <input type="file" accept="application/pdf" name="assignmentInstructions" onChange={onFileChange}/>
                    </form>

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="warning"
                        onClick={(e) => (handleClose(), updateAssignment(e), updateAssignmentInstructions(e))}
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
                    Delete Assignment
                    {" "}
                </Button>

                <Dialog 
                    open={deleteConfirmOpen}
                    onClose={handleClose}
                    fullWidth
                >

                    <DialogTitle>
                        Delete Assignment
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
                        Are you sure you want to delete this assignment? This will delete ALL student submissions for this assignment.
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
                        Delete Assignment
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
};

export default EditAssignment;
