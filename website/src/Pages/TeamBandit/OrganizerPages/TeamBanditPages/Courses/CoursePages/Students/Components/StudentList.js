import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';

// Page Components
import EditStudent from "./EditStudent";
import AddStudent from "./AddStudent";

// MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import { DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

// Stylesheet
import styles from "../Students.module.css";

const Students = ({courseInfo}) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    // LOADING VARIABLES
    // ---------------------------------------------------------------------------
    // Loading time needs to get predetermined as currently I don't know how to
    // 'wait' for all of the information to get pulled. Still works and avoids the
    // awkward data loading period. TODO: Look into adjusting time
    // ---------------------------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const loadingTime = 750;

    const setLoadingFalse = () => {
        setTimeout(() => {
            setLoading(false);
        }, loadingTime);
    };

    // END LOADING VARIABLES
            

    const editButton = (params) => {
        return (
            <EditStudent courseInfo={courseInfo} student={params.row} setRowChange={setRowChange}/>
        )
    };
            
    const columns = [
        {
        field: 'student_fname',
        headerName: 'First Name',
        cellClassName: 'death',
        flex: 1,
        },
        {
            field: 'student_lname',
            headerName: 'Last Name',
            cellClassName: 'death',
            flex: 1,
        },
        {
            field: 'student_emplid',
            headerName: 'Student ID',
            cellClassName: 'death',
            flex: 1,
        },
        {
            field: 'student_email',
            headerName: 'Email',
            cellClassName: 'death',
            flex: 1,
        },
        {
            field: 'student_gpa',
            headerName: 'GPA',
            cellClassName: 'death',
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
            <Typography sx={{ m: 1 }} variant="h4">Students</Typography>
            <GridToolbarColumnsButton  sx={{ m: 1 }} />
            <GridToolbarFilterButton sx={{ m: 1 }} />
            <GridToolbarDensitySelector sx={{ m: 1 }} />
            <GridToolbarExport sx={{ m: 1 }} />
            <AddStudent courseInfo={courseInfo} setRowChange={setRowChange}/>
        </GridToolbarContainer>
        );
    }
                
    const getStudents = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/students/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setRows(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };
    
    useEffect(() => {
        getStudents();
        setRowChange(false);
        setLoadingFalse();
    }, [rowChange]);

    if (loading) {
        return (
            <div style={{display:'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <div className={styles.lds}><div></div><div></div><div></div></div>
            </div>
        );
    }
            
    return(
        <div style={{ padding: '25px', display:'flex', height: '100%', width: '100%' }}>
        <Box
                sx={{
                    height:'100%',
                    width:'100%',
                    '& .death': {
                        borderRight: 1,
                        borderColor: '#d3d3d3'
                    },
                }}
            >
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows.student_id}
                components = {{Toolbar: CustomToolbar,}}
                disableSelectionOnClick
            />
            </Box>
        </div>
        
    );
}
            
export default Students;