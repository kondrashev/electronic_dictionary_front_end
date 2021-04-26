import { GET_ALL_CATEGORIES_DATA_SUCCESS } from './action';

export const getAllCategoriesReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_DATA_SUCCESS:
            return action.categories;
        default:
            return state;
    }
}