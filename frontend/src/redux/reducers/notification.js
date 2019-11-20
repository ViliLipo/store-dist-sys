import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from './../actionTypes';

const initialState = {
    text: '',
};

// TODO: Add action batching, so that the notification could disappear after a
// short amount of time.
// Currently it is displayed until a user clicks hide (not a priority task).
export default function(state = initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case HIDE_NOTIFICATION: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
}
