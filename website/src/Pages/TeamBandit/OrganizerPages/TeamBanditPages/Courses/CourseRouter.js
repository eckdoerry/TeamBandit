import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Course Pages //
import Assignments from './CoursePages/Assignments/Assignments';
import Homepage from './CoursePages/Homepage/Homepage';
import InfoAndPolicies from './CoursePages/InfoAndPolicies/InfoAndPolicies';
import Projects from './CoursePages/Projects/Projects';
import Schedule from './CoursePages/Schedule/Schedule';
import Settings from './CoursePages/Settings/Settings';
import Students from './CoursePages/Students/Students';
import Mentors from './CoursePages/Mentors/Mentors';

const CourseRouter = ({route, courseInfo, setCoursesChange}) => {
    
    if(route.page === 'Homepage' || route === 'Homepage') 
    {
        return (
            <Fragment>
                <Homepage courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route.page === "Projects") 
    {
        return (
            <Fragment>
                <Projects courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route.page === "Students") 
    {
        return (
            <Fragment>
                <Students courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route.page === "Schedule") 
    {
        return (
            <Fragment>
                <Schedule/>
            </Fragment>
        )
    }
    else if(route.page === "Info and Policies") 
    {
        return (
            <Fragment>
                <InfoAndPolicies courseInfo={courseInfo}/>
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
    else if(route.page === "Mentors") 
    {
        return (
            <Fragment>
                <Mentors courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route.page === "Settings") 
    {
        return (
            <Fragment>
                <Settings courseInfo={courseInfo} setCoursesChange={setCoursesChange}/>
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

export default CourseRouter;