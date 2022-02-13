import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';

// MUI Imports
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

// Datagrid
import { DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

// Page Components
import AddProject from "./AddProject";
import TeamsAssignment from "./TeamAssignment";
import EditProject from "./EditProject";

const Projects = ({courseInfo}) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const deleteButton = (params) => {
        return (
            <strong>
                <Button variant="outlined" color="error" onClick = {() => deleteProject(params.row.project_id)} startIcon={<DeleteIcon />}> Delete </Button>
            </strong>
        );
    };
    
    const editButton = (params) => {
        return (
            <EditProject project={params.row} setRowChange={setRowChange} courseInfo={courseInfo}/>
        );
    };


    const columns = [
        {
        field: 'project_name',
        headerName: 'Project Name',
        flex: 1,
        },
        {
            field: 'project_description',
            headerName: 'Project Description',
            flex: 1,
        },
        {
        field: 'project_team_lead',
        headerName: 'Team Lead',
        flex: 1,
        },
        {
        field: 'project_member1',
        headerName: 'Student Team',
        flex: 1,
        },
        {
            field: 'project_mentor',
            headerName: 'Team Mentor',
            flex: 1,
        },
        {
            field: 'project_sponsor',
            headerName: 'Project Sponsor',
            flex: 1,
        },
        {
            field: 'status_tracker',
            headerName: 'Status Tracker',
            flex: 1,
        },
        
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: editButton,
            disableClickEventBubbling: true,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: deleteButton,
            disableClickEventBubbling: true,
        },
    ];

    const CustomToolbar = () => {
        return (
        <GridToolbarContainer>
            <Typography sx={{ m: 1 }} variant="h4">Projects</Typography>
            <GridToolbarColumnsButton  sx={{ m: 1 }} />
            <GridToolbarFilterButton sx={{ m: 1 }} />
            <GridToolbarDensitySelector sx={{ m: 1 }} />
            <GridToolbarExport sx={{ m: 1 }} />
            <AddProject courseInfo={courseInfo} setRowChange={setRowChange}/>
            <TeamsAssignment setRowChange={setRowChange}/>
        </GridToolbarContainer>
        );
    }
    
    // Delete function
    const deleteProject= async (id) => {
        try {

            await fetch(`http://localhost:5000/projects/projects/${id}/`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });


            toast.success("Project was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete project!");
        }
    }
    
    const getProjects = async () => {
        try {
            const response = await fetch(`http://localhost:5000/projects/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
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

    return(   
        <div style={{ padding: '25px', display:'flex', height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows.project_id}
                components = {{Toolbar: CustomToolbar,}}
                disableSelectionOnClick
            />
        </div>
        
    );
}

export default Projects;