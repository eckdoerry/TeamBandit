import {React} from "react";

// Project Pages
import ProjectList from "./Components/ProjectList";

const Projects = ({studentInfo, courseInfo, setRoute}) => {
    return(
        <ProjectList studentInfo={studentInfo} courseInfo={courseInfo} setRoute={setRoute}/>
    );
}

export default Projects;