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
    const [description, setDescription] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!title) {
            alert("Please add a Course Name");
            return;
        }
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);


        const body = { title, semester, description };
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/courses/courses`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(body)
        });

            const parseResponse = await response.json();

            console.log(parseResponse);
            toast.success("Course added successfully!");

            setCoursesChange(true);
            setTitle("");
            setSemester("");
            setDescription("");
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to add course!");
        }
        handleClose();
    };

    return (
        <div>
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
                        onChange={(e) => setSemester(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Course Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setDescription(e.target.value)}
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
