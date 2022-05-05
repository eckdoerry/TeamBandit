import {React, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";

import SubmittedAssignmentsDownload from './SubmittedAssignmentsDownload';

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
    display: "flex",
    flexDirection: "column"
};

const SubmittedAssignmentsModal = ({assignment, courseInfo}) => {
    const [submissions, setSubmissions] = useState([]);
    const [open, setOpen] = useState(false);
    const [total_students, setTotalStudents] = useState(0);
    const [total_teams, setTotalTeams] = useState(0);

    const [disabled, setDisabled] = useState(false);

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

    const isBeforeDueDate = () => {
        var dateNow = Date.now();
        var dueDate = Date.parse(assignment.assignment_due_date.split("T"));
        return ((dueDate - dateNow) > 0) ? true : false;
    }

    useEffect(() => {
        getAssignments();
        getTotalStudents();
        getTotalTeams();
    }, []);

    useEffect(() => {
        setTimeout(() => setDisabled(false), 30000);
    }, [setDisabled]);

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
                            {assignment.assignment_name + " (" + assignment.submission_type + ")" + " Due: " + assignment.assignment_due_date.split("T")[1] + " MST"}
                        </Typography>
                        {assignment.allow_submissions_after_due &&
                            <Typography variant="p">
                                *This assignment allows late submissions
                            </Typography>
                        }
                        <Typography variant="p">
                            All Submissions (Click link to view submission)
                        </Typography>
                    </div>
                    <div style={{height: "80%", width:"100%", border: "1px solid black", overflow: "auto"}}>
                        {((submissions.length > 0) === true) ?
                        submissions.map((submission) =>
                            <div key={submission.submission_id} style={{display: "flex", flexDirection: "row", gap: "5px"}}>
                                <Link
                                    target="_blank"
                                    to={`/submission/studentAssignment-${submission.submission_id}`}
                                    >
                                        {submission.team_id == null ?
                                            <p>{submission.student_fname + " " + submission.student_lname}</p>
                                            : <p>{submission.team_name + " (Uploaded by " + submission.student_fname + " " + submission.student_lname + ")"}</p>
                                        }
                                </Link>
                                <p><i>on</i> {submission.submission_time.split(",")[0]} <i>at</i> {submission.submission_time.split(",")[1]} MST</p>
                                {(!isBeforeDueDate() === true || submission.allow_submissions_after_due === true) 
                                    && <p style={{"color": "red"}}>(Late)</p>
                                }
                            </div>
                        ) : <p>&nbsp;No submissions yet!</p>}
                    </div>
                    {((submissions.length > 0) === true) &&
                        <div>
                            <p>
                                Download All Above Submissions
                            </p>
                            <SubmittedAssignmentsDownload assignment={assignment} disabled={disabled} setDisabled={setDisabled}/>
                        </div>
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default SubmittedAssignmentsModal
