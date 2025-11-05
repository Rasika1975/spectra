import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';
import otpService from '../services/otpService';
import OTPVerification from '../components/OTPVerification';
import { toast } from 'react-hot-toast';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      const signupData = {
        fullName: name,
        email,
        password,
        role: 'admin'
      };

      setFormData(signupData);

      // Request OTP (email)
      await otpService.requestOTP(email, 'signup', 'email');

      setStep(2);
    } catch (error) {
      console.error('Admin signup error:', error);
      toast.error(error.message || 'Failed to send verification code');
    }
  };

  const handleVerificationComplete = async (result) => {
    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        ...API_CONFIG,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to sign up');

      localStorage.setItem('user', JSON.stringify({ ...data.user, role: 'admin' }));
      localStorage.setItem('token', data.token);

      toast.success('Admin account created');
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      console.error('Admin signup finalize error:', error);
      toast.error(error.message || 'Failed to complete signup');
      setStep(1);
    }
  };

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
        {step === 1 ? (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create Admin Account</h2>
              <p className="mt-2 text-center text-sm text-gray-400">Admin accounts are for authorized personnel only</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 border border-red-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm transition-all"
                    placeholder="Full Name"
                  />
                </div>

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
                    className="appearance-none relative block w-full px-4 py-3 border border-red-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm transition-all"
                    placeholder="Admin Email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 border border-red-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm transition-all"
                    placeholder="Password"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 border border-red-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm transition-all"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-violet-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
                >
                  Create Admin Account
                </button>
              </div>
            </form>
          </>
        ) : (
          <OTPVerification
            contactInfo={email}
            method="email"
            purpose="signup"
            onVerificationComplete={handleVerificationComplete}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminSignup;
