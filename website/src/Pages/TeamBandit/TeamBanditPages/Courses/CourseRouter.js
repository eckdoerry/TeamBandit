import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Course Pages //
import Assignments from './CoursePages/Assignments/assignments';
import Clients from './CoursePages/Clients/clients';
import Homepage from './CoursePages/Homepage/homepage';
import InfoAndPolicies from './CoursePages/InfoAndPolicies/infoAndPolicies';
import Projects from './CoursePages/Projects/projects';
import Schedule from './CoursePages/Schedule/schedule';
import Settings from './CoursePages/Settings/settings';
import Students from './CoursePages/Students/students';
import Mentors from './CoursePages/Mentors/Mentors';

const CourseRouter = ({route, courseInfo, setCoursesChange}) => {
    console.log(route); //TODO: Delete this
    if(route.page === 'Homepage' || route === 'Homepage') //TODO: For some reason the buttons are wack and are setting route.text = to wat I want, for now its fine. Just rn Landing Page needs this.
    {
        return (
            <Fragment>
                <Homepage/>
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
                <InfoAndPolicies/>
            </Fragment>
        )
    }
    else if(route.page === "Clients") 
    {
        return (
            <Fragment>
                <Clients/>
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