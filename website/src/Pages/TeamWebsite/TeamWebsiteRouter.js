import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TeamWebsite Pages //
import Overview from "./Components/Overview";
import Solution from "./Components/Solution";
import Deliverables from "./Components/Deliverables";
import Schedule from "./Components/Schedule";

/**
 * Utilizes an enum string system to display the correct information inside
 * the TeamBandit application.
 */
const TeamWebsiteRouter = ({route, userInfo, userIdentifier, setUserChange}) => {
    
    if(route.text === "Overview" || route === "Overview") 
    {
        return (
            <Fragment>
                <Overview/>
            </Fragment>
        )
    }
    else if(route.text === "Solution") 
    {
        return (
            <Fragment>
                <Solution/>
            </Fragment>
        )
    }
    else if(route.text === "Deliverables") 
    {
        return (
            <Fragment>
                <Deliverables/>
            </Fragment>
        )
    }
    else if(route.setting === "Schedule")
    {
        return (
            <Fragment>
                <Schedule/>
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

export default TeamWebsiteRouter;