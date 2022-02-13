import { useState, React } from 'react';

// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { toast } from 'react-toastify';

const EditBioDialog = ({setOrganizerChange}) => {
  const [open, setOpen] = useState(false);
  const [bioText, setBioText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!bioText) {
      alert("Please add a Bio");
      return;
    }
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { bioText };
      const response = await fetch("http://localhost:5000/general/bio", {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      toast.success(parseResponse);

      setOrganizerChange(true);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to change bio!");
    }
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit your Bio
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter bio here.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Bio"
            type="text"
            fullWidth
            variant="standard"
            value = {bioText}
            error={bioText === ""}
            helperText={bioText === "" ? 'This is a required field' : ' '}
            onChange={(e) => setBioText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitForm}>Submit Bio</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditBioDialog;