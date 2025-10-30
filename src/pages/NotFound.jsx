import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-purple-600">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;