import {React} from "react";

// Project Pages
import ProjectList from "./Components/ProjectListStudent";

const Projects = ({studentInfo, courseInfo, setRoute}) => {
    return(
        <ProjectList studentInfo={studentInfo} courseInfo={courseInfo} setRoute={setRoute}/>
    );
}

export default Projects;