export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
    SIGNIN: `${API_BASE_URL}/auth/signin`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    SEND_OTP: `${API_BASE_URL}/auth/otp/send`,
    VERIFY_OTP: `${API_BASE_URL}/auth/otp/verify`,
    VERIFY_EMAIL_SEND: `${API_BASE_URL}/auth/email/verify/send`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/email/verify`,
    VERIFY_PHONE_SEND: `${API_BASE_URL}/auth/phone/verify/send`,
    VERIFY_PHONE: `${API_BASE_URL}/auth/phone/verify`
};

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};