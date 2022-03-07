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

const FormDialogAddClient = ({ setClientsChange }) => {
    const [open, setOpen] = useState(false);
    const [clientFName, setClientFName] = useState("");
    const [clientLName, setClientLName] = useState("");
    const [clientOrganization, setClientOrganization] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhoneNumber, setClientPhoneNumber] = useState("");
    const [clientNotes, setClientNotes] = useState("");
    const [failedSubmit, setFailedSubmit] = useState(false);

    // CSV STUFF
    const [highlighted, setHighlighted] = useState(false);
    const [contacts, setContacts] = useState([]);

    const [individualAddOpen, setIndividualAddOpen] = useState(false);

    const handleIndividualClickOpen = () => {
        setIndividualAddOpen(true);
    };

    const handleIndividualClose = () => {
        setIndividualAddOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setFailedSubmit(false);
    };

    const handleClose = (event) => {
        setOpen(false);
        setFailedSubmit(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (
            !clientFName ||
            !clientLName ||
            !clientOrganization ||
            !clientEmail
        ) {
            setFailedSubmit(true);
            return;
        }
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = {
                clientFName,
                clientLName,
                clientEmail,
                clientOrganization,
                clientPhoneNumber,
                clientNotes,
            };
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/clients/addclient`,
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            //const parseResponse = await response.json();

            toast.success("Client added successfully!");

            setClientsChange(true);
            setClientFName("");
            setClientLName("");
            setClientOrganization("");
            setClientEmail("");
            setClientPhoneNumber("");
            setClientNotes("");
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to add client!");
        }
        handleClose();
    };

    const addList = async (e) => {
        e.preventDefault();
        for (const client in contacts) {
            console.log(contacts[client]);
            const client_fname_csv = contacts[client].firstName;
            const client_lname_csv = contacts[client].lastName;
            const client_email_csv = contacts[client].email;
            const client_organization_csv = contacts[client].organization;
            const client_phone_csv = contacts[client].phone;
            const client_notes_csv = contacts[client].notes;

            try {
                const body = {
                    client_fname_csv,
                    client_lname_csv,
                    client_email_csv,
                    client_organization_csv,
                    client_phone_csv,
                    client_notes_csv
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
        <div style={{ paddingLeft: "25px", paddingBottom: "5px" }}>
            <Button variant="outlined" onClick={handleIndividualClickOpen}>
                Add Client
            </Button>

            <Dialog open={individualAddOpen} onClose={handleIndividualClose}>
                <DialogTitle>Add a New Client</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Enter client information here
                    </DialogContentText>

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        label="Client First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clientFName}
                        error={clientFName === "" && failedSubmit}
                        helperText={
                            clientFName === "" && failedSubmit
                                ? "Client first name is required"
                                : " "
                        }
                        onChange={(e) => setClientFName(e.target.value)}
                    />

                    <TextField
                        required
                        
                        margin="dense"
                        label="Client Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clientLName}
                        error={clientLName === "" && failedSubmit}
                        helperText={
                            clientLName === "" && failedSubmit
                                ? "Client last name is required"
                                : " "
                        }
                        onChange={(e) => setClientLName(e.target.value)}
                    />

                    

                    <TextField
                        required
                        margin="dense"
                        label="Organization"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clientOrganization}
                        error={clientOrganization === "" && failedSubmit}
                        helperText={
                            clientOrganization === "" && failedSubmit
                                ? "Client organization is required"
                                : " "
                        }
                        onChange={(e) => setClientOrganization(e.target.value)}
                    />

                    <TextField
                        required
                        margin="dense"
                        label="Client Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={clientEmail}
                        error={clientEmail === "" && failedSubmit}
                        helperText={
                            clientEmail === "" && failedSubmit
                                ? "Client email is required"
                                : " "
                        }
                        onChange={(e) => setClientEmail(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clientPhoneNumber}
                        onChange={(e) => setClientPhoneNumber(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        label="Notes"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmitForm}>Add Client</Button>
                </DialogActions>
            </Dialog>
            <Button
                sx={{ m: 3, pl: 5, pr: 5 }}
                style={{ textAlign: "center", whiteSpace: "nowrap" }}
                size="large"
                variant="outlined"
                color="secondary"
                onClick={handleToggle}
                startIcon={<FileUploadIcon />}
            >
                {" "}
                Upload Client List{" "}
            </Button>
            <Dialog
                maxHeight={"lg"}
                maxWidth={"lg"}
                open={open}
                onClose={handleClose}
            >
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
                                variant="contained"
                                color="secondary"
                                onClick={addList}
                            >
                                {" "}
                                Commit Changes{" "}
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default FormDialogAddClient;
