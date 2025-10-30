import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
            {blog.category}
          </span>
          <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{blog.excerpt}</p>
        <div className="flex items-center gap-3 mt-4">
          <img src={blog.author.avatar} alt={blog.author.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-sm">{blog.author.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;