import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Schedule() {
    return (
        <div style={{ padding: "25px" }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: 'rgb(250, 192, 26)'}}>
                            <TableCell> Week </TableCell>
                            <TableCell align="center"> Topics and Assignments </TableCell>
                            <TableCell align="left"> Deliverables </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>  
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 1: (1/10) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> <strong> Welcome! First day of class: </strong> Thursday January 13, 2022 <br/> Kickoff Meetings: Opening Comments and Introduction, Thurs 1/13, Friday 1/14 </TableCell>
                        <TableCell></TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 2: (1/17) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> Task: Communication Strategy Memo <br/> Assmt: Software Design Document </TableCell>
                        <TableCell> Due: Communication Memo task</TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 3: (1/24) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}></TableCell>
                        <TableCell></TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 4: (1/31) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> Design Doc Draft Due to mentor </TableCell>
                        <TableCell> Due: Draft of Design Doc </TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 5: (2/7) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> Design DOc, final version due </TableCell>
                        <TableCell> Due: Final Design Doc <br/> Due: Peer Eval # 1, by Friday 3pm </TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 6: (2/14) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> Task: UGRADS Registration </TableCell>
                        <TableCell></TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 7: (2/21) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> DR2 Presentation Guideline Spec </TableCell>
                        <TableCell> Due: UGRADS registration by Friday, close of business </TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 8: (2/28) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> Design Review II presentations (as videos) <br/> DR2: Special video format instructions <br/> Assmt: Full Prototype Tech Demo Milestone Spec. <br/> (Demo "Flight Plan") Template </TableCell>
                        <TableCell> Due Friday: DR2, Step1, videos posted <br/> Prep for Alpha Prototype Demo! </TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 9: (3/7) </TableCell>
                        <TableCell style={{borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> Alpha Demos this week </TableCell>
                        <TableCell> Due: Schedule/hold tech demo with mentor before Spring Break <br/> Due Friday: DR2, step2, your review due back to your assigned teams <br/> Due: Peer Eval#2, by Friday 3pm </TableCell>  
                      </TableRow>
                      <TableRow>
                        <TableCell style={{backgroundColor: '#ffffcc', borderRight: '1px solid #d3d3d3'}}> Week 10: (3/14) </TableCell>
                        <TableCell style={{backgroundColor: '#C7E5BB', borderRight: '1px solid #d3d3d3', textAlign: 'center'}}> <strong> SPRING BREAK </strong> </TableCell>
                        <TableCell style={{backgroundColor: '#C7E5BB'}}></TableCell>  
                      </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default Schedule;