import React from 'react';
import MenuAdmin from './MenuAdmin';
import TableUsers from './TableUsers';

const Admin = (props) => {
    const { values, setValues } = props;
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
                <MenuAdmin
                    values={values}
                    setValues={setValues}
                />
                <TableUsers
                    values={values}
                    setValues={setValues}
                />
            </div>
        )
    } else {
        return null;
    }
}
export default Admin;