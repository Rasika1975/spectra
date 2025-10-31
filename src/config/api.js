const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
    SIGNIN: `${API_BASE_URL}/auth/signin`,
    SIGNUP: `${API_BASE_URL}/auth/signup`
};

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};