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

import FormDialogUploadClients from "./FormDialogUploadClients";

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
    const [clientLocation, setClientLocation] = useState("");
    const [failedSubmit, setFailedSubmit] = useState(false);

    // CSV STUFF
    const [highlighted, setHighlighted] = useState(false);
    const [contacts, setContacts] = useState([]);

    const [individualAddOpen, setIndividualAddOpen] = useState(false);

    const resetAllFields = () => {
        setClientFName("");
        setClientLName("");
        setClientOrganization("");
        setClientEmail("");
        setClientPhoneNumber("");
        setClientNotes("");
        setFailedSubmit(false);
    }

    const handleIndividualClickOpen = () => {
        setIndividualAddOpen(true);
    };

    const handleIndividualClose = () => {
        setIndividualAddOpen(false);
        resetAllFields();
    };

    const handleClickOpen = () => {
        setOpen(true);
        setFailedSubmit(false);
    };

    const handleClose = (event) => {
        handleIndividualClose();
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
                clientLocation,
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
            setClientLocation("");
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to add client!");
        }
        handleClose();
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
                        <TextField
                            margin="dense"
                            label="Location"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={clientLocation}
                            onChange={(e) => setClientLocation(e.target.value)}
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
                onClose={handleToggle}
                >
                    <FormDialogUploadClients setClientsChange={setClientsChange} setOpen={setOpen} open={open}/>
                </Dialog>
                
            </div>
        );
};

export default FormDialogAddClient;
