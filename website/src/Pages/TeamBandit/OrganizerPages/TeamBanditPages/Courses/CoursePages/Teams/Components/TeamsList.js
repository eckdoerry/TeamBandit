import React, {useEffect, useState} from "react";
import {
    Link
} from "react-router-dom";
import { toast } from 'react-toastify';

// Page Components
import EditTeam from "./EditTeam";

// MUI Imports
import Typography from '@mui/material/Typography';

import { DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const Teams = ({courseInfo}) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);
            

    const editButton = (params) => {
        return (
            <EditTeam team={params.row} setRowChange={setRowChange} courseInfo={courseInfo}/>
        )
    };

    
    const teamPage = (params) => {

        return (
            <Link to ={`/team-pages/${params.row.team_name}`}> {params.row.team_name} </Link>
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
        field: 'project_name',
        headerName: 'Project Name',
        renderCell: projectPage,
        flex: 1,
        },
        {
            field: 'team_name',
            headerName: 'Team Name',
            renderCell: teamPage,
            flex: 1,
        },
        {
            field: 'team_size',
            headerName: 'Team Size',
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
    ];
            
    const CustomToolbar = () => {
        return (
        <GridToolbarContainer>
            <Typography sx={{ m: 1 }} variant="h4">Teams</Typography>
            <GridToolbarColumnsButton  sx={{ m: 1 }} />
            <GridToolbarFilterButton sx={{ m: 1 }} />
            <GridToolbarDensitySelector sx={{ m: 1 }} />
            <GridToolbarExport sx={{ m: 1 }} />
        </GridToolbarContainer>
        );
    }
    
    const getTeams = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/teams/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setRows(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };
    
    useEffect(() => {
        getTeams();
        setRowChange(false);
    }, [rowChange]);
            
    return(
        <div style={{ padding: '25px', display:'flex', height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows.team_id}
                components = {{Toolbar: CustomToolbar,}}
                disableSelectionOnClick
            />
        </div>
        
    );
}
            
export default Teams;