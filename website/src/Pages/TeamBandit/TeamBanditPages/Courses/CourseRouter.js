import {React} from "react"

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
import TeamsAssignment from './CoursePages/TeamAssignment/TeamAssignment';

const CourseRouter = ({route, courseInfo, userInfo, userIdentifier, setCoursesChange, setRoute}) => {

    if(route === "Projects") 
    {
        return (
            <Projects courseInfo={courseInfo} userInfo={userInfo} userIdentifier={userIdentifier} setRoute={setRoute}/>
        )
    }
    else if(route === "Students") 
    {
        return (
            <Students courseInfo={courseInfo}/>
        )
    }
    else if(route === "Schedule") 
    {
        return (
            <Schedule courseInfo={courseInfo} userInfo={userInfo} userIdentifier={userIdentifier}/>
        )
    }
    else if(route === "Assignments") 
    {
        return (
            <Assignments courseInfo={courseInfo} setRoute={setRoute}/>
        )
    }
    else if(route === "Mentors") 
    {
        return (
            <Mentors courseInfo={courseInfo}/>
        )
    }
    else if(route === "Teams Assignment") 
    {
        return (
            <TeamsAssignment courseInfo={courseInfo} setRoute={setRoute} userIdentifier={userIdentifier}/>
        )
    }
    else if(route === "Settings") 
    {
        return (
            <Settings courseInfo={courseInfo} userInfo={userInfo} userIdentifier={userIdentifier} setCoursesChange={setCoursesChange}/>
        )
    }
    else
    {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                The page is not displayed correctly — <strong>please refresh!</strong>
            </Alert>
        )
    }
    
}

export default CourseRouter;