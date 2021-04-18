import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ApplictationContext } from '../Application';
import { connect } from 'react-redux';
import { addUserFetchData } from '../store/add_user/actions';

const RegistrationForm = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { userAdd } = props;
    const closeFormRegistration = () => {
        window.location.href = '/';
    }
    const loginChange = (event) => {
        setValues({
            ...values,
            login: event.target.value
        });
    }
    const passwordChange = (event) => {
        setValues({
            ...values,
            password: event.target.value
        });
    }
    const addUser = () => {
        const checkDate = () => {
            if (new Date().getDate() < 10) {
                return `${'0'}${new Date().getDate()}`;
            } else {
                return new Date().getDate();
            }
        }
        const checkMonth = () => {
            if (new Date().getMonth() + 1 < 10) {
                return `${'0'}${new Date().getMonth() + 1}`;
            } else {
                return new Date().getMonth() + 1;
            }
        }
        let user = {
            login: values.login,
            password: values.password,
            date: `${checkDate()}.${checkMonth()}.${new Date().getFullYear()}p.`
        }
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${'https://specialdictionary.herokuapp.com/add/user'}`,
            user: user
        }
        userAdd(data);
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            addUser();
        }
    }
    return (
        <div
            className='registration_form'
        >
            <button
                className='close_registration_form'
            >
                <a
                    onClick={closeFormRegistration}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                    >
                        <path d="M6 4.36L10.02.34a1.16 1.16 0 0 1 1.64 1.64L7.64 6l4.02 4.02a1.16 1.16 0 0 1-1.64 1.64L6 7.64l-4.02 4.02a1.16 1.16 0 0 1-1.64-1.64L4.36 6 .34 1.98A1.16 1.16 0 1 1 1.98.34L6 4.36z" fill="black"></path>
                    </svg>
                </a>
            </button>
            <TextField
                id="outlined-search"
                label="User name"
                type="search"
                variant="outlined"
                onChange={loginChange}
                style={{
                    width: '400px'
                }}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={passwordChange}
                onKeyPress={onKeyPress}
                style={{
                    width: '400px'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={addUser}
                style={{
                    width: '400px',
                    height: '50px',
                    marginBottom: '30px'
                }}
            >
                Registration
            </Button>
        </div>
    )
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        userAdd: (data) => dispatch(addUserFetchData(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);