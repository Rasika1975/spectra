import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  ArrowRight as ArrowRightIcon, // Renamed to avoid conflict
} from "lucide-react";

// Reusable Club Card Component
const ClubCard = ({ club }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left hover:-translate-y-2 transition-all duration-500">
    <img src={club.image} alt={club.name} className="w-full h-40 object-cover rounded-lg mb-4" />
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-white">{club.name}</h3>
      {club.verified && (
        <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
          Verified
        </span>
      )}
    </div>
    <p className="text-gray-400 mb-4 text-sm h-10">{club.description}</p>
    <div className="flex justify-between text-gray-400 text-xs border-t border-white/10 pt-3">
      <span>{club.members} Members</span>
      <span>{club.events} Events</span>
      <span>{club.blogs} Blogs</span>
    </div>
    <Link
      to={`/clubs/${club.id}`}
      className="mt-4 block w-full text-center bg-violet-600/50 text-white py-2 rounded-lg hover:bg-violet-600 transition-colors"
    >
      View Details
    </Link>
  </div>
);

// Reusable Blog Card Component
const BlogCard = ({ blog }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left hover:-translate-y-2 transition-all duration-500">
    <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-lg mb-4" />
    <div className="flex items-center gap-2 mb-2">
      <span className="bg-violet-500/20 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full">
        {blog.category}
      </span>
      <span className="text-gray-400 text-xs">
        {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
    <p className="text-gray-400 mb-4 text-sm h-12 overflow-hidden">{blog.excerpt}</p>
    <div className="flex items-center gap-3 border-t border-white/10 pt-3">
      <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full" />
      <span className="text-gray-300 text-sm">{blog.author.name}</span>
    </div>
    <Link
      to={`/blogs/${blog.id}`} // Assuming you have a BlogDetail page
      className="mt-4 block w-full text-center bg-violet-600/50 text-white py-2 rounded-lg hover:bg-violet-600 transition-colors"
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
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
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
                <a
                  key={l.name}
                  href={l.href}
                  className="text-gray-300 hover:text-white relative group"
                >
                  {l.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
                </a>
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
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white text-lg"
                >
                  {l.name}
                </a>
              ))}
              <Link to="/signup" className="w-full text-center block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 rounded-full font-semibold">
                Join Now
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Hero */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.77/build/spline-viewer.js" async></script>
        <div className="absolute inset-0 z-0">
          <spline-viewer url="https://prod.spline.design/pGTmnyODrLdIi9om/scene.splinecode"></spline-viewer>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 max-w-6xl mx-auto">
          <div className="mb-6 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-gray-200">Welcome to the Future of Community</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight" >
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              Spectra Community
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl text-center">
            Connect. Collaborate. Create. Join the most vibrant platform where students and innovators come together.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/signup" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition">Get Started</Link>
            <a href="#about" className="bg-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition">Learn More</a>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                About Spectra Community
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Building bridges between students, clubs, and opportunities.
            </p>
          </div>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h3 className="text-3xl font-bold mb-6 text-white">Our Story</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Spectra Community was founded with a vision to create a unified platform 
              where students can discover opportunities, connect with like-minded peers, 
              and actively participate in college life beyond academics.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              We believe that every student deserves easy access to events, clubs, and 
              communities that align with their interests. Our platform empowers students 
              to explore, engage, and grow while helping clubs and communities manage their 
              activities efficiently.
            </p>
          </div>
          {/* Stats */}
          <div id="stats" className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
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
          {/* Featured Clubs */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white">Featured Clubs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
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
      {/* Blogs Section */}
      <section id="blogs" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Blogs & Articles
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 text-center">
            Discover insights, tutorials, and stories from our community
          </p>

          {/* Filters */}
          <div className="py-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
                  />
                </div>
                {/* Categories */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        selectedCategory === category
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No blogs found matching your criteria</p>
            </div>
          )}
        </div>
      </section>
      {/* CTA */}
      <section id="signup" className="py-24 px-6 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 text-center">
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
        <Link to="/signup" className="inline-flex items-center bg-white text-violet-700 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all" >
          Start Your Journey <ArrowRightIcon className="inline ml-2" />
        </Link>
      </section>
      {/* Footer */}
      <section id="contact-section" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 text-center">
            We'd love to hear from you
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
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
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
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
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
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
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
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
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition text-white py-3 rounded-lg font-bold"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* Contact Info */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-violet-400" />
                  <div>
                    <p>info@spectracommunity.com</p>
                    <p>support@spectracommunity.com</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-violet-400" />
                  <div>
                    <p>+1 (555) 123-4567</p>
                    <p>+1 (555) 987-6543</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-violet-400" />
                  <p>123 University Avenue, College Town, ST 12345</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
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
              {["About", "Features", "Blogs", "Contact"].map((l) => {
                const href = l === "Blogs" ? "#blogs" : l === "Contact" ? "#contact-section" : `#${l.toLowerCase()}`;
                return (
                  <li key={l}>
                    <a href={href} className="hover:text-violet-400">{l}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-violet-400" /> <span>contact@spectra.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-violet-400" /> <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>Innovation Hub, Tech Campus, College Town</span>
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
