export const EDIT_WORD_DATA_SUCCESS = 'EDIT_NAME_WORD_DATA_SUCCESS';

export const editWordFetchDataSuccess = (word) => {
    return {
        type: EDIT_WORD_DATA_SUCCESS,
        word
    }
}
export const editWordFetchData = (data) => {
    const { url, editWord, values, setValues } = data;
    const { mark } = editWord;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editWord)
        });
        response = await response.json();
        if (response.name !== null) {
            if (mark === 'name') {
                setValues({
                    ...values,
                    newNameWord: '',
                    showEditNameWord: false
                });
            } else if ('meaning') {
                setValues({
                    ...values,
                    newMeaningWord: '',
                    showEditMeaningWord: false
                });
            }
            dispatch(editWordFetchDataSuccess(response));
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            Object.entries(user.categories).map(([, value]) => {
                if (value.name === values.currentNameCategory) {
                    value.words.map((word) => {
                        if (mark === 'name') {
                            if (word.name === values.oldNameWord) {
                                word.name = values.newNameWord
                            }
                        } else if (mark === 'meaning') {
                            if (word.meaning === values.oldMeaningWord) {
                                word.meaning = values.newMeaningWord
                            }
                        }
                    })
                }
            })
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
        }
    }
}