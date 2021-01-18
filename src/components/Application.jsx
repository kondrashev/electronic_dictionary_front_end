import React from 'react';
import AuthorizationForm from './authorization/AuthorizationForm';
import User from './user/User';
import Admin from './admin/Admin';
import Alerts from './authorization/Alerts';
import RegistrationForm from './authorization/RegistrationForm';

const Applictation = () => {
    const [listUsers, setListUsers] = React.useState([]);
    return (
        <div>
            {
                window.location.search.replace('?', '') === '' ||
                    window.location.search.replace('?', '') === 'logout' ?
                    <AuthorizationForm /> :
                    window.location.search.replace('?', '') === 'admin' ?
                        <Admin
                            setListUsers={setListUsers}
                            listUsers={listUsers}
                        /> :
                        window.location.search.replace('?', '') === 'user' ?
                            <User /> :
                            window.location.search.replace('?', '') === 'registration' ?
                                <RegistrationForm /> :
                                window.location.search.replace('?', '') === '1' ?
                                    <Alerts
                                        number={1}
                                    /> :
                                    window.location.search.replace('?', '') === '2' ?
                                        <Alerts
                                            number={2}
                                        /> :
                                        window.location.search.replace('?', '') === '3' ?
                                            <Alerts
                                                number={3}
                                            /> : null
            }
        </div>
    )
}
export default Applictation;