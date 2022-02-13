import {React} from "react";
import './LandingPage.module.css';
import './Components/WelcomeMessage';

// Page Components
import WelcomeMessage from "./Components/WelcomeMessage";
import Dashboard from "./Components/Dashboard";

const LandingPage = ({organizerInfo}) => {
    return(
        <div>
            <WelcomeMessage organizerInfo={organizerInfo}/>
            <Dashboard organizerInfo={organizerInfo}/>
        </div>
    );
};

export default LandingPage;