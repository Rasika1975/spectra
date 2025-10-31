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

// Reusable Blog Card Component
const BlogCard = ({ blog }) => (
  <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 text-left hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group">
    <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-500" />
    <div className="flex items-center gap-2 mb-2">
      <span className="bg-cyan-500/20 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-cyan-500/30">
        {blog.category}
      </span>
      <span className="text-gray-400 text-xs">
        {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
    <p className="text-gray-400 mb-4 text-sm h-12 overflow-hidden">{blog.excerpt}</p>
    <div className="flex items-center gap-3 border-t border-cyan-500/20 pt-3">
      <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full border border-cyan-500/30" />
      <span className="text-gray-300 text-sm">{blog.author.name}</span>
    </div>
    <Link
      to={`/blogs/${blog.id}`}
      className="mt-4 block w-full text-center bg-gradient-to-r from-cyan-600/50 to-violet-600/50 text-white py-2 rounded-lg hover:from-cyan-600 hover:to-violet-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
    >
      Read More
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
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Blogs", href: "#blogs" },
    { name: "Contact", href: "#contact-section" },
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

  // Blog data and filtering logic
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Technology', 'AI/ML', 'Design', 'Business', 'Lifestyle'];

  const blogs = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and start building modern web applications with components, hooks, and state management',
      category: 'Technology',
      date: '2025-10-25',
      image: 'https://via.placeholder.com/400x250',
      author: { name: 'John Doe', avatar: 'https://via.placeholder.com/40' }
    },
    {
      id: 2,
      title: 'The Future of AI',
      excerpt: 'Exploring the possibilities and challenges of artificial intelligence in the modern world',
      category: 'AI/ML',
      date: '2025-10-23',
      image: 'https://via.placeholder.com/400x250',
      author: { name: 'Jane Smith', avatar: 'https://via.placeholder.com/40' }
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      excerpt: 'Master the fundamental principles of creating beautiful and user-friendly interfaces',
      category: 'Design',
      date: '2025-10-20',
      image: 'https://via.placeholder.com/400x250',
      author: { name: 'Mike Johnson', avatar: 'https://via.placeholder.com/40' }
    },
    {
      id: 4,
      title: 'Entrepreneurship 101',
      excerpt: 'Essential tips for aspiring entrepreneurs looking to start their first business',
      category: 'Business',
      date: '2025-10-18',
      image: 'https://via.placeholder.com/400x250',
      author: { name: 'Sarah Williams', avatar: 'https://via.placeholder.com/40' }
    }
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      image: 'https://via.placeholder.com/400x250',
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
      image: 'https://via.placeholder.com/400x250',
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
      image: 'https://via.placeholder.com/400x250',
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
                  href={link.href}
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
                  href={link.href}
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
            <a href="#about" className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-black/60 hover:border-cyan-500/50 transition-all">Learn More</a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto relative">
          {/* Section Border Accent */}
          <div className="absolute left-0 top-0 w-1 h-32 bg-gradient-to-b from-cyan-500 to-transparent"></div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                About Spectra Community
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Building bridges between students, clubs, and opportunities.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto text-center mb-20 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center justify-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-violet-500"></div>
              Our Story
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Spectra Community was founded with a vision to create a unified platform 
              where students can discover opportunities, connect with like-minded peers, 
              and actively participate in college life beyond academics.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We believe that every student deserves easy access to events, clubs, and 
              communities that align with their interests. Our platform empowers students 
              to explore, engage, and grow while helping clubs and communities manage their 
              activities efficiently.
            </p>
          </div>
          
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
      
      {/* Blogs Section */}
      <section id="blogs" className="py-24 px-6 bg-black relative">
        <div className="absolute left-0 top-24 w-1 h-32 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Blogs & Articles
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 text-center">
            Discover insights, tutorials, and stories from our community
          </p>

          {/* Filters */}
          <div className="py-8 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl mb-12 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-black/60 text-white placeholder-gray-500 backdrop-blur-xl transition-all"
                  />
                </div>
                {/* Categories */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-cyan-600 to-violet-600 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-black/60 border border-cyan-500/30 text-gray-300 hover:bg-black/80 hover:border-cyan-500/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl">
              <p className="text-gray-400 text-lg">No blogs found matching your criteria</p>
            </div>
          )}
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
      
      {/* Contact Section */}
      <section id="contact-section" className="py-24 px-6 bg-black relative">
        <div className="absolute left-0 top-24 w-1 h-32 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 text-center">
            We'd love to hear from you
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-violet-500"></div>
                Send us a Message
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-black/60 text-white placeholder-gray-500 backdrop-blur-xl transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-black/60 text-white placeholder-gray-500 backdrop-blur-xl transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-black/60 text-white placeholder-gray-500 backdrop-blur-xl transition-all"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-black/60 text-white placeholder-gray-500 backdrop-blur-xl transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/40 transition-all text-white py-3 rounded-lg font-bold"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-violet-500"></div>
                Get in Touch
              </h3>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-start gap-4 p-4 bg-black/40 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
                  <Mail className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white mb-1">Email</p>
                    <p className="text-sm">info@spectracommunity.com</p>
                    <p className="text-sm">support@spectracommunity.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-black/40 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
                  <Phone className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white mb-1">Phone</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                    <p className="text-sm">+1 (555) 987-6543</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-black/40 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
                  <MapPin className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white mb-1">Address</p>
                    <p className="text-sm">123 University Avenue, College Town, ST 12345</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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
              <li><a href="#about" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">About Us</a></li>
              <li><a href="#features" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Features</a></li>
              <li><a href="#blogs" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Blogs</a></li>
              <li><a href="#contact-section" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">Contact</a></li>
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