import { LOAD_CATEGORIES_DATA_SUCCESS } from './action';

export const loadCategoriesReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_CATEGORIES_DATA_SUCCESS:
            return action.categories;
        default:
            return state;
    }
}