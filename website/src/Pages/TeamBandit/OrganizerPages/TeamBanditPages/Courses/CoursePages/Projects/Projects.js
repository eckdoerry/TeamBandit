import {Fragment, React} from "react";

// Stylesheet
import styles from "./Projects.module.css";

// Project Pages
import ProjectList from "./Components/ProjectList";

const Projects = ({courseInfo, setRoute}) => {
    return(
        <ProjectList courseInfo={courseInfo} setRoute={setRoute}/>
    );
}

export default Projects;