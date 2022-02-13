import { React, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import AddClient from './Components/AddClient';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditClient from "./Components/EditClient";

import { toast } from 'react-toastify';

const Clients = () => {

    const [clients, setClients] = useState([]);
    const [clientsChange, setClientsChange] = useState(false);

    const editButton = (params) => {
      return (
        <EditClient client={params.row} setClientsChange={setClientsChange}/>
      )
    };

    const deleteButton = (params) => {
      return (
          <strong>
              <Button variant="outlined" color="error" onClick = {() => deleteClient(params.row.client_id)} startIcon={<DeleteIcon />}> Delete </Button>
          </strong>
      )
    };

    const getClients = async () =>
    {
        try {
            const response = await fetch("http://localhost:5000/clients/", {method: "GET", headers: {token: localStorage.token}});

            const parseData = await response.json();
            setClients(parseData);

        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteClient = async (id) => {
      try {

        const response = await fetch(`http://localhost:5000/clients/deleteclient/${id}`, {
              method: "DELETE",
              headers: { token: localStorage.token }
          });

          const resp = await response.json();

          toast.success(resp);
          setClientsChange(true);
      } catch (error) {
          console.error(error.message);
          toast.error("Failed to delete client!");
      }
    }

    const clientFields = [
      {
        field: 'client_name',
        headerName: 'Client Name',
        flex: 1
      },
      {
        field: 'client_email',
        headerName: 'Email',
        flex: 1
      },
      {
        field: 'client_company',
        headerName: 'Where?',
        flex: 1
      },
      {
        field: 'client_notes',
        headerName: 'Notes',
        flex: 1
      },
      {
        field: 'project',
        headerName: 'Project',
        flex: 1
      },
      {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,
        filterable: false,
        flex: 1,
        renderCell: editButton,
        disableClickEventBubbling: true
    },
    {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        filterable: false,
        flex: 1,
        renderCell: deleteButton,
        disableClickEventBubbling: true
    }
    ];

    const CustomToolbar = () => {
      return (
      <GridToolbarContainer>
          <Typography sx={{ m: 1 }} variant="h4">Clients</Typography>
          <GridToolbarColumnsButton  sx={{ m: 1 }} />
          <GridToolbarFilterButton sx={{ m: 1 }} />
          <GridToolbarDensitySelector sx={{ m: 1 }} />
          <GridToolbarExport sx={{ m: 1 }} />
          <AddClient setClientsChange = {setClientsChange}/>
      </GridToolbarContainer>
      );
    }

    // Updates Page
    useEffect(() => {
        getClients();
        setClientsChange(false);
    }, [clientsChange]);

    return (
        <div style={{ height: 400, width: '100%' }}>

            <br />

            <DataGrid
                rows = {clients}
                columns = {clientFields}
                getRowId={(row) => row.client_id}
                pageSize = {5}
                rowsPerPageOptions = {[5]}
                components = {{Toolbar: CustomToolbar,}}
                disableSelectionOnClick
            />
        </div>
  );
}

export default Clients;
