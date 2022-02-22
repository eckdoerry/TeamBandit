import { React, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

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
        <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
                <object
                    data={`/uploads/documents/projectOverviews/${projectInfo.projectoverview_filename}`}
                    type="application/pdf"
                    style={{ minHeight: "100vh", width: "100%" }}
                >
                    You are unable to view this document
                </object>
            </div>
            <div style={{ width: "100%" }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Project Sponsor
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary">
                    Example Sponsor
                </Typography>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Team Members
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary">
                    Example Members
                </Typography>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Team Mentor
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary">
                    Example Mentor
                </Typography>
            </div>
        </div>
    );
};

export default ProjectPage;
