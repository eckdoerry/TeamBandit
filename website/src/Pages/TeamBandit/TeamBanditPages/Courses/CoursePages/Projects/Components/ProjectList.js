import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';

// components
import AddProject from "./AddProject";
import TeamsAssignment from "./TeamAssignment";
import EditProject from "./EditProject";

import { toast } from 'react-toastify';


function createData(name, teamLead, studentTeam, teamMentor, projectSponsor, statusTracker) {
return {
    name,
    teamLead,
    studentTeam,
    teamMentor,
    projectSponsor,
    statusTracker,
};
}

const rows = [
    createData('TeamBandit: Teams Management Portal', 'Quinn Melssen', 'Max Mosier, Liam Scholl, Dakota battle', 'Eck Doerry', 'Eck Doerry', 'v1'),
    createData('HeartStep', 'Daggefelt Cov', 'Ronald Weasley, Harry Potter', 'Dave Ramsey', 'Raz A Ghul', 'v2'),
    createData('Cool Kids', 'Richard Nelssen', 'Fidge Spin, Choco Bar, Dinner Well', 'Spag Het', 'Pizz Ah', 'In Progress'),
    createData('Frozen yoghurt', 'Dick Gold', 'Inventor Spender, Paul McCartney, Liv Ticket', 'Doer Eck', 'Michael Lev', 'v4'),
    
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
    return -1;
    }
    if (b[orderBy] > a[orderBy]) {
    return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
        return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
{
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Project Name',
},
{
    id: 'teamLead',
    numeric: true,
    disablePadding: false,
    label: 'Team Lead',
},
{
    id: 'studentTeam',
    numeric: true,
    disablePadding: false,
    label: 'Student Team',
},
{
    id: 'teamMentor',
    numeric: true,
    disablePadding: false,
    label: 'Team Mentor',
},
{
    id: 'projectSponsor',
    numeric: true,
    disablePadding: false,
    label: 'Project Sponsor',
},
{
    id: 'statusTracker',
    numeric: true,
    disablePadding: false,
    label: 'Status Tracker',
},
{
    id: 'edit',
    numeric: true,
    disablePadding: false,
    label: 'Edit',
},
{
    id: 'delete',
    numeric: true,
    disablePadding: false,
    label: 'Delete',
},
];

function EnhancedTableHead(props) {
const { order, orderBy, numSelected, rowCount, onRequestSort} =
    props;
const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};

return (
    <TableHead>
        <TableRow>
            {headCells.map((headCell) => (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                ) : null}
                </TableSortLabel>
            </TableCell>
            ))}
        </TableRow>
        </TableHead>
    );
    }

    EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
    };

    const EnhancedTableToolbar = ({numSelected, courseInfo, setRowChange}) => {
        console.log("COURSE Toolbar" + courseInfo.course_id);

    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >
        {numSelected > 0 ? (
            <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
            {numSelected} selected
            </Typography>
        ) : (
            <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            >
            Projects
            </Typography>
        )}
        <AddProject courseInfo={courseInfo} setRowChange={setRowChange}/>
        <TeamsAssignment setRowChange={setRowChange}/>

        {numSelected > 0 ? (
            <Tooltip title="Delete">
            <IconButton>
                <DeleteIcon />
            </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
            <IconButton>
                <FilterListIcon />
            </IconButton>
            </Tooltip>
        )}
        </Toolbar>
    );
    };

    EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    };

export default function EnhancedTable({courseInfo}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('studentTeam');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

    // Delete function
    const deleteProject= async (id) => {
        try {

            await fetch(`http://localhost:5000/projects/projects/${id}/`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });


            toast.success("Project was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete project!");
        }
    }
    
    const getProjects = async () => {
        try {
            const response = await fetch(`http://localhost:5000/projects/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setRows(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };
    
    useEffect(() => {
        getProjects();
        setRowChange(false);
    }, [rowChange]);
    

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} courseInfo = {courseInfo} setRowChange={setRowChange} />
            <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
            >
                <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                courseInfo = {courseInfo} 
                setRowChange={setRowChange} 
                />
                <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        >
                        
                        
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            
                        >
                            {row.project_name}
                        </TableCell>
                        <TableCell align="right">{row.project_team_lead}</TableCell>
                        <TableCell align="right">{row.project_member1} {row.project_member2} {row.project_member3} {row.project_member4}</TableCell>
                        <TableCell align="right">{row.project_mentor}</TableCell>
                        <TableCell align="right">{row.project_sponsor}</TableCell>
                        <TableCell align="right">{row.status_tracker}</TableCell>
                        <TableCell align="right"><EditProject project={row} setRowChange={setRowChange} courseInfo={courseInfo}/></TableCell>
                        <TableCell align="right"><Button variant="outlined" color="error" onClick = {() => deleteProject(row.project_id)} startIcon={<DeleteIcon />}> Delete </Button></TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>
    );
}