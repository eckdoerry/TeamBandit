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
import Switch from "@mui/material/Switch";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {Edit} from "@mui/icons-material";
import {Delete} from "@mui/icons-material";

import { toast } from "react-toastify";
import { borderColor, color } from "@mui/system";

const Settings = ({ courseInfo, setCoursesChange }) => {
    const [title, setTitle] = useState(courseInfo.course_title);
    const [semester, setSemester] = useState(courseInfo.course_semester);
    const [isPublic, setIsPublic] = useState(courseInfo.course_public);
    const [teamSize, setTeamSize] = useState(courseInfo.team_size);

    // Team Page
    const [selected1, setSelected1] = useState(false);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);

    const [open, setOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleConfirmDelete = () => {
        handleDeleteConfirmClose();
        deleteCourse(courseInfo.course_id);
    };

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    const updateIsPublic = (event) => {
        setIsPublic(event.target.checked);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setTitle(courseInfo.course_title);
        setSemester(courseInfo.course_semester);
        setIsPublic(courseInfo.course_public);
        setTeamSize(courseInfo.team_size);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle(courseInfo.course_title);
        setSemester(courseInfo.course_semester);
        setIsPublic(courseInfo.course_public);
        setTeamSize(courseInfo.team_size);
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

            const body = { title, semester, isPublic, teamSize };
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
            <Paper style={{ padding: "25px" }} elevation={3}>
                <Typography
                    style={{
                        borderBottom: "1px solid black",
                        borderBottomWidth: "thin",
                        width: "15%",
                    }}
                    variant="h4"
                    gutterBottom
                >
                    {" "}
                    Course Settings{" "}
                </Typography>
                
                <br>
                </br>

                <Typography variant="h5">Title</Typography>
                <Typography>{courseInfo.course_title}</Typography>

                <br>
                </br>

                <Typography variant="h5">Semester</Typography>
                <Typography>{courseInfo.course_semester}</Typography>

                <br>
                </br>

                <Typography variant="h5">Team Size</Typography>
                <Typography>{courseInfo.team_size}</Typography>
                <br>
                </br>
                <Typography variant="h5">
                    {courseInfo.course_public
                        ? "Course Privacy is set to PUBLIC"
                        : "Course Privacy is set to PRIVATE"}
                </Typography>
                <br>
                </br>
                <Button 
                sx={{ m: 3, pl: 5, pr: 5 }}
                style={
                    { 
                        textAlign: "center", 
                        whiteSpace: "nowrap", 
                        color:"warning", 
                        borderColor:"warning"}
                    }
                size="large"
                variant="outlined"
                color="warning"
                startIcon={<Edit />}
                onClick={handleClickOpen}
                >
                Edit This Course
                
                </Button>
                <Dialog
                    fullWidth
                    maxWidth="lg"
                    open={open}
                    onClose={handleClose}
                >
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
                        <Typography>Adjust Team Size</Typography>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => setTeamSize(teamSize + 1)}
                            ></Button>
                            <Typography
                                style={{ padding: "10px", margin: "10px" }}
                            >
                                {teamSize}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<RemoveIcon />}
                                onClick={() =>
                                    teamSize > 0
                                        ? setTeamSize(teamSize - 1)
                                        : null
                                }
                            ></Button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Typography style={{ paddingRight: "6px" }}>
                                Private
                            </Typography>
                            <Switch
                                checked={isPublic}
                                onChange={updateIsPublic}
                            />
                            <Typography style={{ paddingRight: "6px" }}>
                                Public
                            </Typography>
                            <Typography style={{ paddingRight: "6px" }}>
                                {isPublic ? "| Course is now visible to anyone." : "| Course is now set to private and can only be viewed by the organizer through the application."}{" "}
                            </Typography>
                        </div>
                    </DialogContent>
                    <Typography style={{ paddingLeft: "25px" }}>
                        Change Team Website Layout
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <Card
                                style={{ margin: "5px" }}
                                sx={{ minWidth: 275 }}
                            >
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Skeleton
                                                variant="rectangular"
                                                height={195}
                                            />
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Stack spacing={1}>
                                                <Skeleton
                                                    variant="rectangular"
                                                    height={110}
                                                />
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4}>
                                                        <Skeleton
                                                            variant="rectangular"
                                                            height={75}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Skeleton
                                                            variant="rectangular"
                                                            height={75}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Skeleton
                                                            variant="rectangular"
                                                            height={75}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <ToggleButton
                                        value="check"
                                        style={
                                            selected1
                                                ? { backgroundColor: "#90caf9" }
                                                : { backgroundColor: "white" }
                                        }
                                        selected={selected1}
                                        onChange={() => {
                                            setSelected2(false);
                                            setSelected3(false);
                                            setSelected1(!selected1);
                                        }}
                                    >
                                        <CheckIcon />
                                    </ToggleButton>
                                </CardActions>
                            </Card>
                        </div>
                        <div>
                            <Card
                                style={{ margin: "5px" }}
                                sx={{ minWidth: 275 }}
                            >
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Skeleton variant="text" />

                                        <Skeleton
                                            variant="rectangular"
                                            height={165}
                                        />
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <ToggleButton
                                        value="check"
                                        style={
                                            selected2
                                                ? { backgroundColor: "#90caf9" }
                                                : { backgroundColor: "white" }
                                        }
                                        selected={selected2}
                                        onChange={() => {
                                            setSelected1(false);
                                            setSelected3(false);
                                            setSelected2(!selected2);
                                        }}
                                    >
                                        <CheckIcon />
                                    </ToggleButton>
                                </CardActions>
                            </Card>
                        </div>
                        <div>
                            <Card
                                style={{ margin: "5px" }}
                                sx={{ minWidth: 275 }}
                            >
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Skeleton variant="text" />
                                        <Skeleton
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            height={118}
                                        />
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <ToggleButton
                                        value="check"
                                        style={
                                            selected3
                                                ? { backgroundColor: "#90caf9" }
                                                : { backgroundColor: "white" }
                                        }
                                        selected={selected3}
                                        onChange={() => {
                                            setSelected1(false);
                                            setSelected2(false);
                                            setSelected3(!selected3);
                                        }}
                                    >
                                        <CheckIcon />
                                    </ToggleButton>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                    <DialogActions>
                        <Button onClick={updateCourse}>Update Course</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Button 
                 sx={{ m: 3, pl: 5, pr: 5 }
                    }
                    style={
                        { 
                        textAlign: "center", 
                        whiteSpace: "nowrap", 
                        color:"red", 
                        borderColor:"red" ,
                        float:"right"
                        }
                    }
                    size="large"
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={handleDeleteConfirmOpen}>

                    Delete Course
                </Button>

                <Dialog 
                    open={deleteConfirmOpen}
                    onClose={handleClose}
                    fullWidth
                >

                    <DialogTitle>
                        Permanently Delete Course
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
                        Are you sure you want to delete this course forever?
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
                        Delete Course Forever
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
                
            </Paper>
        </div>
    );
};

export default Settings;
