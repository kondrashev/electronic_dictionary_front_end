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
        let response = await fetch(url);
        if (response.status === 200) {
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
        } else {
            setValues({
                ...values,
                number: 5,
                typeMistake: `Error from server-${response.statusText} №${response.status}!!!`,
                alertMistakes: true
            });
        }
    }
}