import { React, useState, useEffect } from 'react';
import { DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
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
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/clients/`, {method: "GET", headers: {token: localStorage.token}});

            const parseData = await response.json();
            setClients(parseData);

        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteClient = async (id) => {
      try {

        const response = await fetch(`${process.env.REACT_APP_BASEURL}/clients/deleteclient/${id}`, {
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
        headerName: 'Company',
        flex: 1
      },
      {
        field: 'project',
        headerName: 'Project',
        flex: 1
      },
      {
        field: 'client_notes',
        headerName: 'Notes',
        flex: 1
      },
      {
        field: 'edit',
        headerName: '',
        sortable: false,
        filterable: false,
        flex: 1,
        renderCell: editButton,
        disableClickEventBubbling: true
    },
    {
        field: 'delete',
        headerName: '',
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
          <GridToolbarColumnsButton  sx={{ m: 1 }} />
          <GridToolbarFilterButton sx={{ m: 1 }} />
          <GridToolbarExport sx={{ m: 1 }} />
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

          <div className='PageHeader'>
          <h1>Clients</h1>

          <AddClient setClientsChange = {setClientsChange}/>
          </div>

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
