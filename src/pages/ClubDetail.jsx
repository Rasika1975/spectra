import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, Calendar, Trophy, Mail, Phone, ExternalLink, Share2 } from 'lucide-react';
import EventCard from '../components/EventCard';

const ClubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [club, setClub] = useState(null);
  const [error, setError] = useState(null);
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulated API call
    const fetchClub = async () => {
      try {
        setIsLoading(true);
        // Simulated club data
        const clubData = {
          id: 1,
          name: 'Tech Innovators',
          description: 'A community of tech enthusiasts and innovators',
          longDescription: 'Tech Innovators is a vibrant community dedicated to exploring and advancing technology. We organize workshops, hackathons, and networking events to foster innovation and collaboration.',
          category: 'Technology',
          city: 'Mumbai',
          members: 150,
          events: 12,
          image: 'https://via.placeholder.com/800x400',
          head: {
            name: 'John Doe',
            email: 'john@techinnovators.com',
            phone: '+91 9876543210'
          },
          upcomingEvents: [
            {
              id: 1,
              title: 'Web Development Workshop',
              description: 'Learn modern web development techniques',
              date: '2025-11-15',
              time: '10:00 AM',
              location: 'Main Auditorium',
              image: 'https://via.placeholder.com/400x250'
            },
            // Add more events
          ],
          achievements: [
            'Best Tech Club Award 2025',
            'Innovation Excellence',
            'Community Impact Award'
          ],
          socialLinks: {
            website: 'https://techinnovators.com',
            linkedin: 'https://linkedin.com/company/techinnovators',
            instagram: 'https://instagram.com/techinnovators'
          }
        };
        setClub(clubData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load club details');
        setIsLoading(false);
      }
    };

    fetchClub();
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/clubs/${id}` } });
      return;
    }
    setShowJoinConfirmation(true);
  };

  const confirmJoin = async () => {
    try {
      // TODO: Implement join API call
      toast.success('Successfully joined the club!');
      setShowJoinConfirmation(false);
    } catch (err) {
      toast.error('Failed to join the club');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-300">{error || 'Club not found'}</p>
          <button
            onClick={() => navigate('/clubs')}
            className="mt-6 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
          >
            Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="p-6 md:p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{club.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {club.city}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> {club.members} Members
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {club.events} Events
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-gray-800/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-300">{club.longDescription}</p>
            </section>

            {/* Upcoming Events Section */}
            <section className="bg-gray-800/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club.upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section className="bg-gray-800/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievements
              </h2>
              <ul className="space-y-2">
                {club.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="space-y-6">
            {/* Join Button */}
            <div className="bg-gray-800/30 rounded-xl p-6">
              <button
                onClick={handleJoin}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition-all"
              >
                Join Club
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-800/30 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${club.head.email}`} className="text-gray-300 hover:text-white">
                    {club.head.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href={`tel:${club.head.phone}`} className="text-gray-300 hover:text-white">
                    {club.head.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="space-y-3">
                {Object.entries(club.socialLinks).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-white"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                ))}
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={() => {/* TODO: Implement share functionality */}}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Join Confirmation Modal */}
      {showJoinConfirmation && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Join {club.name}?</h3>
            <p className="text-gray-300 mb-6">
              You'll get access to exclusive events, discussions, and more!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowJoinConfirmation(false)}
                className="flex-1 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmJoin}
                className="flex-1 px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetail;