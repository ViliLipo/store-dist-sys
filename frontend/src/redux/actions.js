import {
    ADD_AUTHORIZATION,
    REMOVE_AUTHORIZATION,
    ADD_USERNAME,
    REMOVE_USERNAME,
    SET_FILES,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
} from './actionTypes';

// This file should be split into separate files if it gets big enough.
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

export const showNotification = notification => ({
    type: SHOW_NOTIFICATION,
    payload: {
        text: notification,
    },
});

export const hideNotification = () => ({
    type: HIDE_NOTIFICATION,
    payload: {
        text: '',
    },
});
