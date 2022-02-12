import {Fragment,React} from "react";
import Dashboard from "./Dashboard";
import './LandingPage.module.css';
import './WelcomeMessage';
import WelcomeMessage from "./WelcomeMessage";

// TODO: Set up route
//import LandingPageRouter from './LandingPageRouter';

const LandingPage = ({organizerInfo}) => {

    return(

        <div>

            <WelcomeMessage organizerInfo={organizerInfo}/>
            
            <Dashboard organizerInfo={organizerInfo}/>
        </div>

    );
}

export default LandingPage;