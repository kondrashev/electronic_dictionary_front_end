import React from 'react';
import MenuAdmin from './MenuAdmin';
import TableUsers from './TableUsers';

const Admin = (props) => {
    const [searchUserMark, setSearchUserMark] = React.useState(false);
    const [getSearchUser, setGetSearchUser] = React.useState([]);
    const [getUsers, setGetUsers] = React.useState(true);
    const { listUsers, setListUsers } = props;
    React.useEffect(() => {
        (async () => {
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/users?pattern=${'user'}`}`);
            response = await response.json();
            setListUsers(response);
            setGetUsers(false);
        })();
    }, []);
    if (sessionStorage.login === 'log_in' && sessionStorage.userName === 'admin') {
        return (
            <div>
                <MenuAdmin
                    setSearchUserMark={setSearchUserMark}
                    setGetSearchUser={setGetSearchUser}
                    listUsers={listUsers}
                />
                <TableUsers
                    setListUsers={setListUsers}
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