import { ADD_CATEGORY_DATA_SUCCESS } from './action_add';
import { DELETE_CATEGORIES_DATA_SUCCESS } from './action_delete';
import { EDIT_CATEGORY_DATA_SUCCESS } from './action_edit';

export const updateCategoriesReducer = (state = '', action) => {
    switch (action.type) {
        case ADD_CATEGORY_DATA_SUCCESS:
            return action.category;
        case DELETE_CATEGORIES_DATA_SUCCESS:
            return action.categories;
        case EDIT_CATEGORY_DATA_SUCCESS:
            return action.category;
        default:
            return state;
    }
}