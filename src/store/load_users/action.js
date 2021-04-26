export const LOAD_USERS_DATA_SUCCESS = 'LOAD_USERS_DATA_SUCCESS';

export const loadUsersFetchDataSuccess = (users) => {
    return {
        type: LOAD_USERS_DATA_SUCCESS,
        users
    }
}
export const loadUsersFetchData = (data) => {
    const { url, getLoad, values, setValues } = data;
    if (getLoad) {
        let users = [];
        for (let i = 0; i < localStorage.length; i++) {
            users[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        return async () => {
            try {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(users)
                })
            } catch {
                setValues({
                    ...values,
                    number: 5,
                    typeMistake: 'Too many requests!!!',
                    alertMistakes: true
                });
            }
        }
    } else {
        return async (dispatch) => {
            try {
                let response = await fetch(url);
                response = await response.json();
                dispatch(loadUsersFetchDataSuccess(response));
            } catch {
                setValues({
                    ...values,
                    number: 5,
                    typeMistake: 'Too many requests!!!',
                    alertMistakes: true
                });
            }
        }
    }
}