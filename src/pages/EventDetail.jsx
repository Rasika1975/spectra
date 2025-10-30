import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Mock data
  const event = {
    id: 1,
    title: 'Tech Summit 2025',
    description: 'Join us for the biggest tech event of the year featuring industry experts, hands-on workshops, and networking opportunities. This summit will cover the latest trends in technology, including AI, blockchain, cloud computing, and more.',
    fullDescription: `
      <h3>About the Event</h3>
      <p>Tech Summit 2025 is the premier technology conference bringing together students, professionals, and industry leaders to explore the future of technology.</p>
      
      <h3>What to Expect</h3>
      <ul>
        <li>Keynote speeches from industry leaders</li>
        <li>Hands-on workshops and tutorials</li>
        <li>Networking sessions with peers and professionals</li>
        <li>Career guidance and mentorship opportunities</li>
        <li>Exciting competitions and prizes</li>
      </ul>
      
      <h3>Schedule</h3>
      <ul>
        <li>9:00 AM - Registration & Breakfast</li>
        <li>10:00 AM - Opening Keynote</li>
        <li>11:30 AM - Workshop Session 1</li>
        <li>1:00 PM - Lunch Break</li>
        <li>2:00 PM - Workshop Session 2</li>
        <li>4:00 PM - Panel Discussion</li>
        <li>5:30 PM - Networking Session</li>
      </ul>
    `,
    date: '2025-11-15',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium, Building A',
    image: 'https://via.placeholder.com/1200x600',
    type: 'Conference',
    isFree: true,
    registrations: 156,
    capacity: 500,
    organizer: {
      name: 'Tech Club',
      image: 'https://via.placeholder.com/80',
      contact: 'techclub@college.edu'
    },
    speakers: [
      { name: 'Dr. John Smith', title: 'AI Researcher', image: 'https://via.placeholder.com/80' },
      { name: 'Jane Doe', title: 'Tech Entrepreneur', image: 'https://via.placeholder.com/80' }
    ]
  };

  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsRegistered(true);
    alert('Registration successful! Check your email for details.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="w-full h-96 bg-gray-300 overflow-hidden relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {event.isFree && (
          <span className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            FREE EVENT
          </span>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                  {event.type}
                </span>
                <span className="text-gray-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {event.registrations} / {event.capacity} registered
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
              <p className="text-gray-700 text-lg mb-8">{event.description}</p>

              {/* Details */}
              <div className="space-y-4 mb-8 pb-8 border-b">
                <div className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">Date</p>
                    <p>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Time</p>
                    <p>{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: event.fullDescription }}
              />

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-2xl font-bold mb-4">Featured Speakers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                          src={speaker.image} 
                          alt={speaker.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <p className="font-bold">{speaker.name}</p>
                          <p className="text-sm text-gray-600">{speaker.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Back Link */}
            <div className="mt-6">
              <Link 
                to="/events"
                className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Events
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Registration Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Register for this Event</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Seats Available</span>
                  <span>{event.capacity - event.registrations} / {event.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
              {isRegistered ? (
                <button
                  disabled
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-bold mb-4"
                >
                  ✓ Registered
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold mb-4 transition"
                >
                  Register Now
                </button>
              )}
              {!user && (
                <p className="text-sm text-gray-600 text-center">
                  You need to <Link to="/login" className="text-purple-600 hover:underline">login</Link> to register
                </p>
              )}
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Organized By</h3>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={event.organizer.image} 
                  alt={event.organizer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold">{event.organizer.name}</p>
                  <p className="text-sm text-gray-600">{event.organizer.contact}</p>
                </div>
              </div>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition">
                Contact Organizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;