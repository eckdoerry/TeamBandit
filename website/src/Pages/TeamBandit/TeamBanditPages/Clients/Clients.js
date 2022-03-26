import { React, useState, useEffect, Fragment } from "react";

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid";

import FormDialogAddClient from "./Components/FormDialogAddClient";
import FormDialogEditClient from "./Components/FormDialogEditClient";

import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { toast } from "react-toastify";

// Stylesheet
import styles from "./Clients.module.css";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [clientsChange, setClientsChange] = useState(false);

    // LOADING VARIABLES
    const [loading, setLoading] = useState(true);


    const setLoadingFalse = () => {
        setLoading(false);
    };

    // END LOADING VARIABLES

    const editButton = (params) => {
        return (
            <FormDialogEditClient
                client={params.row}
                setClientsChange={setClientsChange}
            />
        );
    };

    const getClients = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/clients/`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const parseData = await response.json();
            setClients(parseData);
            setLoadingFalse();
        } catch (error) {
            toast.error("Failed to load clients");
            console.error(error.message);
        }
    };

    const clientLogo = (params) => {
        return (
            <div style={{ height: "100%" }}>
                <div>
                    {params.row.client_logo != null ? (
                        <img
                            src={
                                params.row.client_logo
                                    ? "/uploads/images/clientLogos/" +
                                      params.row.client_logo
                                    : null
                            }
                            alt=""
                            width="50px"
                            height="50px"
                        />
                    ) : null}
                </div>
            </div>
        );
    };

    const clientFields = [
        {
            field: "client_lname",
            headerName: "Last name",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "client_fname",
            headerName: "First name",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "client_email",
            headerName: "Email",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "client_organization",
            headerName: "Organization",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "client_phonenumber",
            headerName: "Phone Number",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "client_location",
            headerName: "Location",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "client_logo",
            headerName: "Logo",
            cellClassName: "death",
            renderCell: clientLogo,
            flex: 0.5,
        },
        {
            field: "client_notes",
            headerName: "Notes",
            cellClassName: "death",
            flex: 1,
        },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: editButton,
            disableClickEventBubbling: true,
        },
    ];

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={{ background: "#002454" }}>
                <GridToolbarColumnsButton
                    style={{ color: "white" }}
                    sx={{ m: 1 }}
                />
                <GridToolbarFilterButton
                    style={{ color: "white" }}
                    sx={{ m: 1 }}
                />
                <GridToolbarExport style={{ color: "white" }} sx={{ m: 1 }} />
            </GridToolbarContainer>
        );
    };

    // Updates Page
    useEffect(() => {
        getClients();
        setClientsChange(false);
    }, [clientsChange]);

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
        <Fragment style={{ display: "flex", width: "100%", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h3" gutterBottom>
                    Clients
                </Typography>

                <FormDialogAddClient setClientsChange={setClientsChange} />
            </div>
            <Box
                sx={{
                    height: 750,
                    width: "100%",
                    "& .death": {
                        borderRight: 1,
                        borderColor: "#d3d3d3",
                    },
                }}
            >
                <DataGrid
                    rows={clients}
                    columns={clientFields}
                    getRowId={(row) => row.client_id}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                />
            </Box>
        </Fragment>
    );
};

export default Clients;
