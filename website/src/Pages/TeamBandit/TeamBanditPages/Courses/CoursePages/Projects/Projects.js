import { React } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';

// Project Pages
import ProjectList from "./Components/ProjectList";

const Projects = ({ courseInfo, userInfo, userIdentifier, setRoute }) => {
    
    if (userIdentifier == "student" && !courseInfo.course_public) {
        return (
            <div>
                <div style={{padding: '25px'}}>
                    <Alert severity="info">
                        <AlertTitle>The projects are still in progress. </AlertTitle>
                        This page will be changed when the projects are ready.
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <ProjectList
            courseInfo={courseInfo}
            userInfo={userInfo}
            userIdentifier={userIdentifier}
            setRoute={setRoute}
        />
    );
};

export default Projects;
