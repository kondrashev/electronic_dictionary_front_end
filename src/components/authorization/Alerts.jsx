import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ApplictationContext } from '../Application';

export default function Alerts(props) {
    const { values, setValues } = React.useContext(ApplictationContext);
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    const classes = useStyles();
    const position = {
        width: 'auto',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)'
    }
    switch (values.number ? values.number : parseInt(window.location.search.replace('?', ''), 10)) {
        case 1:
            return (
                <div
                    className={classes.root}
                    style={position}
                >
                    <Alert
                        severity="success"
                        onClose={() => {
                            window.location.href = '/'
                        }}
                    >
                        <AlertTitle>Success</AlertTitle>
                        The registration is <strong>successful!</strong>
                    </Alert>
                </div>
            )
        case 2:
            return (
                <div
                    className={classes.root}
                    style={position}
                >
                    <Alert
                        severity="error"
                        onClose={() => {
                            window.location.href = '/?registration'
                        }}
                    >
                        <AlertTitle>Error</AlertTitle>
                        This login is already <strong>use!</strong>
                    </Alert>
                </div>
            )
        case 3:
            return (
                <div
                    className={classes.root}
                    style={position}
                >
                    <Alert
                        severity="warning"
                        onClose={() => {
                            window.location.href = '/?registration'
                        }}
                    >
                        <AlertTitle>Warning</AlertTitle>
                        You have to <strong>register!</strong>
                    </Alert>
                </div>
            )
        case 4:
            sessionStorage.searchWordMark = '';
            return (
                <div
                    className={classes.root}
                    style={position}
                >
                    <Alert
                        severity="info"
                        onClose={() => setValues({
                            ...values,
                            alertMistakes: false
                        })}
                    >
                        <AlertTitle>Info</AlertTitle>
                        {values.typeMistake}<strong>check it out!</strong>
                    </Alert>
                </div>
            )
        case 5:
            return (
                <div
                    className={classes.root}
                    style={position}
                >
                    <Alert
                        severity="info"
                        onClose={() => setValues({
                            ...values,
                            alertMistakes: false
                        })}
                    >
                        <AlertTitle>Info</AlertTitle>
                        {values.typeMistake}
                    </Alert>
                </div>
            )
    }
}