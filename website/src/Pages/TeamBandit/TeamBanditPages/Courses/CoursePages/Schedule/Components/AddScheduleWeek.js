
////// UNUSED //////

import React, { Fragment, useState } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

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

const AddScheduleWeek = ({ courseInfo, rows, setRowChange }) => {
    // Variables
    const [schedule_week, setScheduleWeek] = useState("");
    const [schedule_description, setScheduleDescription] = useState("");
    const [schedule_deliverables, setScheduleDeliverables] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setScheduleWeek("");
        setScheduleDescription("");
        setScheduleDeliverables("");
    };

    const addScheduleWeek = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("schedule_week", schedule_week);
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

            toast.success("Week was added successfully!");
            setScheduleWeek("");
            setScheduleDescription("");
            setScheduleDeliverables("");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add week!");
        }
    };

    return (
        <Fragment>
            <Button
                sx={{ m: 3 }}
                variant="outlined"
                color="success"
                onClick={handleOpen}
                startIcon={<AddIcon />}
            >
                {" "}
                Add{" "}
            </Button>
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
                            Add Week
                        </Typography>
                    </Box>

                    <Typography>Week</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        type="date"
                        value={schedule_week}
                        onChange={(e) => setScheduleWeek(e.target.value.toString())}
                    />

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="success"
                        onClick={(e) => (handleClose(), addScheduleWeek(e))}
                        startIcon={<AddIcon />}
                    >
                        {" "}
                        Add{" "}
                    </Button>
                    <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                    >
                        {" "}
                        Close{" "}
                    </Button>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default AddScheduleWeek;
