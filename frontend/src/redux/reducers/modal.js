import {OPEN_MODAL, CLOSE_MODAL} from './../actionTypes';

const initialState = {
    isOpen: false,
    type: null,
    properties: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case CLOSE_MODAL: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
}
