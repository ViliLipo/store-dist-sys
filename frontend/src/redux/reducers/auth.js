import { ADD_AUTHORIZATION, REMOVE_AUTHORIZATION } from './../actionTypes';

const initialState = {
    isAuthorized: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_AUTHORIZATION: {
            return {
                ...state,
                ...action.payload
            }
        }
        case REMOVE_AUTHORIZATION: {
            return {
                ...state,
                ...action.payload
           }
        }
        default:
            return state
    }
}
