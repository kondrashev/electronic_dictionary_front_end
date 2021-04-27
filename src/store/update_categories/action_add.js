export const ADD_CATEGORY_DATA_SUCCESS = 'ADD_CATEGORY_DATA_SUCCESS';

export const addCategoryFetchDataSuccess = (category) => {
    return {
        type: ADD_CATEGORY_DATA_SUCCESS,
        category
    }
}
export const addCategoryFetchData = (data) => {
    const { url, category, values, setValues, setValueNameCategory } = data;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
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
            if (response.name) {
                dispatch(addCategoryFetchDataSuccess(response));
                setValueNameCategory('');
                let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                user.categories.push(category);
                localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
            } else {
                setValueNameCategory('');
                setValues({
                    ...values,
                    number: 4,
                    typeMistake: 'This category already has in the dictionary-',
                    alertMistakes: true
                });
            }
        }
    }
}