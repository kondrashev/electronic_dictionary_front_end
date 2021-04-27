export const SEARCH_WORD_DATA_SUCCESS = 'SEARCH_WORD_DATA_SUCCESS';

export const searchWordFetchDataSuccess = (word) => {
    return {
        type: SEARCH_WORD_DATA_SUCCESS,
        word
    }
}
export const searchWordFetchData = (data) => {
    const { url, values, setValues } = data;
    return async (dispatch) => {
        try {
            let response = await fetch(url);
            let error = response;
            error.status !== 200 &&
                setValues({
                    ...values,
                    number: 5,
                    typeMistake: `Error from server-${error.statusText} №${error.status}!!!`,
                    alertMistakes: true
                });
            response = await response.json();
            if (response.name) {
                dispatch(searchWordFetchDataSuccess(response));
                setValues({
                    ...values,
                    showListCategories: false,
                    showListWords: false,
                    showSearchWord: true,
                    valueSearchWord: response.name
                });
            } else {
                setValues({
                    ...values,
                    number: 4,
                    showSearchWord: false,
                    typeMistake: `This word didn't find-`,
                    alertMistakes: true
                });
            }
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