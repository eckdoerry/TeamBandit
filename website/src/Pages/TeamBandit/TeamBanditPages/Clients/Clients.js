import {Fragment,React} from "react";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import ClientTableHeader from './ClientTableHeader';
import Client from './Client'

const Clients = () => {
    return(
        <Fragment>
            <h1>Clients</h1>
        
            <TableContainer>

                <Table>
                    
                    <ClientTableHeader />

                    <TableBody>

                        <Client />

                    </TableBody>

                </Table>

            </TableContainer>
        </Fragment>
    );
}

export default Clients;
