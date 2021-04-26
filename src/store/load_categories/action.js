export const LOAD_CATEGORIES_DATA_SUCCESS = 'LOAD_CATEGORIES_DATA_SUCCESS';

export const loadCategoriesFetchDataSuccess = (categories) => {
    return {
        type: LOAD_CATEGORIES_DATA_SUCCESS,
        categories
    }
}
export const loadCategoriesFetchData = (data) => {
    const { url, values, setValues } = data;
    return async (dispatch) => {
        try {
            let response = await fetch(url);
            response = await response.json();
            dispatch(loadCategoriesFetchDataSuccess(response));
            setValues({
                ...values,
                changeCountPages: {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://${values.prefixURL}.herokuapp.com/count/categories?userName=${sessionStorage.userName}`}`,
                    range: 5
                }
            });
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