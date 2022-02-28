import { useState, React } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { toast } from 'react-toastify';

const FormDialogAddClient = ({setClientsChange}) => {
  const [open, setOpen] = useState(false);
  const [clientFName, setClientFName] = useState("");
  const [clientLName, setClientLName] = useState("");
  const [clientOrganization, setClientOrganization] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [failedSubmit, setFailedSubmit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    if (!clientFName || !clientLName || !clientOrganization || !clientEmail){
      setFailedSubmit(true);
      return;
    }
    try {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", localStorage.token);

        const body = { clientFName, clientLName, clientEmail, clientOrganization, clientPhoneNumber, clientNotes };
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/clients/addclient`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(body)
        });

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
            label="Client Last Name"
            type="text"
            fullWidth
            variant="standard"
            value = {clientLName}
            error={clientLName === "" && failedSubmit}
            helperText={clientLName === "" ? 'Client last name is required' : ' '}
            onChange={(e) => setClientLName(e.target.value)}
          />

          <TextField
            required
            margin="dense"
            label="Client First Name"
            type="text"
            fullWidth
            variant="standard"
            value = {clientFName}
            error={clientFName === "" && failedSubmit}
            helperText={clientFName === "" ? 'Client first name is required' : ' '}
            onChange={(e) => setClientFName(e.target.value)}
          />

          <TextField
            required
            margin="dense"
            label="Organization"
            type="text"
            fullWidth
            variant="standard"
            value = {clientOrganization}
            error={clientOrganization === "" && failedSubmit}
            helperText={clientOrganization === "" ? 'Client organization is required' : ' '}
            onChange={(e) => setClientOrganization(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Client Email"
            type="email"
            fullWidth
            variant="standard"
            value = {clientEmail}
            error={clientEmail === "" && failedSubmit}
            helperText={clientEmail === "" ? 'Client email is required' : ' '}
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
          <Button onClick = {onSubmitForm}>Add Client</Button>
        </DialogActions>

      </Dialog>

    </div>
  );
}

export default FormDialogAddClient;
