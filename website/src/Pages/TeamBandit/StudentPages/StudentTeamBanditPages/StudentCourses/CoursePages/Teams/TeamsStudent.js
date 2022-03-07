import  { React, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";

// Page Components
import TeamsListStudent from './Components/TeamsListStudent';

const Teams = ({courseInfo}) => {
    return(
        <TeamsListStudent courseInfo={courseInfo}/>
    );
}

export default Teams;