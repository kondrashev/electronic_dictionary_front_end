import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

const SearchWord = (props) => {
    const { searchWord } = props;
    console.log(searchWord);
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const pronunciation = (name) => {
        return `${'https://translate.google.com/#view=home&op=translate&sl=en&tl=uk&text='}${name}`;
    }
    const classes = useStyles();
    if (!searchWord.name) {
        sessionStorage.setItem('mistake', 'This word not found-');
        window.location.href = '/?3';
    } else {
        return (
            < TableContainer component={Paper} >
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Meaning</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Pronunciation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {searchWord.name}
                            </TableCell>
                            <TableCell align="right">{searchWord.meaning}</TableCell>
                            <TableCell align="right">{searchWord.date}</TableCell>
                            <TableCell align="right">
                                <a
                                    href={pronunciation(searchWord.name)}
                                    target='_blank'
                                >
                                    {searchWord.name}
                                </a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        )
    }
}
const mapStateToProps = state => {
    return {
        searchWord: state.searchWordReducer
    };
}
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SearchWord);