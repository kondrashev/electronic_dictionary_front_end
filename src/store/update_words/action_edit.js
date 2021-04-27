export const EDIT_WORD_DATA_SUCCESS = 'EDIT_WORD_DATA_SUCCESS';

export const editWordFetchDataSuccess = (word) => {
    return {
        type: EDIT_WORD_DATA_SUCCESS,
        word
    }
}
export const editWordFetchData = (data) => {
    const { url, editWord, values, setValues, valuesTableRowWord, setValuesTableRowWord } = data;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editWord)
        });
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
            switch (editWord.mark) {
                case 'name':
                    setValuesTableRowWord({
                        ...valuesTableRowWord,
                        newNameWord: '',
                        showEditNameWord: false
                    });
                    break;
                case 'meaning':
                    setValuesTableRowWord({
                        ...valuesTableRowWord,
                        newMeaningWord: '',
                        showEditMeaningWord: false
                    });
                    break;
            }
            dispatch(editWordFetchDataSuccess(response));
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            Object.entries(user.categories).map(([, value]) => {
                if (value.name === values.currentNameCategory) {
                    switch (editWord.mark) {
                        case 'name':
                            value.words.map((word) => {
                                if (word.name === valuesTableRowWord.oldNameWord) {
                                    word.name = valuesTableRowWord.newNameWord
                                }
                            })
                            break;
                        case 'meaning':
                            value.words.map((word) => {
                                if (word.meaning === valuesTableRowWord.oldMeaningWord) {
                                    word.meaning = valuesTableRowWord.newMeaningWord
                                }
                            })
                            break;
                    }
                }
            })
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
        }
    }
}