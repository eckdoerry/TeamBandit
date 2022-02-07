import {Fragment,React} from "react";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';

import NewClientButton from "./NewClientButton";
import ClientTableHeader from './ClientTableHeader';
import Client from './Client'

import './Clients.css'

// Controls displasy of the Clients table
const Clients = (clients) => {

    // Temporary hardcoded clientList until database and add
    // functionality is finished
    const clientList = 
    [
        {
            clientName: "Dr. Doerry",
            where: "SICCS",
            project: "TeamBandit",
            draft: "N",
            version: 1.0,
            status: "selected",
            email: "Doerry@email.com",
            notes: "N/A",
            selected: "Y",
        },
    ];

    return(
        <Fragment>
            <h1>Clients</h1>

            <div className="ClientTable">
                <TableContainer>

                    <Table>
                        
                        <ClientTableHeader />

                        <TableBody>

                            <Client registeredClients={clientList} />

                        </TableBody>

                    </Table>

                </TableContainer>
            </div>

            <div>

                <NewClientButton />

            </div>
        </Fragment>
    );
}

export default Clients;
