import { React, useState, useEffect } from "react";

/**
 * Acts as an info page for TeamBandit,
 * may or not be used
 */
const ProjectPage = () => {
    const windowValue = window.location.pathname.replace("/project-pages/", "");
    const regExp = /%20/g;
    const projectname = windowValue.replace(regExp, " ");

    const [projectInfo, setProjectInfo] = useState([]);

    useEffect(() => {
        const getProjectOverview = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASEURL}/projects/project-name/${projectname}`,
                    { method: "GET", headers: { token: localStorage.token } }
                );
                const jsonData = await response.json();
    
                setProjectInfo(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };
        getProjectOverview();
    });

    return (
        <object data={`/uploads/documents/projectOverviews/${projectInfo.projectoverview_filename}`} type="application/pdf" style={{minHeight:"100vh", width:"100%"}}>You are unable to view this document</object>
    );
};

export default ProjectPage;
