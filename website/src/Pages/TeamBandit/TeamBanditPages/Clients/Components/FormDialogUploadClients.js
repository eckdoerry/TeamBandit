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
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

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

import csvExample from "../../../../../Images/exampleClientCsv.PNG";

// Need this to change color schemes
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Idk really, but need it for something I guess
import { styled } from "@mui/material/styles";

import styles from "../Clients.module.css";

import { toast } from "react-toastify";

const FormDialogUploadClients = ({ setClientsChange, setOpen, open }) => {
    // CSV STUFF
    const [highlighted, setHighlighted] = useState(false);
    const [contacts, setContacts] = useState([]);

    const [infoOpen, setInfoOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleInfoClose = () => {
        setInfoOpen(false);
    };

    const handleInfoToggle = () => {
        setInfoOpen(!infoOpen);
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
                            backgroundColor={'#fac01a'}
                            margin="-1.1% -1.1% 2% -1.1%"
                            paddingTop="2%"
                            paddingBottom="2%"
                            padding="1% 1% 1% 2%"
                        >
                            Upload Instructions
                        </Typography>
                        <Typography variant="body2">
                            Currently only the file type of .csv is supported.
                            You will also need to include header rows to
                            properly identify the data. These headers include:
                            firstName, lastName, email, organization, phone,
                            notes, and location. An example of what your file
                            should look like is below.
                        </Typography>
                        <br></br>
                        <Typography variant="body2">
                            If you want to include a 'comment line', you can add
                            # or % at the start of your line. This will not
                            include that line for upload. This would be in the
                            'firstName' column.
                        </Typography>
                        <Typography variant="subtitle1">Example:</Typography>
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

                                Array.from(e.dataTransfer.files)
                                .forEach(async (file) => {
                                    const text = await file.text();
                                    const result = parse(text, {
                                        header: true,
                                    });

                                    for (const val in result.data) {
                                        if (
                                            result.data[
                                                val
                                            ].firstName.startsWith("%") ||
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
                                            for (const val in parsedResult.data) {
                                                if (
                                                    parsedResult.data[
                                                        val
                                                    ].firstName.startsWith(
                                                        "%"
                                                    ) ||
                                                    parsedResult.data[
                                                        val
                                                    ].firstName.startsWith("#")
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
                                                    backgroundColor: "#003466",
                                                    color: "white",
                                                }}
                                                component="th"
                                                scope="row"
                                            >
                                                {contact.firstName}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#003466",
                                                    color: "white",
                                                }}
                                                component="th"
                                                scope="row"
                                            >
                                                {contact.lastName}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#003466",
                                                    color: "white",
                                                }}
                                                align="right"
                                            >
                                                {contact.email}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#003466",
                                                    color: "white",
                                                }}
                                                align="right"
                                            >
                                                {contact.organization}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#003466",
                                                    color: "white",
                                                }}
                                                align="right"
                                            >
                                                {contact.phone}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#003466",
                                                    color: "white",
                                                }}
                                                align="right"
                                            >
                                                {contact.location}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    backgroundColor: "#003466",
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

                        {contacts.length > 0 ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={addList}
                            >
                                {" "}
                                IMPORT{" "}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={addList}
                                disabled
                            >
                                {" "}
                                IMPORT{" "}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormDialogUploadClients;
