import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// MUI Imports
import Typography from "@mui/material/Typography";

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const Projects = ({ courseInfo, setRoute }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const teamPage = (params) => {
        return (
            <Link to={`/team-pages/${params.row.team_name}`}>
                {" "}
                {params.row.team_name}{" "}
            </Link>
        );
    };

    const projectPage = (params) => {
        return (
            <Link to={`/project-pages/${params.row.project_name}`}>
                {" "}
                {params.row.project_name}{" "}
            </Link>
        );
    };

    const columns = [
        {
            field: "project_name",
            headerName: "Project Name",
            renderCell: projectPage,
            flex: 1,
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
    ];

    const CustomToolbar = () => {
        return (
            
            
                <GridToolbarContainer>
                    <Typography sx={{ m: 1 }} variant="h4">
                        Projects
                    </Typography>
                    <GridToolbarColumnsButton sx={{ m: 1 }} />
                    <GridToolbarFilterButton sx={{ m: 1 }} />
                    <GridToolbarDensitySelector sx={{ m: 1 }} />
                    <GridToolbarExport sx={{ m: 1 }} />
                </GridToolbarContainer>
        );
    };

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/projects/students/${courseInfo.course_id}`,
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
