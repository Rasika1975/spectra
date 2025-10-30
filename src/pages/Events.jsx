import { useState } from 'react';
import EventCard from '../components/EventCard';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const eventTypes = ['All', 'Conference', 'Workshop', 'Seminar', 'Competition', 'Social'];

  const events = [
    {
      id: 1,
      title: 'Tech Summit 2025',
      description: 'Join us for the biggest tech event of the year featuring industry experts',
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
      description: 'Learn modern web development techniques from scratch',
      date: '2025-11-20',
      time: '2:00 PM',
      location: 'Computer Lab',
      image: 'https://via.placeholder.com/400x250',
      type: 'Workshop',
      isFree: false,
      registrations: 45
    },
    {
      id: 3,
      title: 'AI/ML Seminar',
      description: 'Exploring the future of artificial intelligence and machine learning',
      date: '2025-11-25',
      time: '11:00 AM',
      location: 'Lecture Hall 3',
      image: 'https://via.placeholder.com/400x250',
      type: 'Seminar',
      isFree: true,
      registrations: 89
    },
    {
      id: 4,
      title: 'Hackathon 2025',
      description: '48-hour coding competition with amazing prizes',
      date: '2025-12-01',
      time: '9:00 AM',
      location: 'Innovation Center',
      image: 'https://via.placeholder.com/400x250',
      type: 'Competition',
      isFree: true,
      registrations: 234
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl">Discover and join exciting events happening in your community</p>
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Event Types */}
            <div className="flex gap-2 flex-wrap justify-center">
              {eventTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedType === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No events found matching your criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;