export const LOAD_USERS_DATA_SUCCESS = 'LOAD_USERS_DATA_SUCCESS';

export const loadUsersFetchDataSuccess = (users) => {
    return {
        type: LOAD_USERS_DATA_SUCCESS,
        users
    }
}
export const loadUsersFetchData = (data) => {
    const { url, getLoad } = data;
    if (getLoad) {
        let users = [];
        for (let i = 0; i < localStorage.length; i++) {
            users[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        return async () => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            })
        }
    } else {
        return async (dispatch) => {
            let response = await fetch(url);
            response = await response.json();
            dispatch(loadUsersFetchDataSuccess(response));
        }
    }
}