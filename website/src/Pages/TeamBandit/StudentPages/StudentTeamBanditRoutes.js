import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TeamBandit Pages //
import Courses from "./TeamBanditPages/Courses/Courses";
import LandingPage from "./TeamBanditPages/LandingPage/LandingPage";
import Profile from "./TeamBanditPages/Profile/Profile";
import Settings from "./TeamBanditPages/Settings/Settings";

/**
 * Utilizes an enum string system to display the correct information inside
 * the TeamBandit application.
 */
const TeamBanditRouter = ({route, studentInfo, setStudentChange}) => {
    
    if(route.text === "Courses" || route === 'Courses') 
    {
        return (
            <Fragment>
                <Courses studentInfo={studentInfo}/>
            </Fragment>
        )
    }
    else if(route.setting === "Profile")
    {
        return (
            <Fragment>
                <Profile studentInfo={studentInfo} setStudentChange={setStudentChange}/>
            </Fragment>
        )
    }
    else if(route === "Settings")
    {
        return (
            <Fragment>
                <Settings studentInfo={studentInfo}/>
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

export default TeamBanditRouter;