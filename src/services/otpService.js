import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const otpService = {
  // Request OTP for signup/login via email or phone
  requestOTP: async (contactInfo, purpose, method = 'email') => {
    try {
      const payload = method === 'email' 
        ? { email: contactInfo, purpose }
        : { phone: contactInfo, purpose };

      const response = await axios.post(`${API_BASE_URL}/auth/otp/send`, {
        ...payload,
        method // 'email' or 'phone'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send OTP' };
    }
  },

  // Verify OTP (supports email or phone via `method`)
  verifyOTP: async (contactInfo, otp, purpose, method = 'email') => {
    try {
      const payload = method === 'email'
        ? { email: contactInfo, otp, purpose, method }
        : { phone: contactInfo, otp, purpose, method };

      console.log('Verifying OTP with payload:', payload);
      const response = await axios.post(`${API_BASE_URL}/auth/otp/verify`, payload);
      console.log('OTP verification response:', response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify OTP' };
    }
  },

  // Request OTP for email verification
  requestEmailVerificationOTP: async (token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/email/verify/send`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send verification OTP' };
    }
  },

  // Verify email with OTP
  verifyEmailWithOTP: async (otp, token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/email/verify`,
        { otp },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify email' };
    }
  },

  // Request OTP for phone verification
  requestPhoneVerificationOTP: async (phone, token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/phone/verify/send`,
        { phone },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send phone verification OTP' };
    }
  },

  // Verify phone with OTP
  verifyPhoneWithOTP: async (phone, otp, token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/phone/verify`,
        { phone, otp },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify phone' };
    }
  }
};

export default otpService;