import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// CSS
import './Client.css';

const Client = () => {
    return (
        <div>

            <TableRow>

                <TableCell style={{width:150}}>
                    Dr. Doerry
                </TableCell>

                <TableCell style={{width:150}}>
                    SICCS
                </TableCell>

                <TableCell style={{width:150}}>
                    TeamBandit
                </TableCell>

                <TableCell style={{width:150}}>
                    N
                </TableCell>

                <TableCell style={{width:150}}>
                    1.0
                </TableCell>

                <TableCell style={{width:150}}>
                    Selected
                </TableCell>

                <TableCell style={{width:150}}>
                    Doerry@<br/>email.com
                </TableCell>

                <TableCell style={{width:150}}>
                    N/A
                </TableCell>

                <TableCell style={{width:150}}>
                    Y
                </TableCell>

            </TableRow>

        </div>
    );
}

export default Client;