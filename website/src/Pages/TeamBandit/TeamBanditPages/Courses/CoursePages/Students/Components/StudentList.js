import React, {Fragment, useEffect, useState} from "react";

import EditStudent from "./EditStudent";
import styles from '../students.module.css';

// This stuff is for the Tables
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';

// components
import AddStudent from "./AddStudent";
import { toast } from 'react-toastify';

const ListStudents = ({courseInfo}) => {
    const [students, setStudents] = useState([]);
    const [studentsChange, setStudentsChange] = useState(false);

    // Delete function
    const deleteStudent = async (id) => {
        try {
            const deleteStudent = await fetch(`http://localhost:5000/students/students/${id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });


            toast.success("Student was deleted!");
            setStudentsChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete student!");
        }
    }
    
    const getStudents = async () => {
        try {
            const response = await fetch(`http://localhost:5000/students/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setStudents(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };
    
    useEffect(() => {
        getStudents();
        setStudentsChange(false);
    }, [studentsChange]);


    return(
        <Fragment className = {styles.container}>
            <AddStudent courseInfo={courseInfo} setStudentsChange={setStudentsChange}/>
            <div className={styles.container}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}style={{backgroundColor:'#F2C12E', color: 'black',}}>First Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}style={{backgroundColor:'#F2C12E', color: 'black',}}>Last Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}style={{backgroundColor:'#F2C12E', color: 'black',}} align="right">Student ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}style={{backgroundColor:'#F2C12E', color: 'black',}}align="right">Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}style={{backgroundColor:'#F2C12E', color: 'black',}}align="right">GPA</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}style={{backgroundColor:'#F2C12E', color: 'black',}}align="right">Edit</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}style={{backgroundColor:'#F2C12E', color: 'black',}}align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                {students.map((student) => (
                    <TableRow
                    key={student.student_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell style={{backgroundColor:'#003466', color: 'white',}}component="th" scope="row">
                        {student.student_fname}
                    </TableCell>
                    <TableCell style={{backgroundColor:'#003466', color: 'white',}}component="th" scope="row">
                        {student.student_lname}
                    </TableCell>
                    <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="right">{student.student_emplid}</TableCell>
                    <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="right">{student.student_email}</TableCell>
                    <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="right">{student.student_gpa}</TableCell>
                    <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="right"> <EditStudent student = {student} setStudentsChange={setStudentsChange}/> </TableCell>
                    <TableCell style={{backgroundColor:'#003466', color: 'white',}}align="center"> <Button onClick = {() => deleteStudent(student.student_id)} variant="contained" color="error"> Delete </Button></TableCell>
                    </TableRow>
                ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
            </Fragment>
    ); 
};

export default ListStudents;