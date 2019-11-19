import {url, empty, regular} from './config';

// Generic function for making API requests
const request = (
    query,
    method = 'GET',
    data,
    headers = regular,
    stringify = true,
) => {
    if (method === 'GET') {
        return fetch(`${url}${query}`, {
            headers,
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                return Promise.reject({message: error.message});
            });
    }

    return fetch(`${url}${query}`, {
        method,
        headers,
        credentials: 'include',
        body: stringify ? JSON.stringify(data) : data,
    })
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.success) {
                return response;
            } else {
                return Promise.reject({message: response.error});
            }
        })
        .catch(error => {
            return new Error(error.message);
        });
};

const register = (email, password) => {
    return request('/api/user', 'POST', {email, password});
};

const login = (email, password) => {
    return request('/api/auth/login', 'POST', {email, password});
};

const logout = () => {
    return request('/api/auth/logout', 'POST');
};

const getFiles = user => {
    return request(`/api/${user}/files`);
};

const uploadFile = (user, folder, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request(
        `/api/${user}/files/${folder}`,
        'POST',
        formData,
        empty,
        false,
    );
};

const deleteFile = (user, id) => {
    return request(`/api/${user}/file/${id}`, 'DELETE', {user, id});
};

const renameFile = (user, id, name) => {
    return request(`/api/${user}/file/${id}`, 'PUT', {user, id, name});
};

const createFolder = (user, name, path) => {
    return request(`/api/${user}/folder/new`, 'POST', {name, path});
};

const getSharedFiles = user => {
    return request(`/api/${user}/shared`);
};

const shareFile = (user, filename, email) => {
    return request(`/api/${user}/sharing`, 'POST', {filename, email});
};

const removeShared = (user, filename, email) => {
    return request(`/api/${user}/sharing`, 'DELETE', {filename, email});
};

const api = {
    auth: {
        register,
        login,
        logout,
    },
    files: {
        getFiles,
        uploadFile,
        deleteFile,
        renameFile,
    },
    directories: {
        createFolder,
    },
    sharing: {
        getSharedFiles,
        shareFile,
        removeShared,
    },
};

export default api;
