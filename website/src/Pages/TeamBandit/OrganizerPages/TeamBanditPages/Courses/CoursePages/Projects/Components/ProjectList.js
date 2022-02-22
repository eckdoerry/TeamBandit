import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// MUI Imports
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";

// Page Components
import AddProject from "./AddProject";
import TeamsAssignment from "./TeamAssignmentButton";
import EditProject from "./EditProject";

const Projects = ({ courseInfo, setRoute }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const deleteButton = (params) => {
        return (
            <strong>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteProject(params.row.project_id)}
                    startIcon={<DeleteIcon />}
                >
                    {" "}
                    Delete{" "}
                </Button>
            </strong>
        );
    };

    const editButton = (params) => {
        return (
            <EditProject
                project={params.row}
                setRowChange={setRowChange}
                courseInfo={courseInfo}
            />
        );
    };

    const teamPage = (params) => {
        return (
            <Link target="_blank" to={`/team-pages/${params.row.team_name}`}>
                {" "}
                {params.row.team_name}{" "}
            </Link>
        );
    };

    const projectPage = (params) => {
        return (
            <Link target="_blank" to={`/project-pages/${params.row.project_name}`}>
                {" "}
                {params.row.project_name}{" "}
            </Link>
        );
    };

    /*
    const projectPage = (params) => {
        return (
            <a target="_blank" rel="noreferrer" href={`/uploads/documents/projectOverviews/${params.row.projectoverview_filename}`}>
                {" "}
                {params.row.project_name}{" "}
            </a>
        );
    };
    */

    const columns = [
        {
            field: "project_name",
            headerName: "Project Name",
            renderCell: projectPage,
            flex: 2,
        },
        {
            field: "project_short_name",
            headerName: "Project Short Name",
            flex: 1,
        },
        {
            field: "team_name",
            headerName: "Student Team",
            renderCell: teamPage,
            flex: 1,
        },
        {
            field: "project_mentor",
            headerName: "Team Mentor",
            flex: 1,
        },
        {
            field: "project_sponsor",
            headerName: "Project Sponsor",
            flex: 1,
        },
        {
            field: "status_tracker",
            headerName: "Status Tracker",
            flex: 1,
        },

        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: editButton,
            disableClickEventBubbling: true,
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: deleteButton,
            disableClickEventBubbling: true,
        },
    ];

    const CustomToolbar = () => {
        return (
            
                <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }} >
                    <Typography sx={{ m: 1 }} variant="h4">
                        Projects
                    </Typography>
                    <GridToolbarColumnsButton sx={{ m: 1 }} />
                    <GridToolbarFilterButton sx={{ m: 1 }} />
                    <GridToolbarDensitySelector sx={{ m: 1 }} />
                    <GridToolbarExport sx={{ m: 1 }} />
                    <AddProject
                            courseInfo={courseInfo}
                            rows={rows}
                            setRowChange={setRowChange}
                        />
                    <TeamsAssignment setRoute={setRoute} />
                </GridToolbarContainer>
        );
    };

    // Delete function
    const deleteProject = async (id) => {
        try {
            await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/projects/${id}/`,
                {
                    method: "DELETE",
                    headers: { token: localStorage.token },
                }
            );

            toast.success("Project was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete project!");
        }
    };

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProjects();
        setRowChange(false);
    }, [rowChange]);

    return (
        <>
        <div
            style={{
                padding: "25px",
                display: "flex",
                height: "100%",
                width: "100%",
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows.project_id}
                components={{ Toolbar: CustomToolbar }}
                disableSelectionOnClick
            />
        </div>
        </>
    );
};

export default Projects;
