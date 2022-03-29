import {React, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SubmittedAssignmentsDownload from './SubmittedAssignmentsDownload';
import { Link } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SubmittedAssignmentsModal = ({assignment}) => {
    const [assignments, setAssignments] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getAssignments = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/submittedAssignments/${assignment.assignment_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();
            setAssignments(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAssignments();
    }, []);

    return (
        <div>
            <Button sx={{ m: 1 }}
                variant="contained"
                color="success"
                onClick={handleOpen}>View Submissions
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="p">
                        All Submissions
                    </Typography>
                    <div style={{height: "80%", width:"100%", border: "1px solid black", overflow: "auto"}}>
                        {assignments.map((assignment) => 
                            <Link
                                key={assignment.submission_id}
                                target="_blank"
                                to={`/submission/${assignment.submission}-${assignment.submission_id}`}
                                >
                                    <p>{assignment.submission}</p>
                            </Link>
                        )}
                    </div>
                    <Typography variant="p">
                        Download All Above Submissions
                    </Typography>
                    <SubmittedAssignmentsDownload assignment={assignment}/>
                </Box>
            </Modal>
        </div>
    );
}

export default SubmittedAssignmentsModal