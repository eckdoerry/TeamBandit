import { useState, React } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialogAddCourse = ({addCourse}) => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleAddCourse = (event) => {
    event.preventDefault();
    if(!course) {
      alert('Please add a course or click cancel');
      return;
    }

    addCourse({course})

    setCourse('')
    handleClose(event);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a New Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of your course here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Course name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCourse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddCourse}>Add Course</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialogAddCourse;