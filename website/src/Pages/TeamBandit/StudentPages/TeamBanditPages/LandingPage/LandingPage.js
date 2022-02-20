import {React} from "react";
import './LandingPage.module.css';
import './Components/WelcomeMessage';

// Page Components
import WelcomeMessage from "./Components/WelcomeMessage";
import Dashboard from "./Components/Dashboard";

const LandingPage = ({studentInfo}) => {
    return(
        <div>
            <WelcomeMessage studentInfo={studentInfo}/>
            <Dashboard studentInfo={studentInfo}/>




        </div>
    );
};

export default LandingPage;