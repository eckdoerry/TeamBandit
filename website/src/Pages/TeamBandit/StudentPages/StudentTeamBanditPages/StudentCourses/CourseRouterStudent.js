import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Course Pages //
import Assignments from './CoursePages/Assignments/AssignmentsStudent';
import Projects from "./CoursePages/Projects/ProjectsStudent";

const CourseRouterStudent = ({route, courseInfo, studentInfo, setCoursesChange, setRoute}) => {

    if(route === "Projects") 
    {
        return (
            <Fragment>
                <Projects studentInfo={studentInfo} courseInfo={courseInfo} setRoute={route}/>
            </Fragment>
        )
    }
    else if(route.page === "Assignments") 
    {
        return (
            <Fragment>
                <Assignments/>
            </Fragment>
        )
    }
    else
    {
        return (
            <Fragment>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    The page is not displayed correctly — <strong>please refresh!</strong>
                </Alert>
            </Fragment>
        )
    }
    
}

export default CourseRouterStudent;