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
    width: '60%',
    height: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SubmittedAssignmentsModal = ({assignment, courseInfo}) => {
    const [submissions, setSubmissions] = useState([]);
    const [open, setOpen] = useState(false);
    const [total_students, setTotalStudents] = useState(0);
    const [total_teams, setTotalTeams] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getAssignments = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/submittedAssignments/${assignment.assignment_id}`,
                { method: "GET", headers: myHeaders }
            );
            const jsonData = await response.json();
            setSubmissions(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTotalStudents = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/student-total/${courseInfo.course_id}`,
                { method: "GET", headers: myHeaders }
            );

            setTotalStudents((await response.json()).length);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTotalTeams = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/team-total/${courseInfo.course_id}`,
                { method: "GET", headers: myHeaders }
            );

            setTotalTeams((await response.json()).length);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAssignments();
        getTotalStudents();
        getTotalTeams();
    }, []);

    return (
        <div>
            <Button sx={{ m: 1 }}
                variant="contained"
                color="success"
                onClick={handleOpen}>{assignment.submission_type === "Individual" ? submissions.length.toString() + "/" + total_students : submissions.length.toString() + "/" + total_teams} Submissions
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Typography variant="p">
                            All Submissions (Click link to view submission)
                        </Typography>
                        {assignment.allow_submissions_after_due &&
                            <Typography variant="p">
                                *This assignment allows late submissions
                            </Typography>
                        }
                    </div>
                    <div style={{height: "80%", width:"100%", border: "1px solid black", overflow: "auto"}}>
                        {((submissions.length > 0) === true) ?
                        submissions.map((assignment) =>
                            <div key={assignment.submission_id} style={{display: "flex", flexDirection: "row", gap: "5px"}}>
                                <Link
                                    target="_blank"
                                    to={`/submission/studentAssignment-${assignment.submission_id}`}
                                    >
                                        {assignment.team_id == null ?
                                            <p>{assignment.student_fname + " " + assignment.student_lname}</p>
                                            : <p>{assignment.team_name}</p>
                                        }
                                </Link>
                                <p><i>on</i> {assignment.submission_time.split(",")[0]} <i>at</i> {assignment.submission_time.split(",")[1]} MST</p>
                            </div>
                        ) : <p>&nbsp;No submissions yet!</p>}
                    </div>
                    {((submissions.length > 0) === true) &&
                        <div>
                            <p>
                                Download All Above Submissions
                            </p>
                            <SubmittedAssignmentsDownload assignment={assignment}/>
                        </div>
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default SubmittedAssignmentsModal
