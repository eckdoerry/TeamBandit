import {Fragment, React, useState} from "react";

// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { toast } from 'react-toastify';

const EditPassword = ({organizerInfo, setOrganizerChange}) => {
    const [newPassword, setNewPassword] = useState("");
    const [reEnterNewPassword, setReEnterNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setNewPassword("");
        setReEnterNewPassword("");
    };

    const handleClose = () => {
        setOpen(false);
        setNewPassword("");
        setReEnterNewPassword("");
    };

    const updateCourse = async e => {
        e.preventDefault();
        if (!newPassword) {
            alert("Please enter a valid password!");
            return;
        }
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);


        const body = { newPassword };
        await fetch(
            `${process.env.REACT_APP_BASEURL}/auth/changePassword`,
            {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            }
        );
        
        setOrganizerChange(true);
        toast.success("Password changed successfully!");
        handleClose();

        } catch (err) {
        console.error(err.message);
        toast.error("Failed to update password!");
        }
    };

    return(
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change Your Password
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change Password</DialogTitle>

            <DialogContent>

                <DialogContentText>
                Please enter your new password here.
                </DialogContentText>

                <TextField
                autoFocus
                required
                margin="dense"
                label="New password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="standard"
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                />

                <TextField
                required
                margin="dense"
                label="Re-enter new password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="standard"
                value = {reEnterNewPassword}
                error={reEnterNewPassword !== newPassword}
                helperText={reEnterNewPassword !== newPassword ? 'Passwords do not match!' : ' '}
                onChange={(e) => setReEnterNewPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                />

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateCourse}>Change Password</Button>
            </DialogActions>

            </Dialog>
        </Fragment>
    );
}

export default EditPassword