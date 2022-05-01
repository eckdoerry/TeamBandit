import {React, useState, useEffect} from 'react'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

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

const StudentUploadAssignment = ({setRowChange, assignment, userInfo}) => {
    const [student_assignment_upload, setStudentAssignmentUpload] = useState(null);
    const [team_id, setTeamId] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setStudentAssignmentUpload(null);
    };

    const onFileChange = (e) => {
        setStudentAssignmentUpload(e.target.files[0]); 
    }

    const getTeamId = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/teams/getTeamId/${userInfo.student_id}`, {
                method: "GET",
                headers: {myHeaders},
            });

            const jsonData = await response.json()
            setTeamId(jsonData.team_id);

        } catch (error) {
            console.error(error.message);
        }
    };

    const uploadStudentAssignment = async (event, assignment_id) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("student_assignment_upload", student_assignment_upload);
            formData.append("assignment_id", assignment_id);
        
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/assignments/uploadStudentAssignment`, {
                method: "POST",
                headers: myHeaders,
                body: formData,
            });

            toast.success(await response.json());

            setStudentAssignmentUpload(null);
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add assignment!");
        }
    };

    const uploadTeamAssignment = async (event, assignment_id) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("student_assignment_upload", student_assignment_upload);
            formData.append("assignment_id", assignment_id);
            formData.append("team_id", team_id);
        
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/assignments/uploadTeamAssignment`, {
                method: "POST",
                headers: myHeaders,
                body: formData,
            });

            toast.success(await response.json());
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add assignment!");
        }
    };

    const isBeforeDueDate = () => {
        var dateNow = Date.now();
        var dueDate = Date.parse(assignment.assignment_due_date.split("T"));
        return ((dueDate - dateNow) > 0) ? true : false;
    }

    useEffect(() => {
        getTeamId();
    }, []);

    return (
        <div>
            <Button
                sx={{ m: 1 }}
                variant="outlined"
                color="success"
                onClick={handleOpen}
            >
                {" "}
                Upload Assignment{" "}
            </Button>
            {(isBeforeDueDate() === true || assignment.allow_submissions_after_due === true) ?
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Upload Your {assignment.assignment_name}
                        </Typography>
                        {assignment.allow_submissions_after_due ?
                            <Typography variant="p">
                                *This assignment allows late submissions
                            </Typography>
                            :
                            <Typography variant="p">
                                *This assignment does not allow late submissions
                            </Typography>
                        }
                    </Box>

                    <form encType="multipart/form-data">
                        <input type="file" accept="application/pdf" name="student_assignment_upload" onChange={onFileChange}/>
                    </form>

                    {assignment.submission_type === "Individual" &&
                        <Button
                            sx={{ m: 3 }}
                            variant="contained"
                            color="success"
                            onClick={(e) => (handleClose(), uploadStudentAssignment(e, assignment.assignment_id))}
                            startIcon={<AddIcon />}
                        >
                            {" "}
                            Upload{" "}
                        </Button>
                    }
                    {assignment.submission_type === "Team" &&
                        <Button
                            sx={{ m: 3 }}
                            variant="contained"
                            color="success"
                            onClick={(e) => (handleClose(), uploadTeamAssignment(e, assignment.assignment_id))}
                            startIcon={<AddIcon />}
                        >
                            {" "}
                            Upload Team Assignment{" "}
                        </Button>
                    }

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
                </Box>
            </Modal>
            : 
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
                            This assignment is no longer accepting submissions
                        </Typography>
                    </Box>
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
                </Box>
            </Modal>
            }
        </div>
    )
}

export default StudentUploadAssignment