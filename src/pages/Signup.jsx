import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('member');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log('Attempting signup with:', { name, email, password, role });

    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        ...API_CONFIG,
        body: JSON.stringify({
          fullName: name,
          email,
          password,
          role
        }),
      });

      const data = await response.json();
      console.log('Signup response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      // Store user data
      const userData = {
        ...data.user,
        role: role // ensure role is included
      };
      console.log('Storing user data:', userData);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);

      // Navigate based on role
      let dashboardPath;
      switch (role) {
        case 'member':
          dashboardPath = '/member/dashboard';
          break;
        case 'club':
          dashboardPath = '/club/dashboard';
          break;
        case 'admin':
          dashboardPath = '/admin/dashboard';
          break;
        default:
          dashboardPath = '/';
      }
      
      console.log('Navigating to:', dashboardPath);
      navigate(dashboardPath, { replace: true });
    } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'NetworkError' || !window.navigator.onLine) {
        alert('Network error. Please check your internet connection and make sure the server is running.');
      } else {
        alert(error.message || 'An error occurred during signup');
      }
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
              <div className="flex items-center">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
                />
                <label htmlFor="admin" className="ml-2 block text-sm text-gray-300">
                  Admin
                </label>
              </div>
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
      </div>
    </div>
  );
};

export default Signup;