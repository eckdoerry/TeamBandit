import { useState, React } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast } from "react-toastify";

const AddClient = ({ setClientsChange }) => {
    const [open, setOpen] = useState(false);
    const [clientName, setClientName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!clientName || !company || !email) {
            alert("Please fill out all required fields");
            return;
        }
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = { clientName, email, company, notes };
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
            setClientName("");
            setCompany("");
            setEmail("");
            setNotes("");
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to add client!");
        }
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Client
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a New Client</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Enter client information here
                    </DialogContentText>

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        label="Client Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clientName}
                        error={clientName === ""}
                        helperText={
                            clientName === "" ? "Client name is required" : " "
                        }
                        onChange={(e) => setClientName(e.target.value)}
                    />

                    <TextField
                        required
                        margin="dense"
                        label="Company/Location"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={company}
                        error={company === ""}
                        helperText={
                            company === ""
                                ? "Client company/location is required"
                                : " "
                        }
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <TextField
                        type="email"
                        margin="dense"
                        label="Client Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={email}
                        error={email === ""}
                        helperText={
                            email === "" ? "Client email is required" : " "
                        }
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        label="Notes"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmitForm}>Add Client</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddClient;
