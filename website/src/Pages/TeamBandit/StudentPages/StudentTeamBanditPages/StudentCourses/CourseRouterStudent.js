import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Course Pages //
import Assignments from './CoursePages/Assignments/AssignmentsStudent';
import InfoAndPolicies from './CoursePages/InfoAndPolicies/InfoAndPoliciesStudent';
import Schedule from './CoursePages/Schedule/ScheduleStudent';
import Teams from './CoursePages/Teams/TeamsStudent';
import Projects from "./CoursePages/Projects/ProjectsStudent";

const CourseRouterStudent = ({route, courseInfo, studentInfo, setCoursesChange, setRoute}) => {

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

export default CourseRouterStudent;