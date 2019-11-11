import { options, url } from './config';

// Generic function for making API requests
const request = (query, method = 'GET', data) => {
    if (method === 'GET') {
        return fetch(`${url}${query}`, {
            ...options
        }).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.json());
            })
        })
    }

    return fetch(`${url}${query}`, {
        method,
        body: JSON.stringify(data),
        ...options,
    }).then(response => {
        return new Promise((resolve, reject) => {
            resolve(response.json());
        });
    });
}

const login = (email, password) => {
    return request('/api/auth/login', 'POST', { email, password });
}

const logout = () => {
    return request('/api/auth/logout');
}

const getFiles = (user) => {
    return request(`/api/${user}/files`);
}

const getFile = (user, file) => {
    return request(`/api/${user}/files/${file}`);
}

const uploadFile = (user, file) => {
    return request(`/api/${user}/files`, 'POST', file);
}

const deleteFile = (user, file) => {
    return request(`/api/${user}/files`, 'DELETE', file);
}

const getSharedFiles = (user) => {
    return request(`/api/${user}/shared`);
}

const shareFile = (user, filename, email) => {
    return request(`/api/${user}/sharing`, 'POST', { filename, email });
}

const removeShared = (user, filename, email) => {
    return request(`/api/${user}/sharing`, 'DELETE', { filename, email });
}

const api = {
    auth: {
        login,
        logout
    },
    files: {
        getFiles,
        getFile,
        uploadFile,
        deleteFile
    },
    sharing: {
        getSharedFiles,
        shareFile,
        removeShared
    }
};

export default api;
