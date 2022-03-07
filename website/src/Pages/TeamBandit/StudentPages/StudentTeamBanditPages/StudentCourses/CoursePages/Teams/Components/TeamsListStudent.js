import React, {useEffect, useState} from "react";
import {
    Link
} from "react-router-dom";

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
    console.log(courseInfo);
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    // @TODO: A team with spaces gets all funky, but it works
    const teamPage = (params) => {

        return (
            <Link target="_blank" to={`/team-pages/${params.row.team_name}`}> {params.row.team_name} </Link>
        );
    };
            
            
    const columns = [
        {
        field: 'project_name',
        headerName: 'Project Name',
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
    ];
            
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }} >
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
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/teams/students/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
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