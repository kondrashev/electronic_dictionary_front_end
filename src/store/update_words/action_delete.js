export const DELETE_WORDS_DATA_SUCCESS = 'DELETE_WORDS_DATA_SUCCESS';

export const deleteWordsFetchDataSuccess = (words) => {
    return {
        type: DELETE_WORDS_DATA_SUCCESS,
        words
    }
}
export const deleteWordsFetchData = (data) => {
    const { url, values, setValues, setSelected } = data;
    const { listIdWords } = data.values;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listIdWords)
        });
        if (response.status === 200) {
            response = await response.json();
            setSelected([]);
            setValues({
                ...values,
                listIdWords: [],
                showButtonDeleteWords: false
            });
            dispatch(deleteWordsFetchDataSuccess(response));
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            let moveWords = [];
            user.categories.map((category) => {
                if (values.currentNameCategory === category.name) {
                    response.map((wordName) => {
                        category.words.map((word, index) => {
                            if (wordName === word.name) {
                                if (values.categoryName) moveWords.push(word);
                                category.words.splice(index, 1);
                            }
                        })
                    })
                }
            })
            if (values.categoryName) {
                Object.entries(user.categories).map(([, value]) => {
                    if (value.name === values.categoryName) {
                        moveWords.map((word) => {
                            word.categoryName = values.categoryName;
                            value.words.push(word);
                        })
                    }
                })
                setValues({
                    ...values,
                    categoryName: ''
                });
            }
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
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