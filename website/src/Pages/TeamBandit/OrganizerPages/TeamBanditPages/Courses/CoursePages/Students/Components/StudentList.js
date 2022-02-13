import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';

// Page Components
import EditStudent from "./EditStudent";
import AddStudent from "./AddStudent";

// MUI Imports
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const Students = ({courseInfo}) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);
            
    const deleteButton = (params) => {
        return (
            <strong>
                <Button variant="outlined" color="error" onClick = {() => deleteStudent(params.row.student_id)} startIcon={<DeleteIcon />}> Delete </Button>
            </strong>
        )
    };

    const editButton = (params) => {
        return (
            <EditStudent student={params.row} setRowChange={setRowChange} courseInfo={courseInfo}/>
        )
    };
            
    const columns = [
        {
        field: 'student_fname',
        headerName: 'First Name',
        flex: 1,
        },
        {
            field: 'student_lname',
            headerName: 'Last Name',
            flex: 1,
        },
        {
            field: 'student_emplid',
            headerName: 'Student ID',
            flex: 1,
        },
        {
            field: 'student_email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'student_gpa',
            headerName: 'GPA',
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
            <Typography sx={{ m: 1 }} variant="h4">Students</Typography>
            <GridToolbarColumnsButton  sx={{ m: 1 }} />
            <GridToolbarFilterButton sx={{ m: 1 }} />
            <GridToolbarDensitySelector sx={{ m: 1 }} />
            <GridToolbarExport sx={{ m: 1 }} />
            <AddStudent courseInfo={courseInfo} setRowChange={setRowChange}/>
        </GridToolbarContainer>
        );
    }
                
            
                
    // Delete function
    const deleteStudent = async (id) => {
        try {
            const course_id = courseInfo.course_id;
            
            const PLEASE = {course_id};
            
            
            await fetch(`http://localhost:5000/students/students/${id}/${course_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token },
                body: JSON.stringify(PLEASE)
            });


            toast.success("Student was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete student!");
        }
    }
    
    const getStudents = async () => {
        try {
            const response = await fetch(`http://localhost:5000/students/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setRows(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };
    
    useEffect(() => {
        getStudents();
        setRowChange(false);
    }, [rowChange]);
            
    return(
        <div style={{ padding: '25px', display:'flex', height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows.student_id}
                components = {{Toolbar: CustomToolbar,}}
                disableSelectionOnClick
            />
        </div>
        
    );
}
            
export default Students;