import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const CourseDialogEdit = (props) => {

    return (
                <div>
                    <DialogTitle>Edit this course</DialogTitle>

                    <DialogContent>

                        <DialogContentText>
                            Please enter course information here.
                        </DialogContentText>

                        <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Course Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value = {props.title}
                        error={props.title === ""}
                        helperText={props.title === "" ? 'This is a required field' : ' '}
                        onChange={props.onTitleChange}
                        />

                        <TextField
                        margin="dense"
                        label="Course Semester"
                        type="text"
                        fullWidth
                        variant="standard"
                        value = {props.semester}
                        onChange={props.onSemesterChange}
                        />

                        <TextField
                        margin="dense"
                        label="Course Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value = {props.description}
                        onChange={props.onDescriptionChange}
                        />

                    </DialogContent>
                </div>
    );
}

export default CourseDialogEdit;