import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get user from localStorage (in real app, use context/state management)
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'member':
        return '/dashboard/member';
      case 'club':
        return '/dashboard/club';
      case 'admin':
        return '/dashboard/admin';
      default:
        return null;
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl">Spectra Community</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-purple-200 transition">Home</Link>
            <Link to="/about" className="hover:text-purple-200 transition">About</Link>
            <Link to="/blogs" className="hover:text-purple-200 transition">Blogs</Link>
            <Link to="/events" className="hover:text-purple-200 transition">Events</Link>
            <Link to="/contact" className="hover:text-purple-200 transition">Contact</Link>
            
            {user ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-purple-200 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:bg-purple-700 px-3 rounded" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2 hover:bg-purple-700 px-3 rounded" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/blogs" className="block py-2 hover:bg-purple-700 px-3 rounded" onClick={() => setIsOpen(false)}>Blogs</Link>
            <Link to="/events" className="block py-2 hover:bg-purple-700 px-3 rounded" onClick={() => setIsOpen(false)}>Events</Link>
            <Link to="/contact" className="block py-2 hover:bg-purple-700 px-3 rounded" onClick={() => setIsOpen(false)}>Contact</Link>
            
            {user ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="block py-2 bg-white text-purple-600 px-3 rounded font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left py-2 bg-red-500 px-3 rounded font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:bg-purple-700 px-3 rounded" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="block py-2 bg-white text-purple-600 px-3 rounded font-medium" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;