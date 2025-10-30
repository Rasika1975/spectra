import { Link } from 'react-router-dom';

const ClubCard = ({ club }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={club.image} alt={club.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
          {club.verified && (
            <div className="flex items-center gap-1 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-xs font-semibold">Verified</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4 h-10">{club.description}</p>
        <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
          <span className="font-medium">{club.members} Members</span>
          <span className="font-medium">{club.events} Events</span>
          <span className="font-medium">{club.blogs} Blogs</span>
        </div>
        <div className="mt-4">
            <Link to={`/about`} className="w-full text-center block bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                View Details
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;