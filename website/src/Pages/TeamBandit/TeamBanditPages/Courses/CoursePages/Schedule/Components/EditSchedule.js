import {React, useState} from 'react'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

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

const EditSchedule = ({schedule_week, setRowChange}) => {
    // Variables
    const [schedule_week_message, setScheduleWeekMessage] = useState("");
    const [failedSubmit, setFailedSubmit] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setFailedSubmit(false);
        if (schedule_week.schedule_week_message !== null)
        {
            setScheduleWeekMessage(schedule_week.schedule_week_message);
        }
    };
    const handleClose = () => {
        setOpen(false);
        setFailedSubmit(false);
    };

    const updateScheduleWeek = async (e) => {
        e.preventDefault();
        if (schedule_week_message.length > 500) {
            setFailedSubmit(true);
            console.log("Here");
            return;
        }
        try {
            const body = {
                schedule_week_message,
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/schedule/editScheduleWeek/${schedule_week.schedule_week_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            toast.success(await response.json());
            
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update week!");
        }
        handleClose();
    };

    return (
        <div>
            <EditIcon style={{cursor: 'pointer', color: '#f57c00', alignItems:'center', justifyContent: 'center'}} onClick={handleOpen}/>
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
                            Edit Schedule Week
                        </Typography>
                    </Box>

                    <Typography>Schedule Week Milestone</Typography>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Schedule Week Milestone (Maximum 500 characters)"
                        type="text"
                        value={schedule_week_message}
                        onChange={(e) => setScheduleWeekMessage(e.target.value)}
                        error={schedule_week_message.length > 500 && failedSubmit}
                        helperText={
                            schedule_week_message.length > 500 && failedSubmit ? "Maximum 500 characters" : "You can enter your own HTML with in-line styling if you wish!"
                        }
                    />

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="warning"
                        onClick={(e) => (updateScheduleWeek(e))}
                        startIcon={<EditIcon />}
                    >
                        {" "}
                        Save{" "}
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

export default EditSchedule