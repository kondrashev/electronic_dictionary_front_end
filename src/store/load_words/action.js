export const LOAD_WORDS_DATA_SUCCESS = 'LOAD_WORDS_DATA_SUCCESS';

export const loadWordsFetchDataSuccess = (words) => {
    return {
        type: LOAD_WORDS_DATA_SUCCESS,
        words
    }
}
export const loadWordsFetchData = (data) => {
    const { url, values, setValues } = data;
    return async (dispatch) => {
        try {
            let response = await fetch(url);
            response = await response.json();
            dispatch(loadWordsFetchDataSuccess(response));
            setValues({
                ...values,
                changeCountPages: {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://${values.prefixURL}.herokuapp.com/count/words?categoryName=${values.currentNameCategory}&userName=${sessionStorage.userName}`}`,
                    range: 24
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