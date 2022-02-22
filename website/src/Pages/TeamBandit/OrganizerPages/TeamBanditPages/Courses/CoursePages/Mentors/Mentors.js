import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';

// MUI Imports
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

// Data Grid
import { DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

// Page Components
import EditMentor from "./Components/EditMentor";
import AddMentor from "./Components/AddMentor";

const Projects = ({courseInfo}) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const deleteButton = (params) => {
        return (
            <strong>
                <Button variant="outlined" color="error" onClick = {() => deleteMentor(params.row.project_id)} startIcon={<DeleteIcon />}> Delete </Button>
            </strong>
        );
    };
    
    const editButton = (params) => {
        return (
            <EditMentor mentor={params.row} setRowChange={setRowChange} courseInfo={courseInfo}/>
        );
    };

    const columns = [
        {
        field: 'mentor_name',
        headerName: 'Mentor Name',
        flex: 1,
        },
        {
            field: 'mentor_email',
            headerName: 'Mentor Email',
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
        <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }}>
            <Typography sx={{ m: 1 }} variant="h4">Mentors</Typography>
            <GridToolbarColumnsButton  sx={{ m: 1 }} />
            <GridToolbarFilterButton sx={{ m: 1 }} />
            <GridToolbarDensitySelector sx={{ m: 1 }} />
            <GridToolbarExport sx={{ m: 1 }} />
            <AddMentor courseInfo={courseInfo} setRowChange={setRowChange}/>
        </GridToolbarContainer>
        );
    };
    
    // Delete function
    const deleteMentor= async (id) => {
        try {

            await fetch(`${process.env.REACT_APP_BASEURL}/mentors/mentors/${id}/${courseInfo.course_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });


            toast.success("Mentor was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete mentor!");
        }
    }
    
    const getMentors = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/mentors/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
            console.log(jsonData);
            setRows(jsonData);
            } catch (err) {
            console.error(err.message);
            }
        };
    
    useEffect(() => {
        getMentors();
        setRowChange(false);
    }, [rowChange]);

    return(
        <div style={{ padding: '25px', display:'flex', height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows.mentor_id}
                components = {{Toolbar: CustomToolbar,}}
                disableSelectionOnClick
            />
        </div>
        
    );
}

export default Projects;