export const DELETE_USERS_DATA_SUCCESS = 'DELETE_USERS_DATA_SUCCESS';

export const deleteUsersFetchDataSuccess = (users) => {
    return {
        type: DELETE_USERS_DATA_SUCCESS,
        users
    }
}
export const deleteUsersFetchData = (data) => {
    const { url, userListId, setSelected, values, setValues } = data;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userListId)
        });
        let error = response;
        if (error.status !== 200) {
            setValues({
                ...values,
                number: 5,
                typeMistake: `Error from server-${error.statusText} №${error.status}!!!`,
                alertMistakes: true
            });
            response = await response.json();
            dispatch(deleteUsersFetchDataSuccess(response));
            setSelected([]);
            setValues({
                ...values,
                listUsers: response
            });
            response.map((login) => {
                for (let i = 0; i < localStorage.length; i++) {
                    if (login === localStorage.key(i)) {
                        localStorage.removeItem(localStorage.key(i));
                    }
                }
            })
        }
    }
}