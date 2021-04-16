import React from 'react';
import MenuAdmin from './MenuAdmin';
import TableUsers from './TableUsers';
import { ApplictationContext } from '../Application';

const Admin = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    React.useEffect(() => {
        (async () => {
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/users?pattern=${'user'}`}`);
            response = await response.json();
            setValues({
                ...values,
                listUsers: response
            });
        })();
    }, []);
    if (sessionStorage.login === 'log_in' && sessionStorage.userName === 'admin') {
        return (
            <div>
                <MenuAdmin />
                <TableUsers />
            </div>
        )
    } else {
        return null;
    }
}
export default Admin;