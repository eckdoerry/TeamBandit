import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Course Pages //
import Assignments from './CoursePages/Assignments/Assignments';
import Projects from './CoursePages/Projects/Projects';
import Schedule from './CoursePages/Schedule/Schedule';
import Settings from './CoursePages/Settings/Settings';
import Students from './CoursePages/Students/Students';
import Mentors from './CoursePages/Mentors/Mentors';
import Teams from './CoursePages/Teams/Teams';
import TeamsAssignment from './CoursePages/TeamAssignment/TeamAssignment';

const CourseRouter = ({route, courseInfo, setCoursesChange, setRoute}) => {

    
    if(route === "Projects") 
    {
        return (
            <Fragment>
                <Projects courseInfo={courseInfo} setRoute={setRoute}/>
            </Fragment>
        )
    }
    else if(route === "Students") 
    {
        return (
            <Fragment>
                <Students courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route === "Schedule") 
    {
        return (
            <Fragment>
                <Schedule/>
            </Fragment>
        )
    }
    else if(route === "Assignments") 
    {
        return (
            <Fragment>
                <Assignments/>
            </Fragment>
        )
    }
    else if(route === "Mentors") 
    {
        return (
            <Fragment>
                <Mentors courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route === "Teams") 
    {
        return (
            <Fragment>
                <Teams courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route === "Teams Assignment") 
    {
        return (
            <Fragment>
                <TeamsAssignment courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else if(route === "Settings") 
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