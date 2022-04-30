import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

// For Parsing the CSVs
import { parse } from "papaparse";

//MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";

// CSV Uploader stuff
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import csvExample from "../../../../../../../Images/exampleStudentCsv.PNG";

// Need this to change color schemes
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Idk really, but need it for something I guess
import { styled } from "@mui/material/styles";

import styles from "../../../Courses.module.css";
import { Typography } from "@mui/material";

// need to make a theme so I can use custom colors for Material UI
const theme = createTheme({
    palette: {
        sameBlue: {
            // Same blue as text for button
            main: "#003466",
        },
    },
});

const Input = styled("input")({
    display: "none",
});

const InputTodo = ({ courseInfo, setRowChange }) => {
    const [student_fname, setStudentFname] = useState("");
    const [student_lname, setStudentLname] = useState("");
    const [student_emplid, setStudentEmplid] = useState("");
    const [student_email, setStudentEmail] = useState("");
    const [student_gpa, setStudentGpa] = useState("");
    const [course_id, setCourseId] = useState(courseInfo.course_id);

    // CSV STUFF
    const [highlighted, setHighlighted] = React.useState(false);
    const [contacts, setContacts] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
    const [individualAddOpen, setIndividualAddOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleInfoClose = () => {
        setInfoOpen(false);
    };

    const handleInfoToggle = () => {
        setInfoOpen(!infoOpen);
    };

    const handleIndividualClickOpen = () => {
        setIndividualAddOpen(true);
    };

    const handleIndividualClose = () => {
        setIndividualAddOpen(false);
    };

    const addList = async (e) => {
        e.preventDefault();
        for (const student in contacts) {
            const student_fname_csv = contacts[student].firstName;
            const student_lname_csv = contacts[student].lastName;
            const student_emplid_csv = contacts[student].studentID;
            const student_email_csv = contacts[student].email;
            const student_gpa_csv = contacts[student].gpa;

            try {
                const body = {
                    student_fname_csv,
                    student_lname_csv,
                    student_emplid_csv,
                    student_email_csv,
                    student_gpa_csv,
                    course_id,
                };
                const myHeaders = new Headers();

                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("token", localStorage.token);

                await fetch(`${process.env.REACT_APP_BASEURL}/students/csv/`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                });

                toast.success("Student was added successfully!");
                setRowChange(true);

                setContacts([]);
                handleToggle();
            } catch (error) {
                console.error(error.message);
                toast.error("Failed to add student!");
            }
        }
    };
    //

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = {
                student_fname,
                student_lname,
                student_emplid,
                student_email,
                student_gpa,
                course_id,
            };
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(`${process.env.REACT_APP_BASEURL}/students/students`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            });

            toast.success("Student was added successfully!");
            setStudentFname("");
            setStudentLname("");
            setStudentEmplid("");
            setStudentEmail("");
            setStudentGpa("");
            setRowChange(true);
            handleIndividualClose();
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add student!");
        }
    };

    return (
        <Fragment>
            <Button
                size="large"
                variant="contained"
                color="success"
                onClick={handleIndividualClickOpen}
                startIcon={<AddIcon />}
            >
                {" "}
                Add{" "}
            </Button>
            <Dialog open={individualAddOpen} onClose={handleIndividualClose}>
                <DialogTitle>Add a New Student</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter student information here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={student_fname}
                        onChange={(e) => setStudentFname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setStudentLname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Student University ID"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setStudentEmplid(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Student Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setStudentEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Student GPA"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setStudentGpa(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="success"
                        onClick={onSubmitForm}
                        startIcon={<AddIcon />}
                    >
                        {" "}
                        Add Student{" "}
                    </Button>
                    <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        color="error"
                        onClick={handleIndividualClose}
                        startIcon={<CloseIcon />}
                    >
                        {" "}
                        Cancel{" "}
                    </Button>
                </DialogActions>
            </Dialog>

            <Button
                sx={{ m: 3, pl: 5, pr: 5 }}
                style={{ textAlign: "center", whiteSpace: "nowrap" }}
                size="large"
                variant="contained"
                color="secondary"
                onClick={handleToggle}
                startIcon={<FileUploadIcon />}
            >
                {" "}
                Upload Student List{" "}
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={open}
                onClose={handleClose}
            >
                <div className={styles.csv}>
                    <HelpIcon
                        sx={{ fontSize: "40px" }}
                        style={{
                            position: "absolute",
                            top: "10",
                            right: "10",
                            color: "#003466",
                            cursor: "pointer",
                        }}
                        onClick={handleInfoToggle}
                    />
                    <Dialog
                        fullWidth={true}
                        maxWidth={"md"}
                        open={infoOpen}
                        onClose={handleInfoClose}
                    >
                        <div style={{ padding: "10px" }}>
                            <CloseIcon
                                sx={{ fontSize: "30px" }}
                                style={{
                                    position: "absolute",
                                    top: "10",
                                    right: "10",
                                    color: "#003466",
                                    cursor: "pointer",
                                }}
                                onClick={handleInfoToggle}
                            />
                            <Typography
                                variant="h4"
                                backgroundColor={courseInfo.course_color}
                                margin="-1.1% -1.1% 2% -1.1%"
                                paddingTop="2%"
                                paddingBottom="2%"
                                padding="1% 1% 1% 2%"
                            >
                                Upload Instructions
                            </Typography>
                            <Typography variant="body2">
                                Currently only the file type of .csv is
                                supported. You will also need to include header
                                rows to properly identify the data. These
                                headers include: firstName, lastName, studentID,
                                email, and gpa. An example of what your file
                                should look like is below.
                            </Typography>
                            <br></br>
                            <Typography variant="body2">
                                If you want to include a 'comment line', you can
                                add # or % at the start of your line. This will
                                not include that line for upload. This would be
                                in the 'firstName' column.
                            </Typography>
                            <Typography variant="subtitle1">
                                Example:
                            </Typography>
                            <img src={csvExample} alt="StudentCSVExample" />
                        </div>
                    </Dialog>
                    <div className={styles.appHeader}>
                        <div className={styles.uploader}>
                            <div
                                className={`${styles.appLink} ${
                                    highlighted
                                        ? styles.appHighlighted
                                        : styles.appNothing
                                }`}
                                onDragEnter={() => {
                                    setHighlighted(true);
                                }}
                                onDragLeave={() => {
                                    setHighlighted(false);
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setHighlighted(false);

                                    Array.from(e.dataTransfer.files).forEach(
                                        async (file) => {
                                            const text = await file.text();
                                            const result = parse(text, {
                                                header: true,
                                            });

                                            for (const val in result.data) {
                                                if (
                                                    result.data[
                                                        val
                                                    ].firstName.startsWith(
                                                        "%"
                                                    ) ||
                                                    result.data[
                                                        val
                                                    ].firstName.startsWith("#")
                                                ) {
                                                    result.data.splice(val, 1);
                                                }
                                            }

                                            setContacts((existing) => [
                                                ...existing,
                                                ...result.data,
                                            ]);
                                        }
                                    );
                                }}
                            >
                                DRAG AND DROP FILE HERE
                            </div>

                            <p className={styles.p}> OR </p>

                            <label htmlFor="contained-button-file">
                                <ThemeProvider theme={theme}>
                                    <Input
                                        accept="text/csv"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={(event) => {
                                            event.preventDefault();
                                            const loadCSV = Promise.resolve(
                                                event.target.files[0].text()
                                            );

                                            loadCSV.then(function (
                                                resultOfPromise
                                            ) {
                                                const parsedResult = parse(
                                                    resultOfPromise,
                                                    { header: true }
                                                );
                                                for (const val in parsedResult.data) {
                                                    if (
                                                        parsedResult.data[
                                                            val
                                                        ].firstName.startsWith(
                                                            "%"
                                                        ) ||
                                                        parsedResult.data[
                                                            val
                                                        ].firstName.startsWith(
                                                            "#"
                                                        )
                                                    ) {
                                                        parsedResult.data.splice(
                                                            val,
                                                            1
                                                        );
                                                    }
                                                }
                                                setContacts((existing) => [
                                                    ...existing,
                                                    ...parsedResult.data,
                                                ]);
                                            });
                                        }}
                                    />

                                    <Button
                                        color="sameBlue"
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload File
                                    </Button>
                                </ThemeProvider>
                            </label>

                            <br></br>
                            <br></br>
                        </div>
                        <div className={styles.tablepad}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 1000 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        courseInfo.course_color,
                                                    color: "black",
                                                }}
                                            >
                                                First Name
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        courseInfo.course_color,
                                                    color: "black",
                                                }}
                                            >
                                                Last Name
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        courseInfo.course_color,
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                Student ID
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        courseInfo.course_color,
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                Email
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        courseInfo.course_color,
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                GPA
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contacts.map((contact) => (
                                            <TableRow
                                                key={contact.studentID}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell
                                                    style={{
                                                        backgroundColor:
                                                            "#003466",
                                                        color: "white",
                                                    }}
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {contact.firstName}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        backgroundColor:
                                                            "#003466",
                                                        color: "white",
                                                    }}
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {contact.lastName}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        backgroundColor:
                                                            "#003466",
                                                        color: "white",
                                                    }}
                                                    align="right"
                                                >
                                                    {contact.studentID}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        backgroundColor:
                                                            "#003466",
                                                        color: "white",
                                                    }}
                                                    align="right"
                                                >
                                                    {contact.email}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        backgroundColor:
                                                            "#003466",
                                                        color: "white",
                                                    }}
                                                    align="right"
                                                >
                                                    {contact.gpa}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {contacts.length > 0 ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={addList}
                                >
                                    {" "}
                                    Import{" "}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={addList}
                                    disabled
                                >
                                    {" "}
                                    Import{" "}
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="warning"
                                style={{
                                    position: "absolute",
                                    right: "40px",
                                    marginTop: "5px",
                                }}
                                onClick={handleToggle}
                            >
                                {" "}
                                Cancel{" "}
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default InputTodo;
