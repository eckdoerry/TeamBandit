import {React} from "react";
import './LandingPageStudent.module.css';

// Page Components
import WelcomeMessage from "./Components/WelcomeMessageStudent";
import Dashboard from "./Components/DashboardStudent";

const LandingPageStudent = ({studentInfo}) => {
    return(
        <div>
            <WelcomeMessage studentInfo={studentInfo}/>
            <Dashboard studentInfo={studentInfo}/>




        </div>
    );
};

export default LandingPageStudent;