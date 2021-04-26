import { ADD_WORD_DATA_SUCCESS } from './action_add';
import { DELETE_WORDS_DATA_SUCCESS } from './action_delete';
import { EDIT_WORD_DATA_SUCCESS } from './action_edit';

export const updateWordsReducer = (state = '', action) => {
    switch (action.type) {
        case ADD_WORD_DATA_SUCCESS:
            return action.word;
        case DELETE_WORDS_DATA_SUCCESS:
            return action.words;
        case EDIT_WORD_DATA_SUCCESS:
            return action.word;
        default:
            return state;
    }
}