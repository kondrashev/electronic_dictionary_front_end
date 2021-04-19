export const EDIT_CATEGORY_DATA_SUCCESS = 'EDIT_CATEGORY_DATA_SUCCESS';

export const editCategoryFetchDataSuccess = (category) => {
    return {
        type: EDIT_CATEGORY_DATA_SUCCESS,
        category
    }
}
export const editCategoryFetchData = (data) => {
    const { url, editCategory, valuesCategory, setValuesCategory } = data;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editCategory)
        });
        response = await response.json();
        if (response.name !== null) {
            dispatch(editCategoryFetchDataSuccess(response));
            setValuesCategory({
                ...valuesCategory,
                show: !valuesCategory.show,
                border: valuesCategory.show == true ? 1 : 0,
                newNameCategory: ''
            });
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            Object.entries(user.categories).map(([, value]) => {
                if (value.name === valuesCategory.oldNameCategory) {
                    value.name = valuesCategory.newNameCategory;
                }
            })
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
        }
    }
}