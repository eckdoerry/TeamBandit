import React, { useEffect, useState } from "react";

import AddAssignment from "./AddAssignment";

// MUI Imports
import Typography from "@mui/material/Typography";

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

    const columns = [
        {
            field: "assignment_name",
            headerName: "Assignment Title",
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
        {
            field: "assignment_filename",
            headerName: "PDF Instructions",
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
            console.log(courseInfo);
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
