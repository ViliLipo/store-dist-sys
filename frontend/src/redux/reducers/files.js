import {SET_FILES} from './../actionTypes';

const initialState = {
    files: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_FILES: {
            return {
                ...state,
                files: [...action.payload.files],
            };
        }
        default:
            return state;
    }
}
