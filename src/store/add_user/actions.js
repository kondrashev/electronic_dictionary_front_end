export const ADD_USER_DATA_SUCCESS = 'ADD_USER_DATA_SUCCESS';

export const addUserFetchDataSuccess = (user) => {
    return {
        type: ADD_USER_DATA_SUCCESS,
        user
    }
}
export const addUserFetchData = (data) => {
    const { url, user } = data;
    const { date } = data.user;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        response = await response.json();
        dispatch(addUserFetchDataSuccess(response));
        if (response.login !== null) {
            let user = {
                login: response.login,
                password: response.password,
                date: date,
                role: 'user',
                categories: []
            }
            localStorage.setItem(response.login, JSON.stringify(user));
            window.location.href = '/?1'
        } else {
            window.location.href = '/?2'
        }
    }
}