import { combineReducers } from 'redux';
import { loadUsersReducer } from './load_users/reducer';
import { loadCategoriesReducer } from './load_categories/reducer';
import { countPagesReducer } from './count_pages/reducer';
import { updateCategoriesReducer } from './update_categories/reducer';
import { loadWordsReducer } from './load_words/reducer';
import { updateWordsReducer } from './update_words/reducer';
import { getAllCategoriesReducer } from './get_all_categories/reducer';
import { searchWordReducer } from './search_word/reducer';

export default combineReducers({
    loadUsersReducer,
    loadCategoriesReducer,
    countPagesReducer,
    updateCategoriesReducer,
    loadWordsReducer,
    updateWordsReducer,
    getAllCategoriesReducer,
    searchWordReducer
});