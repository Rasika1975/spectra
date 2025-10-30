import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Image,
  Trophy,
  Shield,
  Zap,
} from "lucide-react";

// 🌟 Main Landing Page Component
export default function LandingPage() {
  // Navbar scroll + mobile menu logic
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats animation
  const stats = [
    { value: 5000, suffix: "+", label: "Active Members" },
    { value: 150, suffix: "+", label: "Communities" },
    { value: 500, suffix: "+", label: "Events Hosted" },
    { value: 98, suffix: "%", label: "Satisfaction" },
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const timers = stats.map((stat, i) => {
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const val = Math.floor(stat.value * progress);
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = val;
          return newCounts;
        });
        if (step >= steps) clearInterval(timer);
      }, stepDuration);
      return timer;
    });
    return () => timers.forEach(clearInterval);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Events", href: "/events" },
  ];

  const features = [
    {
      icon: Users,
      title: "Community Building",
      desc: "Create and join clubs, connect with like-minded individuals.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Calendar,
      title: "Event Management",
      desc: "Host and participate in workshops and activities seamlessly.",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      icon: Image,
      title: "Content Sharing",
      desc: "Share blogs and moments with your community.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Trophy,
      title: "Exclusive Access",
      desc: "Get verified, access premium features, and showcase achievements.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      desc: "Secure authentication and privacy-first approach.",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Zap,
      title: "Fast & Modern",
      desc: "Lightning-fast performance and beautiful UI.",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  const benefits = [
    "Verified college ID",
    "Exclusive community access",
    "Event hosting capabilities",
    "Premium content features",
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔹 Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Spectra
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  to={l.href}
                  className="text-gray-300 hover:text-white relative group"
                >
                  {l.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Link to="/signup" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 rounded-full font-semibold hover:scale-105 transition-all duration-300">
                Join Now
              </Link>
            </div>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  to={l.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white text-lg"
                >
                  {l.name}
                </Link>
              ))}
              <Link to="/signup" className="w-full text-center block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 rounded-full font-semibold">
                Join Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 🔹 Hero */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <spline-viewer url="https://prod.spline.design/pGTmnyODrLdIi9om/scene.splinecode"></spline-viewer>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 max-w-6xl mx-auto">
            <div className="mb-6 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 animate-float">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-gray-200">Welcome to the Future of Community</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
                    Spectra Community
                </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl">
                Connect. Collaborate. Create. Join the most vibrant platform where students and innovators come together.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
                <Link to="/signup" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition">Get Started</Link>
                <Link to="/about" className="bg-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition">Learn More</Link>
            </div>
        </div>
      </section>

      {/* 🔹 Features */}
      <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <h2 className="text-5xl font-black text-center mb-16">
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Powerful Features
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500"
            >
              <div
                className={`bg-gradient-to-br ${f.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
              >
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Stats */}
      <section className="py-20 px-6 bg-black">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-black mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {counts[i]}
                {s.suffix}
              </div>
              <div className="text-gray-400 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 text-center">
        <h2 className="text-5xl font-black mb-6 text-white">
          Ready to Join the Revolution?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
          Be part of something bigger. Connect with thousands of students and
          communities today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-lg border border-white/20"
            >
              <CheckCircle2 className="w-5 h-5" /> <span>{b}</span>
            </div>
          ))}
        </div>
        <Link to="/signup" className="bg-white text-violet-700 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all">
          Start Your Journey <ArrowRight className="inline ml-2" />
        </Link>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6 text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Spectra
              </span>
            </div>
            <p>
              Building the future of student communities with innovation and
              collaboration.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul>
              {["About", "Blogs", "Events", "Contact"].map((l) => (
                <li key={l}>
                  <Link to={`/${l.toLowerCase()}`} className="hover:text-violet-400">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-violet-400" /> contact@spectra.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-violet-400" /> +91 1234567890
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-violet-400" /> Innovation Hub,
                Tech Campus
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a href="#" key={i} className="hover:text-violet-400 cursor-pointer">
                  <Icon
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm">
          © {currentYear} Spectra Community. Made with ❤️ for students.
        </div>
      </footer>
    </div>
  );
}