import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    // In a real app, you'd make an API call here
    if (email === 'member@test.com') {
      const user = { email, role: 'member' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'fake-member-token');
      navigate('/member/dashboard');
    } else if (email === 'club@test.com') {
      const user = { email, role: 'club' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'fake-club-token');
      navigate('/club/dashboard');
    } else if (email === 'admin@test.com') {
      const user = { email, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'fake-admin-token');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. Use member@test.com, club@test.com, or admin@test.com for testing.');
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