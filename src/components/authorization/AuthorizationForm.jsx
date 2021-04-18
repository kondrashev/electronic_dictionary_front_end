import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { loadUsersFetchData } from '../../store/load_users/actions';

const AuthorizationForm = (props) => {
    const { getUsers } = props;
    React.useEffect(() => {
        let getLoad = 1;
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/load/users?pattern=${'user'}`}`,
            getLoad: getLoad
        }
        getUsers(data);
    }, []);
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('searchUserMark', '');
    $('body')
        .css({
            background: '#999999'
        })
    const loginChange = (event) => {
        sessionStorage.setItem('userName', event.target.value);
    }
    const login = () => {
        sessionStorage.setItem('login', 'log_in');
    }
    const toRegistration = () => {
        window.location.href = '/?registration'
    }
    let warning = window.location.search.replace('?', '');
    if (warning == 'logout') {
        sessionStorage.setItem('login', 'logout');
        $('body')
            .css({
                background: '#999999'
            })
    }
    return (
        <form
            className='authorization_form'
            action='https://specialdictionary.herokuapp.com/j_spring_security_check'
            method='POST'
        >
            <h
                className='sign'
            >
                Sign in
            </h>
            <input
                className='login'
                autoFocus type='text'
                name='j_login'
                placeholder='Login'
                onChange={loginChange}
            >
            </input>
            <input
                className='password'
                type='password'
                name='j_password'
                placeholder='Password'
            >
            </input>
            <a
                className='registration'
                onClick={toRegistration}
                style={{
                    cursor: 'pointer'
                }}
            >
                Registration
            </a>
            <button
                className='send'
                onClick={login}
            >
                Send
            </button>
        </form >
    )
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        getUsers: (data) => dispatch(loadUsersFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationForm);