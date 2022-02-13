import { useState, React } from 'react';

// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const FormDialogAddClient = ({addClient}) => {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState("");
  const [clientName, setClientName] = useState("");
  const [where, setWhere] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const onSubmitForm = () => {
    addClient({id, clientName, where, email, notes});
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a New Client
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter client information here.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
            value = {id}
            error={id === ""}
            helperText={id === "" ? 'Client ID is required' : ' '}
            onChange={(e) => setID(e.target.value)}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            label="Client Name"
            type="text"
            fullWidth
            variant="standard"
            value = {clientName}
            error={clientName === ""}
            helperText={clientName === "" ? 'Client name is required' : ' '}
            onChange={(e) => setClientName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Where?"
            type="text"
            fullWidth
            variant="standard"
            value = {where}
            error={where === ""}
            helperText={where === "" ? 'Client location is required' : ' '}
            onChange={(e) => setWhere(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Client Email"
            type="text"
            fullWidth
            variant="standard"
            value = {email}
            error={email === ""}
            helperText={email === "" ? 'Client email is required' : ' '}
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
          <Button onClick = {onSubmitForm}>Add Client</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialogAddClient;