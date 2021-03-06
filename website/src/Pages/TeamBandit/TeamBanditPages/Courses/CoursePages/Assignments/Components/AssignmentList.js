import React, { useEffect, useState } from "react";

import AddAssignment from "./AddAssignment";
import EditAssignment from "./EditAssignment"

// MUI Imports
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid";

// Stylesheet
import styles from "../Assignments.module.css";

const AssignmentList = ({ courseInfo, setRoute }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    // LOADING VARIABLES
    const [loading, setLoading] = useState(true);

    const setLoadingFalse = () => {
        setLoading(false);
    };

    // END LOADING VARIABLES

    const assignmentPage = (params) => {
        
        return (
            <div style={{display:'flex'}}>
                <Link target="_blank" to={`/assignment/${params.row.assignment_name}-${params.row.assignment_id}`}>
                {params.row.assignment_name}
                </Link>
            </div>
        );
    };

    const getProperStartDateFormat = (params) => {
        const date = params.row.assignment_start_date;
        var dateArray = date.split('-');
        var newDate = dateArray[1] + '/' + dateArray[2].split('T')[0] + " at " + dateArray[2].split('T')[1];
        return (
            <div>
                {newDate}&nbsp;MST
            </div>
        );
    };

    const getProperDueDateFormat = (params) => {
        const date = params.row.assignment_due_date;
        var dateArray = date.split('-');
        var newDate = dateArray[1] + '/' + dateArray[2].split('T')[0] + " at " + dateArray[2].split('T')[1];
        return (
            <div>
                {newDate}&nbsp;MST
            </div>
        );
    };

    const editButton = (params) => {
        return (
            <EditAssignment
                assignment={params.row}
                setRowChange={setRowChange}
            />
        );
    };

    const columns = [
        {
            field: "assignment_name",
            headerName: "Assignment",
            renderCell: assignmentPage,
            cellClassName: "border",
            sortable: false,
            flex: 2,
        },
        {
            field: "assignment_start_date",
            headerName: "Start Date",
            renderCell: getProperStartDateFormat,
            cellClassName: "border",
            sortable: false,
            flex: 2,
        },
        {
            field: "assignment_due_date",
            headerName: "Due Date",
            renderCell: getProperDueDateFormat,
            cellClassName: "border",
            sortable: false,
            flex: 2,
        },
        {
            field: "submission_type",
            headerName: "Type",
            cellClassName: "border",
            sortable: false,
            flex: 2,
        },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            filterable: false,
            renderCell: editButton,
            disableClickEventBubbling: true,
        },
    ];

    const CustomToolbar = () => {
        return (
            
                <GridToolbarContainer style={
                    {
                         backgroundColor: courseInfo.course_color 
                    }
                }>
                    <Typography sx={{ m: 1 }} variant="h4">
                        Assignments
                    </Typography>
                    <GridToolbarExport sx={{ m: 1 }} />
                    <AddAssignment
                        courseInfo={courseInfo}
                        rows={rows}
                        setRowChange={setRowChange}
                    />
                </GridToolbarContainer>
        );
    };

    const getAssignments = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
            setLoadingFalse();
        } catch (err) {
            toast.error("Failed to load Assignments");
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAssignments();
        setRowChange(false);
    }, [rowChange]);

    if (loading) {
        return (
            <div style={{display:'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <div className={styles.lds}><div></div><div></div><div></div></div>
            </div>
        );
    }

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
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    "& .border": {
                        borderRight: 1,
                        borderColor: "#d3d3d3",
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={100}
                    getRowId={(rows) => rows.assignment_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                    disableColumnMenu
                />
                </Box>
            </div>
        </>
    );
};

export default AssignmentList;
