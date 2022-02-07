import {Fragment, React, useState, useEffect} from "react";

import styles from "./Guest.module.css";

import Course from "../TeamBandit/TeamBanditPages/Courses/Course";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [coursesChange, setCoursesChange] = useState(false);

    const getCourses = async () =>
    {
        try {
            const response = await fetch("http://localhost:5000/courses/guest", {method: "GET"});

            const parseData = await response.json();

            setCourses(parseData);

        } catch (error) {
            console.error(error.message);
        }
    }

    // Updates Page
    useEffect(() => {
        getCourses();
        setCoursesChange(false);
    }, [coursesChange]);

    console.log(courses);

    return(
        <Fragment>
            <AppBar sx={{ background: "#002454" }} position="relative">
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                TeamBandit Guest Page
            </Typography>
            </Toolbar>
        </AppBar>
        <div className={styles.container}>
            <div>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search for Course"
                        inputProps={{ 'aria-label': 'search courses' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            <div className={styles.courseContainer}>
                {courses.map((course) => (                   
                <Course key={course.course_id} courseInfo={course} courseChange={setCoursesChange}/>))}
                
            </div>
        </div>
        </Fragment>
    );
}

export default Courses;