import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password, role });
    
    try {
      const response = await fetch(API_ENDPOINTS.SIGNIN, {
        method: 'POST',
        ...API_CONFIG,
        body: JSON.stringify({
          email,
          password,
          role
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
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
      navigate(dashboardPath);
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'NetworkError' || !window.navigator.onLine) {
        alert('Network error. Please check your internet connection and make sure the server is running.');
      } else {
        alert(error.message || 'An error occurred during login');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-30">
        <Spline scene="https://prod.spline.design/GY9dYJg6o7hSFA5E/scene.splinecode" />
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-md w-full space-y-8 bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 shadow-2xl shadow-blue-500/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link to="/signup" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                className="appearance-none relative block w-full px-4 py-3 border border-blue-500/30 placeholder-gray-500 text-white bg-blue-950/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                placeholder="Email address"
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
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="member"
                  name="role"
                  value="member"
                  checked={role === 'member'}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
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
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
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
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;