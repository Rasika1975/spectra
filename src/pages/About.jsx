import ClubCard from '../components/ClubCard';

const About = () => {
  const clubs = [
    {
      id: 1,
      name: 'Coding Club',
      description: 'A community of passionate coders and developers learning and building together',
      category: 'Technology',
      members: 250,
      events: 12,
      blogs: 34,
      verified: true,
      image: 'https://via.placeholder.com/400x250',
      head: { name: 'Alex Johnson', image: 'https://via.placeholder.com/40' }
    },
    {
      id: 2,
      name: 'Photography Club',
      description: 'Capture moments, share stories, and explore the art of photography',
      category: 'Arts',
      members: 180,
      events: 8,
      blogs: 21,
      verified: true,
      image: 'https://via.placeholder.com/400x250',
      head: { name: 'Emma Wilson', image: 'https://via.placeholder.com/40' }
    },
    {
      id: 3,
      name: 'Dance Society',
      description: 'Express yourself through movement and rhythm with fellow dance enthusiasts',
      category: 'Arts',
      members: 320,
      events: 15,
      blogs: 12,
      verified: false,
      image: 'https://via.placeholder.com/400x250',
      head: { name: 'Michael Brown', image: 'https://via.placeholder.com/40' }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About Spectra Community</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Building bridges between students, clubs, and opportunities
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Spectra Community was founded with a vision to create a unified platform 
            where students can discover opportunities, connect with like-minded peers, 
            and actively participate in college life beyond academics.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We believe that every student deserves easy access to events, clubs, and 
            communities that align with their interests. Our platform empowers students 
            to explore, engage, and grow while helping clubs and communities manage their 
            activities efficiently.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Clubs & Communities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">200+</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Blog Posts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Clubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;