import React from 'react';
import MenuAdmin from './MenuAdmin';
import TableUsers from './TableUsers';

const Admin = (props) => {
    const [searchUserMark, setSearchUserMark] = React.useState(false);
    const [getSearchUser, setGetSearchUser] = React.useState([]);
    const [getUsers, setGetUsers] = React.useState(true);
    if (sessionStorage.login === 'log_in' && sessionStorage.userName === 'admin') {
        getUsers === true &&
            (async () => {
                let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/users?pattern=${'user'}`}`);
                response = await response.json();
                props.setListUsers(response);
                setGetUsers(false);
            })();
        return (
            <div>
                <MenuAdmin
                    setSearchUserMark={setSearchUserMark}
                    setGetSearchUser={setGetSearchUser}
                    listUsers={props.listUsers}
                />
                <TableUsers
                    setListUsers={props.setListUsers}
                    setSearchUserMark={setSearchUserMark}
                    users={searchUserMark === false ? props.listUsers : getSearchUser}
                />
            </div>
        )
    } else {
        return null;
    }
}
export default Admin;