import { ADD_USER_DATA_SUCCESS } from './actions';

export const addUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_DATA_SUCCESS:
            return action.user;
        default:
            return state;
    }
}