import {Fragment,React} from "react";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';

import NewClientButton from "./NewClientButton";
import ClientTableHeader from './ClientTableHeader';
import Client from './Client'

import './Clients.css'

const Clients = () => {
    return(
        <Fragment>
            <h1>Clients</h1>

            <div className="ClientTable">
                <TableContainer>

                    <Table>
                        
                        <ClientTableHeader />

                        <TableBody>

                            <Client />

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
