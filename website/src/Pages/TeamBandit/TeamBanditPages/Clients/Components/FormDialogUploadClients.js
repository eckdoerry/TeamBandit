import { useState, React, useEffect } from "react";

// For Parsing the CSVs
import { parse } from "papaparse";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

// Need this to change color schemes
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Idk really, but need it for something I guess
import { styled } from "@mui/material/styles";

import styles from "../Clients.module.css";

import { toast } from "react-toastify";

const FormDialogUploadClients = ({setClientsChange, setOpen, open}) => {

    // CSV STUFF
    const [highlighted, setHighlighted] = useState(false);
    const [contacts, setContacts] = useState([]);

    const handleToggle = () => {
        setOpen(!open);
    };

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

    const addList = async (e) => {
        e.preventDefault();
        for (const client in contacts) {
            
            const client_fname_csv = contacts[client].firstName;
            const client_lname_csv = contacts[client].lastName;
            const client_email_csv = contacts[client].email;
            const client_organization_csv = contacts[client].organization;
            const client_phone_csv = contacts[client].phone;
            const client_notes_csv = contacts[client].notes;
            const client_location_csv = contacts[client].location;

            try {
                const body = {
                    client_fname_csv,
                    client_lname_csv,
                    client_email_csv,
                    client_organization_csv,
                    client_phone_csv,
                    client_notes_csv,
                    client_location_csv,
                };
                const myHeaders = new Headers();

                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("token", localStorage.token);

                await fetch(`${process.env.REACT_APP_BASEURL}/clients/csv/`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                });

                toast.success("Client was added successfully!");
                setClientsChange(true);

                setContacts([]);
                handleToggle();
            } catch (error) {
                console.error(error.message);
                toast.error("Failed to add client!");
            }
        }
    };

    return (
        <div>
                <div className={styles.csv}>
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

                                    Array.from(e.dataTransfer.files)
                                        .filter(
                                            (file) =>
                                                file.type ===
                                                "application/vnd.ms-excel"
                                        )
                                        .forEach(async (file) => {
                                            const text = await file.text();
                                            const result = parse(text, {
                                                header: true,
                                            });
                                            setContacts((existing) => [
                                                ...existing,
                                                ...result.data,
                                            ]);
                                        });
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
                                                setContacts((existing) => [
                                                    ...existing,
                                                    ...parsedResult.data,
                                                ]);
                                            });
                                        }}
                                    />

                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload .CSV File
                                    </Button>
                                </ThemeProvider>
                            </label>
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
                                                    backgroundColor: "#F2C12E",
                                                    color: "black",
                                                }}
                                            >
                                                First Name
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#F2C12E",
                                                    color: "black",
                                                }}
                                            >
                                                Last Name
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#F2C12E",
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                Email
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#F2C12E",
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                Organization
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#F2C12E",
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                Phone Number
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#F2C12E",
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                Location
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#F2C12E",
                                                    color: "black",
                                                }}
                                                align="right"
                                            >
                                                Notes
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contacts.map((contact) => (
                                            <TableRow
                                                key={contact.email}
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
                                                    {contact.organization}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        backgroundColor:
                                                            "#003466",
                                                        color: "white",
                                                    }}
                                                    align="right"
                                                >
                                                    {contact.phone}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        backgroundColor:
                                                            "#003466",
                                                        color: "white",
                                                    }}
                                                    align="right"
                                                >
                                                    {contact.notes}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>
                            
                            <Button
                                variant="outlined"
                                

                                onClick={handleToggle}
                            >
                            {" "}
                            Cancel
                            {" "}
                            </Button>

                            {" "}
                            
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={addList}
                            >
                                {" "}
                                Commit Changes
                                {" "}
                            </Button>
                            
                            {" "}
                            

                        </div>
                    </div>
                </div>
        </div>
    );
};

export default FormDialogUploadClients;