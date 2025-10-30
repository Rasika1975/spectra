import { useState } from 'react';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Blogs & Articles</h1>
          <p className="text-xl">Discover insights, tutorials, and stories from our community</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default Blogs;