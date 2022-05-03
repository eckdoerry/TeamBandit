import React, { useState } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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

const SetScheduleWeeks = ({ courseInfo, rows, setRowChange }) => {
    // Variables
    const [schedule_description, setScheduleDescription] = useState("");
    const [schedule_deliverables, setScheduleDeliverables] = useState("");
    const [course_start_week, setCourseStartWeek] = useState("");
    const [num_weeks, setCourseNumWeeks] = useState("");

    // define default course schedule start date
    const current_date = new Date();
    const todays_date = current_date.setDate(current_date.getDate());
    const default_course_start_week = new Date(todays_date);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleConfirmDelete = () => {
        handleDeleteConfirmClose();
        removePreviousWeeks();
    };

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => 
    {
        if (rows.length > 0) 
        {
            window.alert("Please Remove the Current Schedule before Setting A New One");
            return; 
        }
        setOpen(true);
    }
    const handleClose = () => 
    {
        setOpen(false);
        setScheduleDescription("");
        setScheduleDeliverables("");
        setCourseStartWeek("");
        setCourseNumWeeks("");
    };

    const getCorrectDates = (event) => {
        if (parseInt(num_weeks) <= 0 || parseInt(num_weeks) >= 53 || num_weeks.includes(".") === true || num_weeks === "")
        {
            toast.error("The number of weeks must be an integer between 1 and 52 (inclusive)");
            return;
        }

        handleClose();
        var startWeekMilliseconds;

        // check if user entered a week
        if (course_start_week !== '')
            {
                // use seleceted course start date
                startWeekMilliseconds = new Date(course_start_week).getTime() + 86400000;
            }

        // otherwise, a course start date was not selected
        // set start date to tomorrow by default
        else {
                // use default course start date
                startWeekMilliseconds = new Date(default_course_start_week).getTime() + 86400000;

                // notify user that schedule was set to tomorrow by default
                toast.info("Start date not specified. Course start date set to tomorrow. ");
        }

        var currentWeek = new Date(startWeekMilliseconds);
        var currentWeekMilliseconds = startWeekMilliseconds;

        for (var i = 0; i < parseInt(num_weeks); i++)
        {
            addScheduleWeek(event, currentWeek.toLocaleDateString().replaceAll('/', '-'));
            currentWeekMilliseconds += (7 * 24 * 60 * 60 * 1000);
            currentWeek = new Date(currentWeekMilliseconds);
        }
        toast.success("Weeks added successfully!");
    };

    const addScheduleWeek = async (event, week) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("schedule_week", week);
            formData.append("schedule_description", schedule_description);
            formData.append("schedule_deliverables", schedule_deliverables);
            formData.append("course_id", courseInfo.course_id);
        
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            await fetch(`${process.env.REACT_APP_BASEURL}/schedule/addScheduleWeek`, {
                method: "POST",
                headers: myHeaders,
                body: formData,
            });

            setScheduleDescription("");
            setScheduleDeliverables("");
            setCourseStartWeek("");
            setCourseNumWeeks("");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add week!");
        }
    };

    const removePreviousWeeks = async () => {
        try {
            const formData = new FormData();
            formData.append("course_id", courseInfo.course_id);
        
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/schedule/removeScheduleWeeks`, {
                method: "DELETE",
                headers: myHeaders,
                body: formData,
            });

            setRowChange(true);
            toast.success(await response.json());

        } catch (error) {
            console.error(error.message);
            toast.error("Failed to remove weeks!");
        }
    };

    return (
        <div>
            <Button
                sx={{ m: 3 }}
                variant="contained"
                color="success"
                onClick={handleOpen}
                startIcon={<AddIcon />}
            >
                {" "}
                Set Weeks{" "}
            </Button>
            <Button
                sx={{ m: 3 }}
                variant="outlined"
                color="error"
                onClick={handleDeleteConfirmOpen}
                startIcon={<DeleteIcon />}
            >
                {" "}
                Remove All Weeks
                {" "}
            </Button>


            <Dialog 
                    open={deleteConfirmOpen}
                    onClose={handleClose}
                    fullWidth
                >

                    <DialogTitle>
                        Delete Schedule
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
                        Are you sure you want to delete the entire schedule?
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
                        Delete Schedule
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
                            Set Weeks
                        </Typography>
                    </Box>

                    <Typography>Schedule Start Week</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        type="date"
                        value={course_start_week}
                        helperText="Select the first day of this course"
                        onChange={(e) => setCourseStartWeek(e.target.value.toString())}
                    />

                    <Typography>Number of Weeks in Course</Typography>
                    <TextField
                        required
                        fullWidth
                        sx={{ m: 2 }}
                        type="text"
                        value={num_weeks}
                        error={parseInt(num_weeks) <= 0 || parseInt(num_weeks) >= 53 || num_weeks.includes(".") === true || num_weeks === ""}
                        helperText={
                            (parseInt(num_weeks) <= 0 || parseInt(num_weeks) >= 53 || num_weeks.includes(".") === true || num_weeks === "") ? "The number of weeks must be an integer between 1 and 52 (inclusive)" : " "
                        }
                        onChange={(e) => setCourseNumWeeks(e.target.value.toString())}
                    />

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="success"
                        onClick={(e) => (getCorrectDates(e))}
                        startIcon={<AddIcon />}
                    >
                        {" "}
                        Set Weeks{" "}
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
                </Box>
            </Modal>
        </div>
    );
};

export default SetScheduleWeeks;
