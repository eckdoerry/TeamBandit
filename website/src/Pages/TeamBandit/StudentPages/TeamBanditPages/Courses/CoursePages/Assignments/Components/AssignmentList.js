import React, { useEffect, useState } from "react";

// MUI Imports
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid";

const AssignmentList = ({ courseInfo, setRoute }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    const assignmentPage = (params) => {
        
        return (
            <div style={{display:'flex'}}>
                <Link target="_blank" to={`/assignment/${params.row.assignment_name}-${params.row.assignment_id}`}>
                {params.row.assignment_name}
                </Link>
            </div>
        );
    };

    const columns = [
        {
            field: "assignment_name",
            headerName: "Assignment",
            renderCell: assignmentPage,
            flex: 2,
        },
        {
            field: "assignment_due_date",
            headerName: "Due Date",
            flex: 2,
        },
        {
            field: "assignment_description",
            headerName: "Description",
            flex: 2,
        },
        {
            field: "submission_type",
            headerName: "Type",
            flex: 2,
        },
    ];

    const CustomToolbar = () => {
        return (
            
                <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }} >
                    <Typography sx={{ m: 1 }} variant="h4">
                        Your Assignments
                    </Typography>
                    <GridToolbarColumnsButton sx={{ m: 1 }} />
                    <GridToolbarFilterButton sx={{ m: 1 }} />
                    <GridToolbarExport sx={{ m: 1 }} />
                </GridToolbarContainer>
        );
    };

    const getAssignments = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAssignments();
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
                    rowHeight={150}
                    getRowId={(rows) => rows.assignment_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                />
            </div>
        </>
    );
};

export default AssignmentList;
