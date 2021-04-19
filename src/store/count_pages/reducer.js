import { COUNT_PAGES_DATA_SUCCESS } from './action';

export const countPagesReducer = (state = 0, action) => {
    switch (action.type) {
        case COUNT_PAGES_DATA_SUCCESS:
            return action.pages;
        default:
            return state;
    }
}