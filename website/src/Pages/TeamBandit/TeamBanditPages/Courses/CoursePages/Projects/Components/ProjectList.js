import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';

import { DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
   } from '@mui/x-data-grid';

// components
import AddProject from "./AddProject";
import TeamsAssignment from "./TeamAssignment";
import EditProject from "./EditProject";

import { toast } from 'react-toastify';


const Projects = ({courseInfo}) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const deleteButton = (params) => {
        return (
            <strong>
                
                <Button variant="outlined" color="error" onClick = {() => deleteProject(params.row.project_id)} startIcon={<DeleteIcon />}> Delete </Button>
            </strong>
        )
    };
    
    const editButton = (params) => {
        return (
            
                <EditProject project={params.row} setRowChange={setRowChange} courseInfo={courseInfo}/>
                
            
        )
    };


    const columns = [
        {
          field: 'project_name',
          headerName: 'Project Name',
          flex: 1,
          editable: true,
        },
        {
            field: 'project_description',
            headerName: 'Project Description',
            flex: 1,
            editable: true,
          },
        {
          field: 'project_team_lead',
          headerName: 'Team Lead',
          flex: 1,
          editable: true,
        },
        {
          field: 'project_member1',
          headerName: 'Student Team',
          flex: 1,
          editable: true,
        },
        {
            field: 'project_mentor',
            headerName: 'Team Mentor',
            flex: 1,
            editable: true,
          },
          {
            field: 'project_sponsor',
            headerName: 'Project Sponsor',
            flex: 1,
            editable: true,
          },
          {
            field: 'status_tracker',
            headerName: 'Status Tracker',
            flex: 1,
            editable: true,
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
                pageSize={10}
                rowsPerPageOptions={[5,10,25]}
                disableSelectionOnClick
            />
        </div>
        
    );
}

export default Projects;