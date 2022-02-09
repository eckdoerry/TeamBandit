import React, {useEffect, useState} from "react";

import EditStudent from "./EditStudent";
import styles from '../students.module.css';

// This stuff is for the Tables
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import TablePagination from '@mui/material/TablePagination';


// components
import AddStudent from "./AddStudent";
import { toast } from 'react-toastify';

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
                    {headCell.label === "Edit" && headCell.label}
                    {headCell.label === "Delete" && headCell.label}
                    {(headCell.label !== "Edit" && headCell.label !== "Delete") &&
                    <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    >
                    {headCell.label}
                    {orderBy === headCell.id && (
                        <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    )}
                    </TableSortLabel>}
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
    
        const EnhancedTableToolbar = ({numSelected, courseInfo, setStudentsChange}) => {
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
            <AddStudent courseInfo={courseInfo} setStudentsChange={setStudentsChange}/>
            
    
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
        const headCells = [
            {
                id: 'student_fname',
                numeric: false,
                disablePadding: true,
                label: 'First Name',
            },
            {
                id: 'student_lname',
                numeric: true,
                disablePadding: false,
                label: 'Last Name',
            },
            {
                id: 'student_emplid',
                numeric: true,
                disablePadding: false,
                label: 'Student ID',
            },
            {
                id: 'student_email',
                numeric: true,
                disablePadding: false,
                label: 'Email',
            },
            {
                id: 'student_gpa',
                numeric: true,
                disablePadding: false,
                label: 'GPA',
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

const ListStudents = ({courseInfo}) => {
    const [students, setStudents] = useState([]);
    const [studentsChange, setStudentsChange] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('studentTeam');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);

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


    // Delete function
    const deleteStudent = async (id) => {
        try {
            const course_id = courseInfo.course_id;
            
            const PLEASE = {course_id};
            
            
            await fetch(`http://localhost:5000/students/students/${id}/${course_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token },
                body: JSON.stringify(PLEASE)
            });


            toast.success("Student was deleted!");
            setStudentsChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete student!");
        }
    }
    
    const getStudents = async () => {
        try {
            const response = await fetch(`http://localhost:5000/students/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
        
            setStudents(jsonData);
            
            } catch (err) {
            console.error(err.message);
            }
        };
    
    useEffect(() => {
        getStudents();
        setStudentsChange(false);
    }, [studentsChange]);


    return(
        <div className = {styles.container}>
            <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} courseInfo = {courseInfo} setStudentsChange={setStudentsChange} />
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
                rowCount={students.length}
                courseInfo = {courseInfo} 
                setRowChange={setRowChange} 
                />
                <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(students, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((student, index) => {
                    const isItemSelected = isSelected(student.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={student.student_id}
                        selected={isItemSelected}
                        >
                        
                        
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="student"
                            
                        >
                            {student.student_fname}
                        </TableCell>
                        <TableCell align="right">{student.student_lname}</TableCell>
                        <TableCell align="right">{student.student_emplid}</TableCell>
                        <TableCell align="right">{student.student_email}</TableCell>
                        <TableCell align="right">{student.student_gpa}</TableCell>
                        <TableCell align="right"><EditStudent student={student} setStudentsChange={setStudentsChange} courseInfo={courseInfo}/></TableCell>
                        <TableCell align="right"><Button variant="outlined" color="error" onClick = {() => deleteStudent(student.student_id)} startIcon={<DeleteIcon />}> Delete </Button></TableCell>
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
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>
            </div>

            
    ); 
};

export default ListStudents;