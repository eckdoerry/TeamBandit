import {Fragment, useState, React} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const SimpleModal = ({addCourse}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [course, setCourse] = useState([])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!course) {
      alert('Please add a course')
      return
    }

    addCourse({course})

    setCourse('')
  }

  return (
    <Fragment>
      <Button 
        onClick={handleOpen}>
        Add Course
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add Course
          </Typography>
          <form onSubmit={handleSubmit}>
            <label>
            Course name:
              <input 
                type="text" 
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
              <input type="submit" value="Submit"/>
            </label>
          </form>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default SimpleModal;