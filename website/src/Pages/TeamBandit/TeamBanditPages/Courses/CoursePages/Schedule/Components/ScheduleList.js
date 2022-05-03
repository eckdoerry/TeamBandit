import React, { useState, useEffect } from "react";

// MUI Imports
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import styles from "../Schedule.module.css";
import EditSchedule from "./EditSchedule";
import DOMPurify from 'dompurify';

// Datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";

import SetScheduleWeeks from "./SetScheduleWeeks";
import StudentUploadAssignment from "./StudentUploadAssignment";
import SubmittedAssignmentsModal from "./SubmittedAssignmentsModal";

function ScheduleList({ courseInfo, userInfo, userIdentifier }) {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);
    const [assignments, setAssignments] = useState([]);

    // LOADING VARIABLES //
    const [loading, setLoading] = useState(true);

    const setLoadingFalse = () => {
        setLoading(false);
    };
    // END LOADING VARIABLES //

    const getProperStartDateFormat = (params) => {
        // 1 week = 604800000 milliseconds
        var millisecondsOfWeek = new Date(params.row.schedule_week).getTime();
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(params.row.schedule_week_message) }} />
                {assignments.map(
                    (assignment) =>
                        Math.abs(
                            Date.parse(
                                assignment.assignment_start_date.split("T")
                            ) - millisecondsOfWeek
                        ) < 604800000 &&
                        (Date.parse(
                            assignment.assignment_start_date.split("T")
                        ) -
                            millisecondsOfWeek) >=
                            0 && (
                            <div key={assignment.assignment_id} style={{display: "flex", flexDirection: "row"}}>
                                <Link
                                    target="_blank"
                                    to={`/assignment/${assignment.assignment_name}-${assignment.assignment_id}`}
                                >
                                    <p>{assignment.assignment_name}</p>
                                </Link>
                                <p>&nbsp;{assignment.submission_type + " Assignment"}</p>
                            </div>
                        )
                )}
            </div>
        );
    };

    const getProperDueDateFormat = (params) => {
        // 1 week = 604800000 milliseconds
        var millisecondsOfWeek = new Date(params.row.schedule_week).getTime();
        return (
            <div>
                {assignments.map(
                    (assignment) =>
                        Math.abs(
                            Date.parse(
                                assignment.assignment_due_date.split("T")
                            ) - millisecondsOfWeek
                        ) < 604800000 &&
                        Date.parse(
                            assignment.assignment_due_date.split("T")
                        ) -
                            millisecondsOfWeek >=
                            0 && (
                            <div key={assignment.assignment_id} style={{display: "flex", flexDirection: "row"}}>
                                <Link
                                    target="_blank"
                                    to={`/assignment/${assignment.assignment_name}-${assignment.assignment_id}`}
                                >
                                    <p>{assignment.assignment_name}</p>
                                </Link>
                                <p>&nbsp;{"Due by: " + assignment.assignment_due_date.split("T")[1] + " MST"}</p>
                                {userIdentifier == "organizer" && <SubmittedAssignmentsModal assignment={assignment} courseInfo={courseInfo}/>}
                                {userIdentifier == "student" && <StudentUploadAssignment setRowChange={setRowChange} assignment={assignment} userInfo={userInfo}/>}
                            </div>
                        )
                )}
            </div>
        );
    };

    const getProperWeekFormat = (params) => {
        const week = params.row.schedule_week;
        var weekArray = week.split("-");
        var newWeek = weekArray[0] + "/" + weekArray[1].split("T")[0];
        return (
            <div style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center"}}>
                <h3>
                    {newWeek}
                </h3>
            </div>
            
        );
    };

    const getAssignments = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();
            setAssignments(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const editButton = (params) => {
        return (
            <EditSchedule
                schedule_week={params.row}
                setRowChange={setRowChange}
            />
        );
    };

    useEffect(() => {
        getAssignments();
    }, []);

    var columns;

    if (userIdentifier === "organizer")
    {
        columns = [
            {
                field: "schedule_week",
                headerName: "Week",
                renderCell: getProperWeekFormat,
                cellClassName: "border",
                sortable: false,
                flex: 0.1,
                headerAlign: 'center',
            },
            {
                field: "schedule_week_description",
                headerName: "Topics and Assignments",
                renderCell: getProperStartDateFormat,
                cellClassName: "border",
                sortable: false,
                flex: 2,
                headerAlign: 'center',
            },
            {
                field: "schedule_week_deliverables",
                headerName: "Deliverables",
                renderCell: getProperDueDateFormat,
                cellClassName: "border",
                sortable: false,
                flex: 2,
                headerAlign: 'center',
            },
            {
                field: "edit",
                headerName: "Actions",
                sortable: false,
                filterable: false,
                renderCell: editButton,
                disableClickEventBubbling: true,
                headerAlign: 'center',
            },
        ];
    }

    else {
        columns = [
            {
                field: "schedule_week",
                headerName: "Week",
                renderCell: getProperWeekFormat,
                cellClassName: "border",
                sortable: false,
                flex: 0.11,
                headerAlign: 'center',
            },
            {
                field: "schedule_week_description",
                headerName: "Topics and Assignments",
                renderCell: getProperStartDateFormat,
                cellClassName: "border",
                sortable: false,
                flex: 2,
                headerAlign: 'center',
            },
            {
                field: "schedule_week_deliverables",
                headerName: "Deliverables",
                renderCell: getProperDueDateFormat,
                cellClassName: "border",
                sortable: false,
                flex: 2,
                headerAlign: 'center',
            },
        ];
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={
                { 
                    backgroundColor: courseInfo.course_color 
                    }
            }>
                <Typography sx={{ m: 1 }} variant="h4">
                    Schedule
                </Typography>
                <GridToolbarExport sx={{ m: 1 }} />
                <SetScheduleWeeks
                    courseInfo={courseInfo}
                    rows={rows}
                    setRowChange={setRowChange}
                />
            </GridToolbarContainer>
        );
    };

    const CustomToolbarStudents = () => {
        return (
            <GridToolbarContainer style={
                { 
                    backgroundColor: courseInfo.course_color 
                    }
            }>
                <Typography sx={{ m: 1 }} variant="h4">
                    Schedule
                </Typography>
                <GridToolbarExport sx={{ m: 1 }} />
            </GridToolbarContainer>
        );
    };

    const getSchedule = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/schedule/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
            setLoadingFalse();
        } catch (err) {
            console.error(err.message);
        }
    };

    const getStudentSchedule = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/schedule/studentSchedule/${courseInfo.course_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setRows(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (userIdentifier == "organizer"){
            getSchedule();
        }
        else if (userIdentifier == "student"){
            getStudentSchedule();
        }
        setRowChange(false);
    }, [rowChange]);

    /*
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
    */

    if (userIdentifier == "organizer")
    {
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
                    getRowId={(rows) => rows.schedule_week_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                    disableColumnSelector
                    disableColumnMenu
                />
                </Box>
            </div>
        );
    }
    if (userIdentifier == "student")
    {
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
                        getRowId={(rows) => rows.schedule_week_id}
                        components={{ Toolbar: CustomToolbarStudents }}
                        disableSelectionOnClick
                        disableColumnSelector
                        disableColumnMenu
                    />
                    </Box>
                </div>
            </>
        );
    }
}
export default ScheduleList;
