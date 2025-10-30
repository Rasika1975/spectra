// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import VisionMission from "./pages/VisionMission";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboards
import DashboardMember from "./pages/DashboardMember";
import DashboardClub from "./pages/DashboardClub";
import DashboardAdmin from "./pages/DashboardAdmin";

// Utilities
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = () => {
  const location = useLocation();
  // The new LandingPage is self-contained, so we don't show the global Navbar/Footer on the root path.
  const showLayout = location.pathname !== '/';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* 🏠 Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home-legacy" element={<Home />} /> {/* Keeping old home for reference if needed */}
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/vision-mission" element={<VisionMission />} />

          {/* 🔐 Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 👥 Protected Routes */}
          <Route
            path="/member/dashboard"
            element={
              <ProtectedRoute allowedRole="member">
                <DashboardMember />
              </ProtectedRoute>
            }
          />
          <Route
            path="/club/dashboard"
            element={
              <ProtectedRoute allowedRole="club">
                <DashboardClub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showLayout && <Footer />}
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
