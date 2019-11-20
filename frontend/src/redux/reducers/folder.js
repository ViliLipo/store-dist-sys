import {SET_CURRENT_ID} from './../actionTypes';

// 2 is considered the root location.
const initialState = {
    id: 2,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_ID: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
