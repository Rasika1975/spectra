import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const BlogDetail = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;
		setLoading(true);
		fetch(`${API_BASE_URL}/blogs/${id}`)
			.then(res => res.json())
			.then(data => {
				// Controller returns blog object (not wrapped with success boolean) in this repo
				if (data && data._id) {
					setBlog(data);
				} else if (data && data.success && data.data) {
					setBlog(data.data);
				} else {
					setError('Blog not found');
				}
			})
			.catch(err => setError(err.message || 'Failed to load blog'))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div className="p-8">Loading blog...</div>;
	if (error) return <div className="p-8 text-red-400">{error}</div>;
	if (!blog) return <div className="p-8">No blog found</div>;

	const imageSrc = blog.image?.url || blog.image || '';

	return (
		<div className="max-w-4xl mx-auto p-6">
			<Link to="/" className="text-sm text-blue-400 underline mb-4 inline-block">← Back</Link>
			<h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
			<div className="flex items-center gap-3 mb-6">
				<img src={blog.author?.avatar || blog.author?.image || 'https://i.pravatar.cc/150'} alt={blog.author?.fullName || blog.author?.name || 'Author'} className="w-12 h-12 rounded-full" />
				<div>
					<div className="text-sm font-semibold">{blog.author?.fullName || blog.author?.name || 'Unknown'}</div>
					<div className="text-xs text-gray-400">{new Date(blog.createdAt || blog.date || Date.now()).toLocaleString()}</div>
				</div>
			</div>

			{imageSrc && <img src={imageSrc} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-6" />}

			<div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt || '' }} />
		</div>
	);
};

export default BlogDetail;

