import {useEffect, useState, Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TeamBandit Pages //
import StudenTeamBandit from "./StudentTeamBandit";
import MentorTeamBandit from "./MentorTeamBandit";
import TeamBandit from "./TeamBandit";

const UserRouter = ({userIdentifier, setAuth}) => {

    const [user, setUser] = useState("");
    var user_id = localStorage.getItem("user");
    
    const changeUser = (string) => {
        setUser(string);
    };
    
    
    if(userIdentifier === "organizer") //TODO: For some reason the buttons are wack and are setting route.text = to wat I want, for now its fine. Just rn Landing Page needs this.
    {
        return (
            <Fragment>
                <TeamBandit setAuth={setAuth}/>
            </Fragment>
        )
    }
    else if(userIdentifier === "student") //TODO: Try to figure out a uniform route, route.text route.setting, get it all in route
    {
        return (
            <Fragment>
                <StudenTeamBandit setAuth={setAuth}/>
            </Fragment>
        )
    }
    else if(userIdentifier === "mentor") //TODO: Try to figure out a uniform route, route.text route.setting, get it all in route
    {
        return (
            <Fragment>
                <MentorTeamBandit setAuth={setAuth}/>
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

export default UserRouter;