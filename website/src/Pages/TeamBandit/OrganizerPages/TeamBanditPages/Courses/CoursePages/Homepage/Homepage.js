import React, {useEffect, useState} from "react";

// MUI Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Homepage({courseInfo}) {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const getProjects = async () => {
        try {
            const response = await fetch(`http://localhost:5000/projects/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setRows(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };
        
    useEffect(() => {
        getProjects();
        setRowChange(false);
    }, [rowChange]);

  return (
      <div style={{padding:'25px'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">Team Lead</TableCell>
            <TableCell align="right">Project Members</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Team Mentor</TableCell>
            <TableCell align="right">Project Sponsor</TableCell>
            <TableCell align="right">Status Tracker</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.project_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.project_name}
              </TableCell>
              <TableCell align="right">{row.project_team_lead}</TableCell>
              <TableCell align="right">{row.project_member1}</TableCell>
              <TableCell align="right">{row.project_description}</TableCell>
              <TableCell align="right">{row.project_mentor}</TableCell>
              <TableCell align="right">{row.project_sponsor}</TableCell>
              <TableCell align="right">{row.status_tracker}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}