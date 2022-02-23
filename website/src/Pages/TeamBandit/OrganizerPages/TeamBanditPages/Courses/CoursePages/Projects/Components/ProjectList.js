import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// MUI Imports
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
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
        console.log(params.row.team_name);
        return (
            <div>
                <Link target="_blank" to ={`/team-pages/${params.row.team_name}`}> {params.row.team_name} </Link>
                <div style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                    <div>
                        <img
                            src={require("../../../../../../../../Images/logo.png")}
                            alt=""
                            width="100px"
                            height="100px"
                        />
                    </div>
                    <div>
                        <ul>
                            <li>Max Mosier</li>
                            <li>Quinn Melssen</li>
                            <li>Liam Scholl</li>
                            <li>Dakota Battle</li>
                        </ul>
                    </div>  
                </div>
            </div>
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

    const columns = [
        {
            field: "project_name",
            headerName: "Project Title",
            renderCell: projectPage,
            flex: 2,
        },
        {
            field: "client_name",
            headerName: "Project Sponsor",
            flex: 1,
        },
        {
            field: "team_name",
            headerName: "Student Team",
            renderCell: teamPage,
            flex: 2,
        },
        {
            field: "mentor_name",
            headerName: "Team Mentor",
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
            console.log(jsonData);
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
                    rowHeight={"100%"}
                    getRowId={(rows) => rows.project_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                />
            </div>
        </>
    );
};

export default Projects;
