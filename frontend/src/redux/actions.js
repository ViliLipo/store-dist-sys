import {
    ADD_AUTHORIZATION,
    REMOVE_AUTHORIZATION,
    ADD_USERNAME,
    REMOVE_USERNAME,
    SET_FILES,
} from './actionTypes';

export const addAuthorization = () => ({
    type: ADD_AUTHORIZATION,
    payload: {
        isAuthorized: true,
    },
});

export const removeAuthorization = () => ({
    type: REMOVE_AUTHORIZATION,
    payload: {
        isAuthorized: false,
    },
});

export const addUsername = username => ({
    type: ADD_USERNAME,
    payload: {
        username,
    },
});

export const removeUsername = () => ({
    type: REMOVE_USERNAME,
    payload: {
        username: null,
    },
});

export const setFiles = files => ({
    type: SET_FILES,
    payload: {
        files,
    },
});
