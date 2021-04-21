export const GET_ALL_CATEGORIES_DATA_SUCCESS = 'GET_ALL_CATEGORIES_DATA_SUCCESS';

export const getAllCategoriesFetchDataSuccess = (categories) => {
    return {
        type: GET_ALL_CATEGORIES_DATA_SUCCESS,
        categories
    }
}
export const getAllCategoriesFetchData = (url) => {
    return async (dispatch) => {
        let response = await fetch(url);
        response = await response.json();
        dispatch(getAllCategoriesFetchDataSuccess(response));
    }
}