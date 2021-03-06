// Constants
const url = 'http://localhost:5000';

// Empty headers for upload.
const empty = new Headers([]);

// Default headers.
const regular = new Headers([
    ['Accept', 'application/json'],
    ['Content-Type', 'application/json'],
]);

export {url, empty, regular};
