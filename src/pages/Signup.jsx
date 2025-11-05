import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';
import otpService from '../services/otpService';
import OTPVerification from '../components/OTPVerification';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('member');
  const [city, setCity] = useState('');
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (role === 'admin') {
      toast.error("Admin signup is not allowed. Please contact the system administrator.");
      return;
    }

    if (!city && role === 'member') {
      toast.error("Please select your city");
      return;
    }

      try {
        const signupData = {
          fullName: name,
          email,
          password,
          role,
          verificationMethod,
          ...(role === 'member' && { city }),
          ...(phone && { phone })
        };

        setFormData(signupData);

        // Determine verification method
        const verifyWithPhone = phone && verificationMethod === 'phone';
        const contactInfo = verifyWithPhone ? phone : email;
        const method = verifyWithPhone ? 'phone' : 'email';

        // Create user account first
        const response = await fetch(API_ENDPOINTS.SIGNUP, {
          method: 'POST',
          ...API_CONFIG,
          body: JSON.stringify(signupData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to create account');
        }

        // Store temporary token for verification
        if (data.token) {
          localStorage.setItem('tempToken', data.token);
        }

        // Send verification code
        await otpService.requestOTP(contactInfo, 'signup', method);
        toast.success('Verification code sent successfully');
        
        setStep(2);
      } catch (error) {
        console.error('Error during signup:', error);
        if (error.message.includes('already exists')) {
          toast.error(error.message);
        } else {
          toast.error('Failed to create account. Please try again.');
        }
      }
    };

  const handleVerificationComplete = async (result) => {
    try {
      if (!result?.verified) {
        throw new Error('Verification failed');
      }

      // Get temporary token
      const tempToken = localStorage.getItem('tempToken');
      
      // Complete the verification process
      const verifyResponse = await fetch(`${API_ENDPOINTS.VERIFY_SIGNUP}`, {
        method: 'POST',
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${tempToken}`
        }
      });

      const verifyData = await verifyResponse.json();
      
      if (!verifyResponse.ok) {
        throw new Error(verifyData.message || 'Failed to complete verification');
      }

      // Store final user data and token
      const userData = {
        ...verifyData.user,
        role: formData.role
      };

      // Clear temp token and store final data
      localStorage.removeItem('tempToken');
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', verifyData.token);

      toast.success('Account created and verified successfully!');

      // Navigate to appropriate dashboard
      const dashboardPaths = {
        member: '/member/dashboard',
        club: '/club/dashboard'
      };
      
      navigate(dashboardPaths[formData.role] || '/', { replace: true });
    } catch (error) {
      console.error('Verification error:', error);
      if (error.name === 'NetworkError' || !window.navigator.onLine) {
        toast.error('Network error. Please check your internet connection.');
      } else {
        toast.error(error.message || 'Failed to verify account');
      }
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 transform scale-[1.8] lg:scale-[1.6]">
        <Spline scene="https://prod.spline.design/GY9dYJg6o7hSFA5E/scene.splinecode" />
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 max-w-md w-full space-y-8 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
        {step === 1 ? (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Create a new account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-400">
                Or{' '}
                <Link to="/login" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
                  sign in to your existing account
                </Link>
              </p>
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
                className="appearance-none relative block w-full px-4 py-3 border border-cyan-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm transition-all"
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
                className="appearance-none relative block w-full px-4 py-3 border border-cyan-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm transition-all"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="(\+\d{1,3}[- ]?)?\d{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-cyan-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm transition-all"
                placeholder="Phone number (optional)"
              />
            </div>
            {phone && (
              <div className="flex items-center justify-center gap-4">
                <label className="text-sm text-gray-400">Verification Method:</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="email"
                      checked={verificationMethod === 'email'}
                      onChange={(e) => setVerificationMethod(e.target.value)}
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-300">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="phone"
                      checked={verificationMethod === 'phone'}
                      onChange={(e) => setVerificationMethod(e.target.value)}
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-300">Phone</span>
                  </label>
                </div>
              </div>
            )}
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
                className="appearance-none relative block w-full px-4 py-3 border border-cyan-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm transition-all"
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
                className="appearance-none relative block w-full px-4 py-3 border border-cyan-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm transition-all"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex gap-4 justify-center mt-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="member"
                  name="role"
                  value="member"
                  checked={role === 'member'}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
                />
                <label htmlFor="member" className="ml-2 block text-sm text-gray-300">
                  Member
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="club"
                  name="role"
                  value="club"
                  checked={role === 'club'}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
                />
                <label htmlFor="club" className="ml-2 block text-sm text-gray-300">
                  Club
                </label>
              </div>
            </div>
            {role === 'member' && (
              <div>
                <label htmlFor="city" className="sr-only">City</label>
                <select
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-cyan-500/30 placeholder-gray-500 text-white bg-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm transition-all"
                >
                  <option value="">Select your city</option>
                  {cities.map(cityOption => (
                    <option key={cityOption} value={cityOption} className="bg-gray-800">
                      {cityOption}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="text-center text-sm text-gray-400">
              <Link to="/admin-signup" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
                Admin Signup
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-600 to-violet-600 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </>
    ) : (
      <OTPVerification
        contactInfo={verificationMethod === 'phone' ? phone : email}
        method={verificationMethod}
        purpose="signup"
        onVerificationComplete={handleVerificationComplete}
        onBack={() => setStep(1)}
      />
    )}
      </div>
    </div>
  );
};

export default Signup;