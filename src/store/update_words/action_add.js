export const ADD_WORD_DATA_SUCCESS = 'ADD_WORD_DATA_SUCCESS';

export const addWordFetchDataSuccess = (word) => {
    return {
        type: ADD_WORD_DATA_SUCCESS,
        word
    }
}
export const addWordFetchData = (data) => {
    const { url, word, values, setValues, valuesWordForm, setValuesWordForm } = data;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        });
        let error = response;
        if (error.status !== 200) {
            setValues({
                ...values,
                number: 5,
                typeMistake: `Error from server-${error.statusText} №${error.status}!!!`,
                alertMistakes: true
            });
        } else {
            response = await response.json();
            if (response.name) {
                dispatch(addWordFetchDataSuccess(response));
                setValuesWordForm({
                    ...valuesWordForm,
                    valueSelect: '',
                    valueName: '',
                    valueMeaning: ''
                });
                let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                Object.entries(user.categories).map(([, value]) => {
                    if (value.name === valuesWordForm.valueSelect) {
                        value.words.push(word);
                    }
                })
                localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
                setValues({
                    ...values,
                    showListCategories: false,
                    showListWords: true,
                    currentNameCategory: valuesWordForm.valueSelect
                });
            } else {
                setValuesWordForm({
                    ...valuesWordForm,
                    valueSelect: '',
                    valueName: '',
                    valueMeaning: '',
                    number: 4,
                    typeMistake: 'This word already has in the dictionary-',
                    alertMistakes: true
                });
            }
        }
    }
}