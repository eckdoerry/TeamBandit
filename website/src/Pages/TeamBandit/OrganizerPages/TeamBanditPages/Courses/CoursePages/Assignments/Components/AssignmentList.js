import React, { useEffect, useState } from "react";

import AddAssignment from "./AddAssignment";

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

// Stylesheet
import styles from "../Assignments.module.css";

const AssignmentList = ({ courseInfo, setRoute }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    // LOADING VARIABLES
    // ---------------------------------------------------------------------------
    // Loading time needs to get predetermined as currently I don't know how to
    // 'wait' for all of the information to get pulled. Still works and avoids the
    // awkward data loading period. TODO: Look into adjusting time
    // ---------------------------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const loadingTime = 500;

    const setLoadingFalse = () => {
        setTimeout(() => {
            setLoading(false);
        }, loadingTime);
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

    const getProperDateFormat = (params) => {
        const date = params.row.assignment_due_date;
        var dateArray = date.split('-');
        var newDate = dateArray[1] + '/' + dateArray[2].split('T')[0] + " at " + dateArray[2].split('T')[1];
        return (
            <div>
                {newDate}
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
            renderCell: getProperDateFormat,
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
                        Assignments
                    </Typography>
                    <GridToolbarColumnsButton sx={{ m: 1 }} />
                    <GridToolbarFilterButton sx={{ m: 1 }} />
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
        setLoadingFalse();
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
