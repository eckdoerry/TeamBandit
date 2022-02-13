import {Fragment, React} from "react";

// Stylesheet
import styles from "./Projects.module.css";

// Project Pages
import ProjectList from "./Components/ProjectList";

const Projects = ({courseInfo}) => {
    return(
        <ProjectList courseInfo={courseInfo}/>
    );
}

export default Projects;