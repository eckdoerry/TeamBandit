import {Fragment, React} from "react"

// Material UI Imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TeamWebsite Pages //
import Overview from "./Components/Overview";
import Solution from "./Components/Solution";
import Deliverables from "./Components/Deliverables";
import Schedule from "./Components/Schedule";
import Requirements from "./Components/Requirements";
import Team from "./Components/Team";

/**
 * Utilizes an enum string system to display the correct information inside
 * the TeamBandit application.
 */
const TeamWebsiteRouter = ({route, colorValue, teamInfo, fontColor, teamMembers, projectInfo}) => {
    
    if(route === "Overview") 
    {
        return (
            <Overview colorValue={colorValue} teamInfo={teamInfo} fontColor={fontColor}/>
        );
    }
    else if(route === "Project Summary") 
    {
        return (
            <Fragment>
                <Solution/>
            </Fragment>
        )
    }
    else if(route === "Documentation") 
    {
        return (
            <Fragment>
                <Deliverables colorValue={colorValue} fontColor={fontColor} />
            </Fragment>
        )
    }
    else if(route === "The Team") 
    {
        return (
            <Fragment>
                <Team teamMembers={teamMembers} projectInfo={projectInfo}/>
            </Fragment>
        )
    }
    else if(route === "Schedule")
    {
        return (
            <Fragment>
                <Schedule/>
            </Fragment>
        )
    }
    else if(route === "Requirements")
    {
        return (
            <Fragment>
                <Requirements/>
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