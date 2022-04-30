import { React, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router-dom";

const Deliverables = ({ teamInfo, colorValue, fontColor }) => {
    const [team_documents, setTeamDocuments] = useState([]);

    const getTeamDocuments = async () => {
        try {
            const documentInfo = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/submittedTeamAssignments/${teamInfo[0].team_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const documentData = await documentInfo.json();

            setTeamDocuments(documentData);

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTeamDocuments();
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                paddingLeft: "300px",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexFlow: "column",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    padding: "10px",
                }}
            >
                <Typography style={{ height: "10%" }} variant="h2">
                    {" "}
                    Documentation
                </Typography>
                <TableContainer style={{ height: "90%" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    style={{
                                        backgroundColor: `${colorValue}`,
                                        color: `${fontColor}`,
                                        fontSize: "large",
                                    }}
                                >
                                    Title
                                </TableCell>
                                <TableCell
                                    style={{
                                        backgroundColor: `${colorValue}`,
                                        color: `${fontColor}`,
                                        fontSize: "large",
                                    }}
                                    align="center"
                                >
                                    Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {team_documents.map((document) => (
                            <TableRow key={document.assignment_id}>
                                <TableCell align="center">
                                    {" "}
                                    <Link
                                        target="_blank"
                                        to={`/submission/studentAssignment-${document.submission_id}`}
                                    >
                                        {" "}
                                        <Typography variant="h5">
                                            {document.assignment_name}
                                        </Typography>
                                    </Link>{" "}
                                </TableCell>
                                <TableCell align="center"> 
                                    <Typography variant="h5">
                                        {document.submission_time.split(",")[0]}
                                    </Typography> 
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Deliverables;
