import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import {
  Menu,
  X,
  Users,
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
  ArrowRight as ArrowRightIcon,
} from "lucide-react";

// Reusable Club Card Component
const ClubCard = ({ club }) => (
  <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 text-left hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group">
    <img src={club.image} alt={club.name} className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-500" />
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{club.name}</h3>
      {club.verified && (
        <span className="bg-cyan-500/20 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-cyan-500/30">
          Verified
        </span>
      )}
    </div>
    <p className="text-gray-400 mb-4 text-sm h-10">{club.description}</p>
    <div className="flex justify-between text-gray-400 text-xs border-t border-cyan-500/20 pt-3">
      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {club.members}</span>
      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {club.events}</span>
      <span className="flex items-center gap-1"><Image className="w-3 h-3" /> {club.blogs}</span>
    </div>
    <Link
      to={`/clubs/${club.id}`}
      className="mt-4 block w-full text-center bg-gradient-to-r from-cyan-600/50 to-violet-600/50 text-white py-2 rounded-lg hover:from-cyan-600 hover:to-violet-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
    >
      View Details
    </Link>
  </div>
);

// 🌟 Main Landing Page Component
export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats animation
  const stats = [
    { value: 500, suffix: "+", label: "Active Members" },
    { value: 50, suffix: "+", label: "Clubs & Communities" },
    { value: 200, suffix: "+", label: "Events Hosted" },
    { value: 1000, suffix: "+", label: "Blog Posts" },
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
    { name: "Features", href: "#features" },
  ];

  const features = [
    {
      icon: Users,
      title: "Community Building",
      desc: "Create and join clubs, connect with like-minded individuals.",
      color: "from-cyan-500 to-violet-500",
    },
    {
      icon: Calendar,
      title: "Event Management",
      desc: "Host and participate in workshops and activities seamlessly.",
      color: "from-blue-500 to-violet-500",
    },
    {
      icon: Image,
      title: "Content Sharing",
      desc: "Share blogs and moments with your community.",
      color: "from-cyan-500 to-violet-500",
    },
    {
      icon: Trophy,
      title: "Exclusive Access",
      desc: "Get verified, access premium features, and showcase achievements.",
      color: "from-cyan-400 to-violet-600",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      desc: "Secure authentication and privacy-first approach.",
      color: "from-blue-600 to-violet-600",
    },
    {
      icon: Zap,
      title: "Fast & Modern",
      desc: "Lightning-fast performance and beautiful UI.",
      color: "from-cyan-500 to-violet-500",
    },
  ];

  const benefits = [
    "Verified college ID",
    "Exclusive community access",
    "Event hosting capabilities",
    "Premium content features",
  ];

  const clubs = [
    {
      id: 1,
      name: 'Coding Club',
      description: 'A community of passionate coders and developers learning and building together',
      category: 'Technology',
      members: 250,
      events: 12,
      blogs: 34,
      verified: true,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Photography Club',
      description: 'Capture moments, share stories, and explore the art of photography',
      category: 'Arts',
      members: 180,
      events: 8,
      blogs: 21,
      verified: true,
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Dance Society',
      description: 'Express yourself through movement and rhythm with fellow dance enthusiasts',
      category: 'Arts',
      members: 320,
      events: 15,
      blogs: 12,
      verified: false,
      image: 'https://images.unsplash.com/photo-1519046904884-53103f008bca?w=1200&auto=format&fit=crop&q=80',
    }
  ];

  // Contact form state and handler
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-cyan-500 to-violet-500 p-2 rounded-lg shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-500/80 transition-all duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Spectra
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href} // This should be updated to use Link for internal navigation
                  className="text-gray-300 hover:text-cyan-400 relative group transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <Link to="/signup" className="bg-gradient-to-r from-cyan-600 to-violet-600 px-6 py-2.5 rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
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
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/20">
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href} // This should be updated to use Link for internal navigation
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-cyan-400 text-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link to="/signup" className="w-full text-center block bg-gradient-to-r from-cyan-600 to-violet-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Join Now
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 transform scale-[1.8] lg:scale-[1.6]">
          <Spline scene="https://prod.spline.design/GY9dYJg6o7hSFA5E/scene.splinecode" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 max-w-6xl mx-auto">
          <div className="mb-6 inline-flex items-center space-x-2 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-full px-6 py-2 shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-gray-200">Welcome to the Future of Community</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight" >
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
              Spectra Community
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl text-center">
            Connect. Collaborate. Create. Join the most vibrant platform where students and innovators come together.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/signup" className="bg-gradient-to-r from-cyan-600 to-violet-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 transition-all">Get Started</Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto relative">
          {/* Section Border Accent */}
          <div className="absolute left-0 top-0 w-1 h-32 bg-gradient-to-b from-cyan-500 to-transparent"></div>
          
          {/* Stats */}
          <div id="stats" className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {stats.map((s, i) => (
              <div key={i} className="text-center bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {counts[i]}
                  {s.suffix}
                </div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured Clubs */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <div className="w-1 h-10 bg-gradient-to-b from-cyan-500 to-violet-500"></div>
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Featured Clubs</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative">
        <div className="absolute left-0 top-24 w-1 h-32 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        
        <h2 className="text-5xl font-black text-center mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Powerful Features
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Discover what makes Spectra Community unique</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500"
            >
              <div
                className={`bg-gradient-to-br ${f.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all`}
              >
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section id="signup" className="py-24 px-6 bg-gradient-to-br from-cyan-600/20 via-violet-600/20 to-cyan-800/20 backdrop-blur-xl text-center relative overflow-hidden border-y border-cyan-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-black mb-6 text-white">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Be part of something bigger. Connect with thousands of students and
            communities today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-cyan-500/30 px-4 py-3 rounded-lg hover:border-cyan-500/50 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400" /> <span className="text-gray-200">{b}</span>
              </div>
            ))}
          </div>
          <Link to="/signup" className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-violet-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all" >
            Start Your Journey <ArrowRightIcon className="inline ml-2" />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black border-t border-cyan-500/20 py-16 px-6 text-gray-400 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-cyan-500 to-violet-500 p-2 rounded-lg shadow-lg shadow-cyan-500/50">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Spectra
              </span>
            </div>
            <p className="text-sm mb-6">
              The ultimate platform for student communities. Connect, collaborate, and create.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-black/40 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-black/40 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-black/40 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-black/40 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-violet-500"></div>
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#features" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Features</a></li>
              <li><Link to="/signup" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Join Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-violet-500"></div>
              Legal
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Cookie Policy</Link></li>
              <li><Link to="/community-guidelines" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Community Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-violet-500"></div>
              Newsletter
            </h4>
            <p className="text-sm mb-4">
              Stay updated with our latest news and features.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-r-0 border-cyan-500/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-black/60 text-white placeholder-gray-500 backdrop-blur-xl"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-600 to-violet-600 px-4 py-3 rounded-r-lg text-white font-bold hover:from-cyan-500 hover:to-violet-500 transition-all"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-cyan-500/20 mt-12 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Spectra Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}