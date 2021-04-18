import { combineReducers } from 'redux';
import { loadUsersReducer } from './load_users/reducer';
import { addUserReducer } from './add_user/reducer';
export default combineReducers({
    loadUsersReducer,
    addUserReducer
});