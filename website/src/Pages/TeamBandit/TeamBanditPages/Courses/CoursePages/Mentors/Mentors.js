import {Fragment, React, useEffect, useState} from "react";
import { DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
   } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';

// components
import AddProject from "../Projects/Components/AddProject";
import TeamsAssignment from "../Projects/Components/TeamAssignment";
import EditProject from "../Projects/Components/EditProject";




  

const Mentors = ({courseInfo}) => {
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
        console.log("Params" + params.row);
        return (
            
                <EditProject project={params.row} setRowChange={setRowChange} courseInfo={courseInfo}/>
                
            
        )
    };


    const columns = [
        {
          field: 'project_name',
          headerName: 'Project Name',
          width: 150,
          editable: true,
        },
        {
          field: 'project_team_lead',
          headerName: 'Team Lead',
          width: 150,
          editable: true,
        },
        {
          field: 'project_member1',
          headerName: 'Student Team',
          width: 150,
          editable: true,
        },
        {
            field: 'project_mentor',
            headerName: 'Team Mentor',
            width: 150,
            editable: true,
          },
          {
            field: 'project_sponsor',
            headerName: 'Project Sponsor',
            width: 150,
            editable: true,
          },
          {
            field: 'status_tracker',
            headerName: 'Status Tracker',
            width: 150,
            editable: true,
          },
        
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            filterable: false,
            width: 150,
            renderCell: editButton,
            disableClickEventBubbling: true,
          },
          {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            filterable: false,
            width: 150,
            renderCell: deleteButton,
            disableClickEventBubbling: true,
          },
          
      ];

      const CustomToolbar = () => {
        return (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
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
        
        <div style={{ height: '100%', width: '100%' }}>
        
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

export default Mentors;