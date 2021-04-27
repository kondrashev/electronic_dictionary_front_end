import React from 'react';
import MenuAdmin from './MenuAdmin';
import TableUsers from './TableUsers';
import Alerts from '../authorization/Alerts';
import { ApplictationContext } from '../Application';

const Admin = (props) => {
    const { values } = React.useContext(ApplictationContext);
    if (sessionStorage.login === 'log_in' && sessionStorage.userName === 'admin') {
        return (
            <div>
                <MenuAdmin />
                <TableUsers />
                {values.alertMistakes && <Alerts />}
            </div>
        )
    } else {
        return null;
    }
}
export default Admin;