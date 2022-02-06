// MUI
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

// CSS
import './ClientTableHeader.css';


const ClientTableHeader = () => {
    return (
        <div className='HeaderRow'>

<TableHead>

    <TableRow>

        <TableCell style={{width:150}}>
            Client Name
        </TableCell>

        <TableCell style={{width:150}}>
            Where?
        </TableCell>

        <TableCell style={{width:150}}>
            Project
        </TableCell>

        <TableCell style={{width:150}}>
            Draft?
        </TableCell>

        <TableCell style={{width:150}}>
            Version
        </TableCell>

        <TableCell style={{width:150}}>
            Status
        </TableCell>

        <TableCell style={{width:150}}>
            Email
        </TableCell>

        <TableCell style={{width:150}}>
            Notes
        </TableCell>

        <TableCell style={{width:150}}>
            Selected?
        </TableCell>

    </TableRow>

</TableHead>

        </div>
    );
}

export default ClientTableHeader;