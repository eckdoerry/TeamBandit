import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// MUI Imports
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Data Grid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";

// Page Components
import EditMentor from "./Components/EditMentor";
import AddMentor from "./Components/AddMentor";

// Stylesheet
import styles from "./Mentors.module.css";

const Projects = ({ courseInfo }) => {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    // LOADING VARIABLES
    const [loading, setLoading] = useState(true);

    const setLoadingFalse = () => {
        setLoading(false);
    };

    // END LOADING VARIABLES

    const editButton = (params) => {
        return (
            <EditMentor
                mentor={params.row}
                setRowChange={setRowChange}
                courseInfo={courseInfo}
            />
        );
    };

    const columns = [
        {
            field: "mentor_name",
            headerName: "Mentor Name",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "mentor_email",
            headerName: "Mentor Email",
            cellClassName: "death",
            flex: 1,
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
                    Mentors
                </Typography>
                <GridToolbarColumnsButton sx={{ m: 1 }} />
                <GridToolbarFilterButton sx={{ m: 1 }} />
                <GridToolbarDensitySelector sx={{ m: 1 }} />
                <GridToolbarExport sx={{ m: 1 }} />
                <AddMentor
                    courseInfo={courseInfo}
                    setRowChange={setRowChange}
                />
            </GridToolbarContainer>
        );
    };

    const getMentors = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/mentors/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();
            setRows(jsonData);
            setLoadingFalse();
        } catch (err) {
            toast.error("Failed to load mentors");
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMentors();
        setRowChange(false);
    }, [rowChange]);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className={styles.lds}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
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
                    "& .death": {
                        borderRight: 1,
                        borderColor: "#d3d3d3",
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(rows) => rows.mentor_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                />
            </Box>
        </div>
    );
};

export default Projects;
