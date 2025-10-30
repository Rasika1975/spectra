import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();

  // Mock data - replace with API call
  const blog = {
    id: 1,
    title: 'Getting Started with React',
    content: `
      <p>React has revolutionized the way we build user interfaces. In this comprehensive guide, we'll explore the fundamentals of React and how you can start building modern web applications.</p>
      
      <h2>What is React?</h2>
      <p>React is a JavaScript library for building user interfaces, particularly single-page applications. It was developed by Facebook and has become one of the most popular frontend libraries in the web development ecosystem.</p>
      
      <h2>Core Concepts</h2>
      <p>To get started with React, you need to understand these core concepts:</p>
      <ul>
        <li><strong>Components:</strong> Reusable pieces of UI</li>
        <li><strong>JSX:</strong> A syntax extension that looks like HTML</li>
        <li><strong>Props:</strong> Data passed to components</li>
        <li><strong>State:</strong> Data managed within a component</li>
        <li><strong>Hooks:</strong> Functions that let you use state and other React features</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>The easiest way to start a new React project is using Create React App or Vite. Here's how you can create a new project:</p>
      <pre><code>npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev</code></pre>
      
      <h2>Conclusion</h2>
      <p>React is a powerful tool for building modern web applications. With its component-based architecture and rich ecosystem, it's an excellent choice for developers of all skill levels.</p>
    `,
    category: 'Technology',
    date: '2025-10-25',
    image: 'https://via.placeholder.com/1200x600',
    author: {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/80',
      bio: 'Full-stack developer passionate about React and modern web technologies'
    },
    readTime: '8 min read'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="w-full h-96 bg-gray-300 overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
            {blog.category}
          </span>
          <span className="text-gray-500">{blog.readTime}</span>
          <span className="text-gray-500">
            {new Date(blog.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{blog.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b">
          <img 
            src={blog.author.avatar} 
            alt={blog.author.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="font-bold text-lg">{blog.author.name}</p>
            <p className="text-gray-600 text-sm">{blog.author.bio}</p>
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t">
          <Link 
            to="/blogs"
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;