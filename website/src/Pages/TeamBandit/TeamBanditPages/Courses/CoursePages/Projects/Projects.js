import { React } from "react";

// Project Pages
import ProjectList from "./Components/ProjectList";

const Projects = ({ courseInfo, userInfo, userIdentifier, setRoute }) => {
    return(
        <ProjectList courseInfo={courseInfo} userInfo={userInfo} userIdentifier={userIdentifier} setRoute={setRoute}/>
    );
}

export default Projects;