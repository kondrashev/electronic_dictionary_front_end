export const DELETE_CATEGORIES_DATA_SUCCESS = 'DELETE_CATEGORIES_DATA_SUCCESS';

export const deleteCategoriesFetchDataSuccess = (categories) => {
    return {
        type: DELETE_CATEGORIES_DATA_SUCCESS,
        categories
    }
}
export const deleteCategoriesFetchData = (data) => {
    const { url, listIdCategories } = data;
    return async (dispatch) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listIdCategories)
        });
        response = await response.json();
        dispatch(deleteCategoriesFetchDataSuccess(response));
        let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
        response.map(categoryName => {
            user.categories.map((category, index) => {
                if (categoryName === category.name) {
                    user.categories.splice(index, 1);
                }
            })
        })
        localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
    }
}