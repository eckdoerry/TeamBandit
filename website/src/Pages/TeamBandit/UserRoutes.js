import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TeamBandit Pages 
import StudenTeamBandit from "./StudentPages/TeamBanditStudent";
import MentorTeamBandit from "./MentorPages/MentorTeamBandit";
import TeamBandit from "./OrganizerPages/TeamBandit";

/**
 * Checks for what type of user is signed in, then displays the
 * corresponding TeamBandit application.
 * 
 * @param userIdentifier Identifier of what type of user is signed in
 * @param setAuth Used to set the authentication of users
 */
const UserRouter = ({userIdentifier, setAuth}) => {
    
    if(userIdentifier === "organizer") 
    {
        return (
            <Fragment>
                <TeamBandit setAuth={setAuth}/>
            </Fragment>
        )
    }
    else if(userIdentifier === "student") 
    {
        return (
            <Fragment>
                <StudenTeamBandit setAuth={setAuth}/>
            </Fragment>
        )
    }
    else if(userIdentifier === "mentor") 
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