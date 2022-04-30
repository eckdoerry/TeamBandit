import { useState, React } from "react";
import { toast } from "react-toastify";

//MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FormDialogAddCourse = ({ setCoursesChange }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [failedSubmit, setFailedSubmit] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setFailedSubmit(false);
        setTitle("");
        setSemester("");
        setYear("");
        setDescription("");
    };

    const handleClose = (event) => {
        setOpen(false);
        setFailedSubmit(false);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!title || !semester || !year) {
            setFailedSubmit(true);
            return;
        }
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);


        const body = { title, semester, year, description };
        await fetch(`${process.env.REACT_APP_BASEURL}/courses/courses`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(body)
        });

        toast.success("Course added successfully!");

        setCoursesChange(true);
        setTitle("");
        setSemester("");
        setYear("");
        setDescription("");
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to add course!");
        }
        handleClose();
    };

    return (
        <div style={{paddingLeft: '25px', paddingTop:'25px'}}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a New Course
            </Button>

            <br />
            <br />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a New Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter course information here.
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        label="Course Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={title}
                        error={title === "" && failedSubmit}
                        helperText={
                            title === "" && failedSubmit ? "Course name is required" : " "
                        }
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Course Semester"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setSemester(e.target.value)}
                        error={semester === "" && failedSubmit}
                        helperText={
                            semester === "" && failedSubmit ? "Course semester is required" : " "
                        }
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Course Year"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setYear(e.target.value)}
                        error={(year === "" || isNaN(year) || year.length < 4) && failedSubmit}
                        helperText={
                            (year === "" || isNaN(year) || year.length < 4) && failedSubmit ? "A proper course year is required" : " "
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmitForm}>Add Course</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormDialogAddCourse;
