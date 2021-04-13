import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ChooseCategory from './ChooseCategory';
import TableRowWord from './TableRowWord';

function TableWords(props) {
    const { values, setValues } = props;
    const [showChooseCategory, setShowChooseCategory] = React.useState(false);
    const [categoryName, setCategoryName] = React.useState('');
    const [showButtonMoveWords, setShowButtonMoveWords] = React.useState(false);
    const [showButtonDeleteWords, setShowButtonDeleteWords] = React.useState(true);
    const [listIdWords, setListIdWords] = React.useState([]);
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
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'meaning', numeric: true, disablePadding: false, label: 'Meaning' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
        { id: 'pronunciation', numeric: true, disablePadding: false, label: 'Pronunciation' }
    ];
    function EnhancedTableHead(props) {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
    const useToolbarStyles = makeStyles((theme) => ({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }));
    const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        const { numSelected } = props;
        numSelected > 0 ? setShowChooseCategory(true) : setShowChooseCategory(false);
        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Words
                    </Typography>
                )}
                {numSelected > 0 && (
                    <div>
                        {
                            showButtonDeleteWords === true &&
                            <Tooltip
                                title="Delete"
                            >
                                <IconButton
                                    aria-label="delete"
                                    onClick={deleteWords}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {
                            showButtonMoveWords === true &&
                            <Tooltip
                                title="Move"
                            >
                                <IconButton
                                    aria-label="move"
                                    onClick={deleteWords}
                                >
                                    <DoubleArrowIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                )}
            </Toolbar>
        );
    };
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }));
    const selectCategory = (event) => {
        setCategoryName(event.target.value);
        if (event.target.value === '') {
            setShowButtonDeleteWords(true);
            setShowButtonMoveWords(false);
        } else {
            setShowButtonDeleteWords(false);
            setShowButtonMoveWords(true);
        }
    }
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            setListIdWords(rows.map((row) => parseInt(row.id)));
            return;
        } else {
            setListIdWords([]);
        }
        setSelected([]);
    };
    const getIdWord = (event) => {
        let listId = listIdWords;
        if (event.target.checked === true) {
            listId.push(parseInt(event.target.value));
            setListIdWords(listId);
            setShowButtonMoveWords(false);
            setShowButtonDeleteWords(true);
        } else {
            setListIdWords(listIdWords.filter(item => item != parseInt(event.target.value)));
            setShowButtonDeleteWords(false);
        }
    }
    async function deleteWords() {
        setValues({
            ...values,
            countWords: 0
        });
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/delete/words?categoryName=${categoryName}`}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listIdWords)
        })
        response = await response.json();
        setSelected([]);
        setListIdWords([]);
        setShowButtonDeleteWords(false);
        let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
        let moveWords = [];
        user.categories.map((category) => {
            if (values.currentNameCategory === category.name) {
                response.map((wordName) => {
                    category.words.map((word, index) => {
                        if (wordName === word.name) {
                            if (categoryName !== '') moveWords.push(word);
                            category.words.splice(index, 1);
                        }
                    })
                })
            }
        })
        if (categoryName !== '') {
            Object.entries(user.categories).map(([, value]) => {
                if (value.name === categoryName) {
                    moveWords.map((word) => {
                        word.categoryName = categoryName;
                        value.words.push(word);
                    })
                }
            })
            setCategoryName('');
        }
        localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
        setValues({
            ...values,
            loadWords: response
        });
    }
    const rows = values.getContent;
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div
            className={classes.root}
        >
            {
                showChooseCategory === true &&
                <ChooseCategory
                    selectCategory={selectCategory}
                    values={values}
                    setValues={setValues}
                />
            }
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRowWord
                                            key={row.name}
                                            row={row}
                                            isItemSelected={isItemSelected}
                                            getIdWord={getIdWord}
                                            handleClick={handleClick}
                                            labelId={labelId}
                                            values={values}
                                            setValues={setValues}
                                        />
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
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
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div >
    );
}
export default TableWords;