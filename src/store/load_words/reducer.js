import { LOAD_WORDS_DATA_SUCCESS } from './action';

export const loadWordsReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_WORDS_DATA_SUCCESS:
            return action.words;
        default:
            return state;
    }
}