import { ADD_AUTHORIZATION, REMOVE_AUTHORIZATION } from './actionTypes';

export const addAuthorization = () => ({
    type: ADD_AUTHORIZATION,
    payload: {
        isAuthorized: true
    }
});

export const removeAuthorization = () => ({
    type: REMOVE_AUTHORIZATION,
    payload: {
        isAuthorized: false
    }
});
