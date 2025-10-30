import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium">
            {event.type}
          </span>
          {event.isFree && (
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
              FREE
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{event.description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;