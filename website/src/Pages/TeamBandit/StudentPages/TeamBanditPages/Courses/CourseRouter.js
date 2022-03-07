import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Course Pages //
import Assignments from './CoursePages/Assignments/Assignments';
import InfoAndPolicies from './CoursePages/InfoAndPolicies/InfoAndPolicies';
import Schedule from './CoursePages/Schedule/Schedule';
import Teams from './CoursePages/Teams/Teams';
import Projects from "./CoursePages/Projects/Projects";

const CourseRouter = ({route, courseInfo, studentInfo, setCoursesChange, setRoute}) => {

    if(route.page === 'Homepage' || route === 'Homepage') 
    {
        return (
            <Fragment>
                <Schedule/>
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
    else if(route.page === "Projects") 
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
    else if(route.page === "Teams") 
    {
        return (
            <Fragment>
                <Teams courseInfo={courseInfo}/>
            </Fragment>
        )
    }
    else
    {
        return (
            <Fragment>
                <Schedule/>
            </Fragment>
        )
    }
    
}

export default CourseRouter;