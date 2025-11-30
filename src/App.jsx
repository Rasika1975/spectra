import React from "react";
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public Pages
import LandingPage from "./pages/LandingPage";
import BlogDetail from './pages/BlogDetail';
import Clubs from "./pages/Clubs";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";

// Dashboards
import DashboardMember from "./pages/DashboardMember";
import DashboardClub from "./pages/DashboardClub";
import DashboardAdmin from "./pages/DashboardAdmin";

// Utilities
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = () => {
  const location = useLocation();
  const noLayoutPaths = ['/', '/login', '/signup'];

  const showLayout =
    !noLayoutPaths.includes(location.pathname) &&
    !location.pathname.startsWith('/member/dashboard') &&
    !location.pathname.startsWith('/club/dashboard') &&
    !location.pathname.startsWith('/admin/dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" />
      <main className="flex-grow">
        <Routes>

          {/* ✅ Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/clubs" element={<Clubs />} />

          {/* ✅ Deleted → <Route path="/clubs/:id" element={<ClubDetail />} /> */}

          {/* ✅ If someone still opens /clubs/:id → send blank 404 */}
          <Route path="/clubs/:id" element={<div></div>} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route
            path="/member/dashboard/*"
            element={
              <ProtectedRoute allowedRole="member">
                <DashboardMember />
              </ProtectedRoute>
            }
          />

          <Route
            path="/club/dashboard/*"
            element={
              <ProtectedRoute allowedRole="club">
                <DashboardClub />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
