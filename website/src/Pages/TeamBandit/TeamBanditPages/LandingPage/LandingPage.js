import {Fragment,React} from "react";
import Dashboard from "./Dashboard";
import './LandingPage.module.css';
import './WelcomeMessage';
import WelcomeMessage from "./WelcomeMessage";

// TODO: Set up route
//import LandingPageRouter from './LandingPageRouter';

const LandingPage = () => {

    return(

        <div>

            <WelcomeMessage />
            
            <Dashboard />
        </div>

    );
}

export default LandingPage;