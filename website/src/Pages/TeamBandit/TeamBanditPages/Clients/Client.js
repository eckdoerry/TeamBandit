import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Clients from "./Clients";

// CSS
import './Client.css';

// Determines how a client will be displayed in the table
const Client = (props) => {
    return (
        <div>

            <TableRow>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].clientName}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].where}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].project}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].draft}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].version}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].selected}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].email}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].notes}
                </TableCell>

                <TableCell style={{width:150}}>
                    {props.registeredClients[0].selected}
                </TableCell>

            </TableRow>

        </div>
    );
}

export default Client;