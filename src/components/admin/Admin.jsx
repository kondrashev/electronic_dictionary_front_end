import React from 'react';
import MenuAdmin from './MenuAdmin';
import TableUsers from './TableUsers';

const Admin = (props) => {
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