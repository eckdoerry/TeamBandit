import { useState, React } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FormDialogDeleteCourse = ({ deleteCourse }) => {
    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const handleDeleteCourse = (event) => {
        event.preventDefault();

        deleteCourse({ course });

        handleClose(event);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Delete a Course
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete a Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name of the course here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Course name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteCourse}>Delete Course</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormDialogDeleteCourse;
