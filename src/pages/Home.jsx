import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import BlogCard from '../components/BlogCard';
import ClubCard from '../components/ClubCard';

const Home = () => {
  // Sample data - replace with API calls
  const featuredEvents = [
    {
      id: 1,
      title: 'Tech Summit 2025',
      description: 'Join us for the biggest tech event of the year',
      date: '2025-11-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      image: 'https://via.placeholder.com/400x250',
      type: 'Conference',
      isFree: true,
      registrations: 156
    },
    {
      id: 2,
      title: 'Coding Workshop',
      description: 'Learn modern web development techniques',
      date: '2025-11-20',
      time: '2:00 PM',
      location: 'Computer Lab',
      image: 'https://via.placeholder.com/400x250',
      type: 'Workshop',
      isFree: false,
      registrations: 45
    }
  ];

  const recentBlogs = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and start building modern web applications',
      category: 'Technology',
      date: '2025-10-25',
      image: 'https://via.placeholder.com/400x250',
      author: { name: 'John Doe', avatar: 'https://via.placeholder.com/40' }
    },
    {
      id: 2,
      title: 'The Future of AI',
      excerpt: 'Exploring the possibilities and challenges of artificial intelligence',
      category: 'AI/ML',
      date: '2025-10-23',
      image: 'https://via.placeholder.com/400x250',
      author: { name: 'Jane Smith', avatar: 'https://via.placeholder.com/40' }
    }
  ];

  const topClubs = [
    {
      id: 1,
      name: 'Coding Club',
      description: 'A community of passionate coders and developers',
      category: 'Technology',
      members: 250,
      events: 12,
      blogs: 34,
      verified: true,
      image: 'https://via.placeholder.com/400x250',
      head: { name: 'Alex Johnson', image: 'https://via.placeholder.com/40' }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Spectra Community</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Connect with clubs, join events, share knowledge, and build meaningful connections 
              in your college community.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                to="/signup" 
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Spectra?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Discover Events</h3>
              <p className="text-gray-600">Find and register for exciting events happening in your college</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Join Communities</h3>
              <p className="text-gray-600">Connect with like-minded people in various clubs and communities</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Share Knowledge</h3>
              <p className="text-gray-600">Read and write blogs to share your experiences and learnings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Blogs</h2>
            <Link to="/blogs" className="text-purple-600 hover:text-purple-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Clubs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Clubs</h2>
            <Link to="/about" className="text-purple-600 hover:text-purple-700 font-medium">
              Explore Clubs →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of students already part of the Spectra Community
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;