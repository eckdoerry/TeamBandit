import {useState, Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TeamBandit Pages //
import Courses from "./TeamBanditPages/Courses/Courses";
import Clients from "./TeamBanditPages/Clients/Clients";
import EmailHub from "./TeamBanditPages/EmailHub/EmailHub";
import LandingPage from "./TeamBanditPages/LandingPage/LandingPage";
import Profile from "./TeamBanditPages/Profile/Profile";
import Settings from "./TeamBanditPages/Settings/Settings";

const TeamBanditRouter = ({route, organizerInfo}) => {
    console.log(route); //TODO: Delete this
    if(route.text === 'Home' || route === 'Home') //TODO: For some reason the buttons are wack and are setting route.text = to wat I want, for now its fine. Just rn Landing Page needs this.
    {
        return (
            <Fragment>
                <LandingPage/>
            </Fragment>
        )
    }
    else if(route.text === "Email Hub") //TODO: Try to figure out a uniform route, route.text route.setting, get it all in route
    {
        return (
            <Fragment>
                <EmailHub/>
            </Fragment>
        )
    }
    else if(route.text === "Courses") //TODO: Try to figure out a uniform route, route.text route.setting, get it all in route
    {
        return (
            <Fragment>
                <Courses organizerInfo={organizerInfo}/>
            </Fragment>
        )
    }
    else if(route.text === "Clients") //TODO: Try to figure out a uniform route, route.text route.setting, get it all in route
    {
        return (
            <Fragment>
                <Clients/>
            </Fragment>
        )
    }
    else if(route.setting === "Profile") //TODO: Try to figure out a uniform route, route.text route.setting, get it all in route
    {
        return (
            <Fragment>
                <Profile/>
            </Fragment>
        )
    }
    else if(route === "Settings") //TODO: Try to figure out a uniform route, route.text route.setting, get it all in route
    {
        return (
            <Fragment>
                <Settings/>
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