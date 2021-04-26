import { SEARCH_WORD_DATA_SUCCESS } from './action';

export const searchWordReducer = (state = '', action) => {
    switch (action.type) {
        case SEARCH_WORD_DATA_SUCCESS:
            return action.word;
        default:
            return state;
    }
}