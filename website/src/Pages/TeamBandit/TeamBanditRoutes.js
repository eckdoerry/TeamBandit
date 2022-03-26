import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TeamBandit Pages //
import Courses from "./TeamBanditPages/Courses/Courses";
import Clients from "./TeamBanditPages/Clients/Clients";
import EmailHub from "./TeamBanditPages/EmailHub/EmailHub";
import Profile from "./TeamBanditPages/Profile/Profile";
import Settings from "./TeamBanditPages/Settings/Settings";

/**
 * Utilizes an enum string system to display the correct information inside
 * the TeamBandit application.
 */
const TeamBanditRouter = ({route, userInfo, userIdentifier, setUserChange}) => {
    
    if(route.text === "Courses" || route === "Courses") 
    {
        return (
            <Fragment>
                <Courses userInfo={userInfo} userIdentifier={userIdentifier}/>
            </Fragment>
        )
    }
    else if(route.text === "Email Hub") 
    {
        return (
            <Fragment>
                <EmailHub/>
            </Fragment>
        )
    }
    else if(route.text === "Clients") 
    {
        return (
            <Fragment>
                <Clients/>
            </Fragment>
        )
    }
    else if(route.setting === "Profile")
    {
        return (
            <Fragment>
                <Profile userInfo={userInfo} setUserChange={setUserChange}/>
            </Fragment>
        )
    }
    else if(route === "Settings")
    {
        return (
            <Fragment>
                <Settings userInfo={userInfo} setUserChange={setUserChange}/>
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