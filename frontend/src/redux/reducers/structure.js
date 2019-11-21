import {SET_STRUCTURE} from './../actionTypes';

const initialState = {
    files: [],
    name: 'home',
    parentFolder: null,
    subfolders: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_STRUCTURE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
