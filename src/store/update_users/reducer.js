import { DELETE_USERS_DATA_SUCCESS } from './action_delete';

export const updateUsersReducer = (state = '', action) => {
    switch (action.type) {
        case DELETE_USERS_DATA_SUCCESS:
            return action.users;
        default:
            return state;
    }
}