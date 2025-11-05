import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';
import otpService from '../services/otpService';
import OTPVerification from '../components/OTPVerification';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();

  const handleInitialLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting admin login with:', { email, password });
    
    try {
      const response = await fetch(API_ENDPOINTS.SIGNIN, {
        method: 'POST',
        ...API_CONFIG,
        body: JSON.stringify({
          email,
          password,
          role: 'admin',
          requireOTP: true
        }),
      });

      const data = await response.json();
      console.log('Initial login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

  // Store temporary login data and show OTP verification
  setLoginData(data);
  setShowOTPVerification(true);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
    }
  };

  const handleOTPVerified = async (verificationData) => {
    try {
      // After OTP verified, complete signin to get final token
      const response = await fetch(API_ENDPOINTS.SIGNIN, {
        method: 'POST',
        ...API_CONFIG,
        body: JSON.stringify({ email, password, role: 'admin', requireOTP: false })
      });

      const finalData = await response.json();
      if (!response.ok) throw new Error(finalData.message || 'Failed to complete admin login');

      const userData = { ...finalData.user, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', finalData.token);
      
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(error.message || 'Failed to verify OTP');
    }
  };

  if (showOTPVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-violet-900">
        <OTPVerification
          contactInfo={email}
          purpose="admin-login"
          method="email"
          onVerificationComplete={handleOTPVerified}
          onBack={() => setShowOTPVerification(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-violet-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <Spline scene="https://prod.spline.design/GY9dYJg6o7hSFA5E/scene.splinecode" />
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-md w-full space-y-8 bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 shadow-2xl shadow-red-500/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Secure access for administrators
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleInitialLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-red-500/30 placeholder-gray-500 text-white bg-red-950/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm transition-all"
                placeholder="Admin Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-violet-500/30 placeholder-gray-500 text-white bg-violet-950/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 sm:text-sm transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-violet-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
            >
              Sign in as Admin
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;