import {React} from "react";

// Project Pages
import ProjectList from "./Components/ProjectList";

const Projects = ({courseInfo, setRoute}) => {
    return(
        <ProjectList courseInfo={courseInfo} setRoute={setRoute}/>
    );
}

export default Projects;