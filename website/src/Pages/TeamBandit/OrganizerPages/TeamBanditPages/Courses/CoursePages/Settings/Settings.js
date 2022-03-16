import { Fragment, React, useState } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';

import { toast } from "react-toastify";

const Settings = ({ courseInfo, setCoursesChange }) => {
    const [title, setTitle] = useState(courseInfo.course_title);
    const [semester, setSemester] = useState(courseInfo.course_semester);
    const [isPublic, setIsPublic] = useState(courseInfo.course_public);

    const [open, setOpen] = useState(false);

    const updateIsPublic = (event) => {
        setIsPublic(event.target.checked);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setTitle(courseInfo.course_title);
        setSemester(courseInfo.course_semester);
        setIsPublic(courseInfo.course_public);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle(courseInfo.course_title);
        setSemester(courseInfo.course_semester);
        setIsPublic(courseInfo.course_public);
    };

    const updateCourse = async (e) => {
        e.preventDefault();
        if (!title) {
            alert("Please add a Course Name");
            return;
        }
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = { title, semester, isPublic };
            await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/courses/${courseInfo.course_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setCoursesChange(true);
            toast.success("Course edited successfully!");
            handleClose();
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to update course!");
        }
    };

    async function deleteCourse(id) {
        try {
            await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/courses/${id}`,
                {
                    method: "DELETE",
                    headers: { token: localStorage.token },
                }
            );

            setCoursesChange(true);
            toast.success("Course was deleted!");
        } catch (err) {
            console.error(err.message);
            toast.error("Course failed to delete!");
        }
    }

    return (
        <div style={{ width: "100%", height: "100%", padding: "25px" }}>
            <Paper style={{padding: '25px'}} elevation={3}>
                <Typography style={{borderBottom: '1px solid black', borderBottomWidth: 'thin', width: '15%'}} variant="h4" gutterBottom> Course Settings </Typography>
                <Typography variant="h5">Title</Typography>
                <Typography>{courseInfo.course_title}</Typography>
                <Typography variant="h5">Semester</Typography>
                <Typography>{courseInfo.course_semester}</Typography>
                <Typography variant="h5">{courseInfo.course_public ? "Course is set to PUBLIC" : "Course is set to PRIVATE"}</Typography>
                <Button onClick={handleClickOpen}>Edit This Course</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit this course</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Please enter course information here.
                        </DialogContentText>

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Course Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={title}
                            error={title === ""}
                            helperText={
                                title === "" ? "This is a required field" : " "
                            }
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <TextField
                            margin="dense"
                            label="Course Semester"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                        />
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography style={{paddingRight: '6px'}}>{isPublic ? "Public" : "Private"} </Typography>
                        <Switch checked={isPublic} onChange={updateIsPublic}/>
                        </div>
                        
                        
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={updateCourse}>Update Course</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={() => deleteCourse(courseInfo.course_id)}>
                    Delete Course
                </Button>
            </Paper>
        </div>
    );
};

export default Settings;
