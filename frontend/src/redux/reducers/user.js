import {ADD_USERNAME, REMOVE_USERNAME} from './../actionTypes';

const initialState = {
    username: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_USERNAME: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case REMOVE_USERNAME: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
}
