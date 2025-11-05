import { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import ClubCard from '../components/ClubCard';

const Clubs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const cities = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
  const categories = ['All', 'Technology', 'Sports', 'Arts', 'Literature', 'Science'];

  const clubs = [
    {
      id: 1,
      name: 'Tech Innovators',
      description: 'A community of tech enthusiasts and innovators',
      category: 'Technology',
      city: 'Mumbai',
      members: 150,
      events: 12,
      image: 'https://via.placeholder.com/400x250',
    },
    // Add more sample clubs here
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || club.city === selectedCity;
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    return matchesSearch && matchesCity && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Discover Clubs</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
            />
          </div>
          
          {/* City Filter */}
          <div className="flex items-center gap-2 md:w-48">
            <MapPin className="text-gray-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          {/* Category Filter */}
          <div className="flex items-center gap-2 md:w-48">
            <Filter className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        {/* No Results */}
        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No clubs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clubs;