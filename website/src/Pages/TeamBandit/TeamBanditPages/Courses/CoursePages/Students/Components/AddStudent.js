import React, {Fragment, useState} from "react";

// For Parsing the CSVs
import { parse } from "papaparse";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// CSV Uploader stuff
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';

// Need this to change color schemes
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { toast } from 'react-toastify';

// Idk really, but need it for something I guess
import { styled } from '@mui/material/styles';

import styles from '../../../Courses.module.css';

// need to make a theme so I can use custom colors for Material UI
const theme = createTheme({
    palette: {
    sameBlue: {
        // Same blue as text for button
        main: '#003466',
    },
    },
});

const DialogBig = {
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
};

const Input = styled('input')({
    display: 'none',
});

const InputTodo = ({courseInfo, setStudentsChange}) => {
    const [student_fname, setStudentFname] = useState("");
    const [student_lname, setStudentLname] = useState("");
    const [student_emplid, setStudentEmplid] = useState("");
    const [student_email, setStudentEmail] = useState("");
    const [student_gpa, setStudentGpa] = useState("");
    const [course_id, setCouseId] = useState(courseInfo.course_id);

    // CSV STUFF
    const [highlighted, setHighlighted] = React.useState(false);
    const [contacts, setContacts] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [success, setSuccess] = React.useState(false);
    const handleSuccess = () => {
        setSuccess(false);
    };
    const successToggle = () => {
        setSuccess(!success);
    };

    const [fileStatus, setFileStatus] = React.useState(1);

    const addList = async e => {
        e.preventDefault();
        for (const student in contacts) {
            const student_fname_csv = contacts[student].firstName;
            const student_lname_csv = contacts[student].lastName;
            const student_emplid_csv = contacts[student].studentID;
            const student_email_csv = contacts[student].email;
            const student_gpa_csv = contacts[student].gpa;

            try {
            const body = {student_fname_csv,student_lname_csv,student_emplid_csv,student_email_csv,student_gpa_csv, course_id};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`http://localhost:5000/students/csv/`, {method: "POST", headers: myHeaders, body: JSON.stringify(body)});

            toast.success("Student was added successfully!");
            setStudentsChange(true);

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
            const body = {student_fname,student_lname,student_emplid,student_email,student_gpa, course_id};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
            
            const response = await fetch("http://localhost:5000/students/students", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            toast.success("Student was added successfully!");
            setStudentFname("");
            setStudentLname("");
            setStudentEmplid("");
            setStudentEmail("");
            setStudentGpa("");
            setStudentsChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add student!");
        }
    }
    
    return (
        <Fragment>
        <div className = "Uploader">
            <Box component="form" >
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="First Name" type = "text" value = {student_fname} onChange = {e => setStudentFname(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Last Name" type = "text" value = {student_lname} onChange = {e => setStudentLname(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Student ID" type = "text" value = {student_emplid} onChange = {e => setStudentEmplid(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Email Address" type = "text" value = {student_email} onChange = {e => setStudentEmail(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="GPA" type = "text" value = {student_gpa} onChange = {e => setStudentGpa(e.target.value)}/>
                <Button sx={{ m: 3 }} size="large" variant="contained" color="success" onClick={onSubmitForm}> Add </Button>
                <Button sx={{ m: 3 }} size="large" variant="contained" color="secondary" onClick={handleToggle}> Upload Student List </Button>
            </Box>
        </div>  
        <Dialog maxHeight={'lg'} maxWidth={'lg'} open={open} onClose={handleClose}>
        <div className = {styles.csv}>
            <div className = {styles.appHeader}>
                    <div className = {styles.uploader}>
                        <div
                            className = {`${styles.appLink} ${highlighted ? styles.appHighlighted : styles.appNothing}`}

                            onDragEnter = {() =>{
                                setHighlighted(true);
                            }}

                            onDragLeave = {() => {
                                setHighlighted(false);
                            }}

                            onDragOver = {(e) =>{
                                e.preventDefault();
                            }}

                            onDrop = {(e) => {
                                e.preventDefault();
                                setHighlighted(false);

                                console.log(e.dataTransfer.files);

                                Array.from(e.dataTransfer.files)
                                .filter((file) => file.type === "application/vnd.ms-excel")
                                .forEach(async (file) => {
                                const text = await file.text();
                                const result = parse(text, {header: true});
                                setContacts(existing => [...existing, ...result.data]);
                                console.log(result);
                                
                                });

                        }}>
                            DRAG AND DROP FILE HERE
                        </div>

                        <p className = {styles.p}> OR </p>

                        <label htmlFor="contained-button-file">
                        <ThemeProvider theme = {theme}>

                            <Input
                            accept="text/csv"
                            id="contained-button-file"
                            multiple type="file"

                            onChange = {(event) => {
                            event.preventDefault();
                            const loadCSV = Promise.resolve(event.target.files[0].text());

                            loadCSV.then(function(resultOfPromise){
                                const parsedResult = parse(resultOfPromise, {header: true});
                                setContacts(existing => [...existing, ...parsedResult.data]);
                                console.log(parsedResult);
                            });
                            }}
                            />

                            <Button color = "sameBlue" variant="contained" component = "span">
                            Upload File
                            </Button>
                        </ThemeProvider>
                        </label>

                
            </div>
            {/*This be a comment*/}
            <div className = {styles.tablepad}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell style={{backgroundColor:'#F2C12E', color: 'black',}}>First Name</TableCell>
                    <TableCell style={{backgroundColor:'#F2C12E', color: 'black',}}>Last Name</TableCell>
                    <TableCell style={{backgroundColor:'#F2C12E', color: 'black',}} align="right">Student ID</TableCell>
                    <TableCell style={{backgroundColor:'#F2C12E', color: 'black',}}align="right">Email</TableCell>
                    <TableCell style={{backgroundColor:'#F2C12E', color: 'black',}}align="right">GPA</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
            {contacts.map((contact) => (
                <TableRow
                key={contact.studentID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell style={{backgroundColor:'#003466', color: 'white',}}component="th" scope="row">
                    {contact.firstName}
                </TableCell>
                <TableCell style={{backgroundColor:'#003466', color: 'white',}}component="th" scope="row">
                    {contact.lastName}
                </TableCell>
                <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="right">{contact.studentID}</TableCell>
                <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="right">{contact.email}</TableCell>
                <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="right">{contact.gpa}</TableCell>
                </TableRow>
            ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Button variant="contained" color="secondary" onClick={addList}> Commit Changes </Button>
            </div>
        </div>
        </div>
        </Dialog> 
        </Fragment>
    );
};

export default InputTodo;