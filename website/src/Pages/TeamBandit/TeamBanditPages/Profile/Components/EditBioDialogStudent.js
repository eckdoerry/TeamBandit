import { useState, React } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { toast } from "react-toastify";

const EditBioDialog = ({ userInfo, setUserChange }) => {
    const [open, setOpen] = useState(false);
    const [bioText, setBioText] = useState("");

    const handleChange = (event) => {
        setBioText(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setBioText(userInfo.student_bio);
    };

    const handleClose = (event) => {
        setOpen(false);
        setBioText(userInfo.student_bio);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!bioText) {
            alert("Please add a Bio");
            return;
        }
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = { bioText };
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/studentbio`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            const parseResponse = await response.json();

            toast.success(parseResponse);

            setUserChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to change bio!");
        }
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Your Team Title</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select your team title
                    </DialogContentText>
                    <InputLabel id="demo-simple-select-label">
                        Titles
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bioText}
                        fullWidth
                        label="Titles"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Team Lead"}>Team Lead</MenuItem>
                        <MenuItem value={"Customer Coordinator"}>
                            {" "}
                            Customer Coordinator
                        </MenuItem>
                        <MenuItem value={"Coder"}> Coder </MenuItem>
                        <MenuItem value={"Recorder"}> Recorder </MenuItem>
                        <MenuItem value={"Architect"}> Architect </MenuItem>
                        <MenuItem value={"Developer"}> Developer </MenuItem>
                        <MenuItem value={"Release Manager"}>
                            {" "}
                            Release Manager{" "}
                        </MenuItem>
                        <MenuItem value={"Database Admin"}>
                            {" "}
                            Database Admin{" "}
                        </MenuItem>
                        <MenuItem value={"Front End Admin"}>
                            {" "}
                            Front End Admin{" "}
                        </MenuItem>
                        <MenuItem value={"Back End Admin"}>
                            {" "}
                            Back End Admin{" "}
                        </MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmitForm}>Submit Title</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditBioDialog;
