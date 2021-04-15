import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ApplictationContext } from '../Application';

const SearchWord = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const pronunciation = (name) => {
        return `${'https://translate.google.com/#view=home&op=translate&sl=en&tl=uk&text='}${name}`;
    }
    const classes = useStyles();
    if (values.getContent.name === null) {
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
                                {values.getContent.name}
                            </TableCell>
                            <TableCell align="right">{values.getContent.meaning}</TableCell>
                            <TableCell align="right">{values.getContent.date}</TableCell>
                            <TableCell align="right">
                                <a
                                    href={pronunciation(values.getContent.name)}
                                    target='_blank'
                                >
                                    {values.getContent.name}
                                </a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        )
    }
}
export default SearchWord;