import React, {useEffect, useState} from "react";
import {
    Link
} from "react-router-dom";
import { toast } from 'react-toastify';

// Page Components
import EditTeam from "./EditTeam";

// MUI Imports
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";

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
            <div>
            <Link target="_blank" to ={`/team-pages/${params.row.team_name}`}> {params.row.team_name} </Link>
            <div style={{display:'flex', alignItems: 'center'}}>
                    <div>
                    <Paper variant="outlined">
                                    <img
                                        src={require("../../../../../../../../Images/logo.png")}
                                        alt=""
                                        width="100px"
                                        height="100px"
                                    />
                                </Paper>
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
            <div>
                <Link target="_blank" to={`/project-pages/${params.row.project_name}`}>
                    {" "}
                    {params.row.project_name}{" "}
                </Link>
                
            </div>
        );
    };

    const projectSponsor = (params) => {
        return (
            <div >
                <p><strong>Max L. Mosier </strong> <br></br> <br></br> Founder & CEO <br></br> Cool Person Studios</p>
            </div>
        );
    };

    const teamMentor = (params) => {
        return (
            <div>
                <a href="#"> Quinn Melssen</a>
            </div>
        );
    };
            
            
    const columns = [
        {
        field: 'project_name',
        headerName: 'Project Title',
        renderCell: projectPage,
        flex: 1,
        },
        {
            field: 'project_sponsor',
            headerName: 'Project Sponsor',
            renderCell: projectSponsor,
            flex: 1,
        },
        {
            field: 'student_team',
            headerName: 'Student Team',
            renderCell: teamPage,
            flex: 1,
        },
        {
            field: 'team_name',
            headerName: 'Team Mentor',
            renderCell: teamMentor,
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
        <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }}>
            <Typography sx={{ m: 1 }} variant="h4">Teams</Typography>
            <GridToolbarColumnsButton  sx={{ m: 1 }} />
            <GridToolbarFilterButton sx={{ m: 1 }} />
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
                rowHeight={'100%'}
                getRowId={(rows) => rows.team_id}
                components = {{Toolbar: CustomToolbar,}}
                disableSelectionOnClick
            />
        </div>
        
    );
}
            
export default Teams;