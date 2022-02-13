import { React, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import FormDialogAddClient from './Components/FormDialogAddClient';


const clientFields = [
  {
    field: 'clientName',
    headerName: 'Client Name',
    width: 150,
    editable: true,
  },
  {
    field: 'where',
    headerName: 'Where?',
    width: 150,
    editable: true,
  },
  {
    field: 'project',
    headerName: 'Project',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',
    width: 150,
    editable: true,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 150,
    editable: true,
  },
];



const Clients = () => {

    const [clients, setClients] = useState([]);

    const addClient = (client) => {
      setClients([...clients, client]);
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1>Clients</h1>

            <FormDialogAddClient
              addClient = {addClient}
            />

            <br />

            <DataGrid
                rows = {clients}
                columns = {clientFields}
                pageSize = {5}
                rowsPerPageOptions = {[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
  );
}

export default Clients;