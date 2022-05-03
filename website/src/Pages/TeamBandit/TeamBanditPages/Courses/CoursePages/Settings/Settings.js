import { React, useState } from "react";

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
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";

import { toast } from "react-toastify";
import { borderColor, color, fontWeight } from "@mui/system";

const Settings = ({ courseInfo, setCoursesChange }) => {
    const [title, setTitle] = useState(courseInfo.course_title);
    const [semester, setSemester] = useState(courseInfo.course_semester);
    const [isPublic, setIsPublic] = useState(courseInfo.course_public);
    const [teamSize, setTeamSize] = useState(courseInfo.team_size);
    const [courseColor, setCourseColor] = useState();

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
        setCourseColor(courseInfo.course_color);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle(courseInfo.course_title);
        setSemester(courseInfo.course_semester);
        setIsPublic(courseInfo.course_public);
        setTeamSize(courseInfo.team_size);
        setCourseColor(courseInfo.course_color);
    };

    const updateCourse = async (e) => {
        e.preventDefault();
        if (!title) {
            alert("Please add a Course Name");
            return;
        } else if (courseColor != "#EBEBEB" && courseColor != null) {
            try {
                const myHeaders = new Headers();

                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("token", localStorage.token);

                const body = {
                    title,
                    semester,
                    isPublic,
                    teamSize,
                    courseColor,
                };
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

                
                if (
                    courseColor != "#EBEBEB" &&
                    courseInfo.course_color != "EBEBEB"
                ) {
                    setCourseColor("#EBEBEB");
                }
            } catch (err) {
                console.error(err.message);
                toast.error("Failed to update course!");
            }
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
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "25px",
            }}
        >
            <Paper
                style={{
                    padding: "0px",
                    border: "1px double",
                    borderColor: "#d3d3d3",
                    boxShadow: "0px 0px 0px 0px",
                }}
                elevation={3}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: courseInfo.course_color,
                    }}
                >
                    <Typography
                        style={{
                            borderBottomWidth: "thin",
                            width: "100%",
                            height: "100%",
                            padding: "25px 25px 25px 10px",
                        }}
                        variant="h4"
                        gutterBottom
                    >
                        {" "}
                        Course Settings{" "}
                    </Typography>
                </div>

                <br></br>

                <div
                    display="inline-block"
                    style={{
                        paddingLeft: "1%",
                    }}
                >
                    <Typography
                        variant="h5"
                        display="inline-block"
                        marginRight="1%"
                        marginBottom="1%"
                    >
                        Course Theme
                    </Typography>
                    <div style ={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#FAC01A")}
                        style={{
                            backgroundColor: "#FAC01A",
                            width: '10%',
                            border: "solid",
                            borderColor: "#FAC01A",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Gold
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#FFFFFF")}
                        style={{
                            backgroundColor: "#FFFFFF",
                            border: "solid",
                            width: '10%',
                            borderColor: "#FFFFFF",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Snow
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#FFD7D4")}
                        style={{
                            backgroundColor: "#FFD7D4",
                            border: "solid",
                            width: '10%',
                            borderColor: "#FFD7D4",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Lotus
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#FFC67A")}
                        style={{
                            backgroundColor: "#FFC67A",
                            border: "solid",
                            width: '10%',
                            borderColor: "#FFC67A",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Sunset
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#FFF9B8")}
                        style={{
                            backgroundColor: "#FFF9B8",
                            border: "solid",
                            width: '10%',
                            borderColor: "#FFF9B8",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Daffodil
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#D1FFA8")}
                        style={{
                            backgroundColor: "#D1FFA8",
                            border: "solid",
                            width: '10%',
                            borderColor: "#D1FFA8",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Spearmint
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#C7F7FF")}
                        style={{
                            backgroundColor: "#C7F7FF",
                            border: "solid",
                            width: '10%',
                            borderColor: "#C7F7FF",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Icicle
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#C39CFF")}
                        style={{
                            backgroundColor: "#C39CFF",
                            border: "solid",
                            width: '10%',
                            borderRadius: "24px",
                            borderColor: "#C39CFF",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Grape
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#FF91B0")}
                        style={{
                            backgroundColor: "#FF91B0",
                            border: "solid",
                            width: '10%',
                            borderRadius: "24px",
                            borderColor: "#FF91B0",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Bubblegum
                    </button>

                    <button
                        type="button"
                        onClick={(e) => setCourseColor("#ABF5D0")}
                        style={{
                            backgroundColor: "#ABF5D0",
                            border: "solid",
                            width: '10%',
                            borderColor: "#ABF5D0",
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            borderRadius: "24px",
                            display: "inline",
                            marginRight: ".5%",
                            marginBottom: "1%",
                            padding: "2% 1% 2%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "left",
                            cursor: "pointer",
                        }}
                    >
                        Harbor
                    </button>
</div>
                    <button
                        type="button"
                        onClick={updateCourse}
                        style={{
                            backgroundColor: courseColor,
                            border: "solid",
                            borderRadius: "16px",
                            
                            borderColor: courseColor,
                            boxShadow:
                                "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            
                            width: '50%',
                            
                            marginLeft: '25%',
                            
                            padding: "1% 20% 1%",
                            fontSize: "large",
                            fontWeight: '500',
                            alignItems: "center",
                            justifyContent: "center",
                            
                            cursor: "pointer",
                        }}
                    >
                        Apply Theme
                    </button>
                    

                    <br></br>

                    <br></br>

                    <br></br>

                    <div
                        style={{
                            backgroundColor: "#EDEDED",
                            marginLeft: "-1.01%",
                            marginBottom: "-25px",
                            padding: "10px 10px 10px 10px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            display="inline"
                            marginRight="1%"
                        >
                            Title
                        </Typography>

                        <Typography
                            display="inline"
                            style={{
                                marginInlineStart: "205px",
                                fontSize: "150%",
                            }}
                        >
                            {courseInfo.course_title}
                        </Typography>
                    </div>

                    <br></br>

                    <div
                        style={{
                            backgroundColor: "#F2F2F2",
                            marginLeft: "-1.01%",
                            marginBottom: "-50px",
                            padding: "1% 1% 1% 1%",
                        }}
                    >
                        <Typography
                            variant="h5"
                            display="inline"
                            marginRight="1%"
                        >
                            Semester
                        </Typography>

                        <Typography
                            display="inline"
                            style={{
                                marginInlineStart: "150px",
                                fontSize: "150%",
                            }}
                        >
                            {courseInfo.course_semester}
                        </Typography>
                    </div>

                    <br></br>
                    <br></br>

                    <div
                        style={{
                            backgroundColor: "#F5F5F5",
                            marginLeft: "-1.01%",
                            marginBottom: "-50px",
                            padding: "10px 10px 10px 10px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            display="inline"
                            marginRight="1%"
                        >
                            Team Size
                        </Typography>

                        <Typography
                            display="inline"
                            marginRight="1%"
                            style={{
                                marginInlineStart: "141px",
                                fontSize: "150%",
                            }}
                        >
                            {courseInfo.team_size}
                        </Typography>
                    </div>

                    <br></br>
                    <br></br>

                    <div
                        style={{
                            backgroundColor: "#FAFAFA",
                            marginLeft: "-1.01%",

                            padding: "10px 10px 10px 10px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            display="inline"
                            marginRight="1%"
                        >
                            Course Privacy
                        </Typography>

                        <Typography
                            display="inline"
                            style={{
                                marginInlineStart: "90px",
                                fontSize: "150%",
                            }}
                        >
                            {courseInfo.course_public ? "Public" : "Private"}
                        </Typography>
                    </div>

                    <br></br>
                </div>

                <Button
                    sx={{ m: 3, pl: 5, pr: 5 }}
                    style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        color: "warning",
                        borderColor: "warning",
                    }}
                    size="large"
                    variant="contained"
                    color="primary"
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

                        <Typography>Standard Team Size</Typography>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "left",
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
                                {isPublic
                                    ? "| Course is now visible to anyone."
                                    : "| Course is now set to private and can only be viewed by the organizer through the application."}{" "}
                            </Typography>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={updateCourse}>Update Course</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Button
                    sx={{ m: 3, pl: 5, pr: 5 }}
                    style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        float: "right",
                    }}
                    size="large"
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleDeleteConfirmOpen}
                >
                    Delete Course
                </Button>

                <Dialog
                    open={deleteConfirmOpen}
                    onClose={handleClose}
                    fullWidth
                >
                    <DialogTitle>Permanently Delete Course</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            <div
                                style={{
                                    display: "float",
                                    float: "left",
                                }}
                            >
                                Are you sure you want to delete this course
                                forever?
                            </div>
                        </DialogContentText>
                    </DialogContent>

                    <div style={{ display: "float" }}>
                        <Button
                            sx={{ m: 3, pl: 1, pr: 1 }}
                            style={{
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                color: "red",
                                borderColor: "red",
                                float: "left",
                            }}
                            size="medium"
                            variant="outlined"
                            startIcon={<Delete />}
                            onClick={handleConfirmDelete}
                        >
                            Delete Course Forever
                        </Button>
                    </div>

                    <div style={{ display: "float" }}>
                        <Button
                            sx={{ m: 3, pt: 2, pb: 2, pl: 10, pr: 10 }}
                            style={{
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                color: "blue",
                                borderColor: "blue",
                                float: "right",
                            }}
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
