import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  User,
  Image as ImageIcon,
  Calendar,
  Users,
  CreditCard,
  Mail,
  LogOut,
  Upload,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Globe,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Plus,
  X,
  Camera,
  FileText,
  TrendingUp,
  Award,
  Star,
} from "lucide-react";

const DashboardMember = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateClub, setShowCreateClub] = useState(false);

  // Profile Data
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@college.edu",
    college: "Tech University",
    phone: "+91 9876543210",
    isPhoneVerified: true,
    isCollegeIdVerified: true,
    linkedin: "linkedin.com/in/johndoe",
    instagram: "@johndoe",
    twitter: "@johndoe",
    bio: "Computer Science student passionate about AI and Web Development",
    avatar: "https://via.placeholder.com/150"
  });
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const sidebarItems = [
    { name: "Dashboard", icon: Home },
    { name: "My Profile", icon: User },
    { name: "Posts", icon: ImageIcon },
    { name: "Events", icon: Calendar },
    { name: "Clubs", icon: Users },
    { name: "Subscription", icon: CreditCard },
    { name: "Contact", icon: Mail },
    { name: "Logout", icon: LogOut },
  ];

  const eventTypes = ['All', 'Conference', 'Workshop', 'Seminar', 'Competition', 'Social'];
  
  const events = [
    {
      id: 1,
      title: 'Tech Summit 2025',
      description: 'Join us for the biggest tech event of the year featuring industry experts',
      fullDescription: `
        <h3>About the Event</h3>
        <p>Tech Summit 2025 is the premier technology conference bringing together students, professionals, and industry leaders.</p>
        <h3>What to Expect</h3>
        <ul>
          <li>Keynote speeches from industry leaders</li>
          <li>Hands-on workshops and tutorials</li>
          <li>Networking sessions</li>
          <li>Career guidance and mentorship</li>
          <li>Exciting competitions and prizes</li>
        </ul>
      `,
      date: '2025-11-15',
      time: '10:00 AM - 6:00 PM',
      location: 'Main Auditorium',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      type: 'Conference',
      isFree: true,
      registrations: 156,
      capacity: 200,
      organizer: 'Tech Club',
      speakers: [
        { name: 'Dr. John Smith', role: 'AI Researcher', image: 'https://via.placeholder.com/80' },
        { name: 'Jane Doe', role: 'Tech Entrepreneur', image: 'https://via.placeholder.com/80' }
      ]
    },
    {
      id: 2,
      title: 'Coding Workshop',
      description: 'Learn modern web development techniques from scratch',
      date: '2025-11-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Lab',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      type: 'Workshop',
      isFree: false,
      registrations: 45,
      capacity: 50,
      price: '₹299',
      organizer: 'Coding Club'
    },
    {
      id: 3,
      title: 'AI/ML Seminar',
      description: 'Exploring the future of artificial intelligence and machine learning',
      date: '2025-11-25',
      time: '11:00 AM - 1:00 PM',
      location: 'Lecture Hall 3',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      type: 'Seminar',
      isFree: true,
      registrations: 89,
      capacity: 100,
      organizer: 'AI Club'
    }
  ];

  const clubs = [
    {
      id: 1,
      name: 'Spectra AI Club',
      description: 'Exploring artificial intelligence and machine learning',
      members: 234,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300',
      isJoined: true,
      category: 'Technology',
      events: 12,
      posts: 45
    },
    {
      id: 2,
      name: 'Design Innovators',
      description: 'Creative minds shaping digital experiences',
      members: 156,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300',
      isJoined: false,
      category: 'Design',
      events: 8,
      posts: 32
    },
    {
      id: 3,
      name: 'Entrepreneurship Cell',
      description: 'Building the next generation of entrepreneurs',
      members: 189,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300',
      isJoined: false,
      category: 'Business',
      events: 15,
      posts: 28
    }
  ];

  const [posts, setPosts] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
      caption: "Exploring the latest AI innovations at Spectra! 🚀",
      likes: 24,
      comments: 5,
      isPublic: true,
      date: "2 hours ago"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
      caption: "Amazing moments with our club members 💜",
      likes: 45,
      comments: 12,
      isPublic: true,
      date: "1 day ago"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400",
      caption: "Our first offline event was a blast! 🎉",
      likes: 67,
      comments: 8,
      isPublic: false,
      date: "3 days ago"
    }
  ]);

  const filteredEvents = events.filter(event => 
    (event.title.toLowerCase().includes(eventSearchTerm.toLowerCase()) || 
     event.description.toLowerCase().includes(eventSearchTerm.toLowerCase())) && 
    (selectedEventType === 'All' || event.type === selectedEventType)
  );

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <DashboardOverview />;
      case "My Profile":
        return <ProfileSection profileData={profileData} setProfileData={setProfileData} />;
      case "Posts":
        return <PostsSection posts={posts} setPosts={setPosts} showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />;
      case "Events":
        return selectedEventId ? 
          <EventDetailView event={events.find(e => e.id === selectedEventId)} onBack={() => setSelectedEventId(null)} /> :
          <EventsSection 
            events={filteredEvents}
            eventTypes={eventTypes}
            searchTerm={eventSearchTerm}
            setSearchTerm={setEventSearchTerm}
            selectedType={selectedEventType}
            setSelectedType={setSelectedEventType}
            onEventClick={setSelectedEventId}
          />;
      case "Clubs":
        return selectedClubId ?
          <ClubDetailView club={clubs.find(c => c.id === selectedClubId)} onBack={() => setSelectedClubId(null)} /> :
          <ClubsSection clubs={clubs} onClubClick={setSelectedClubId} showCreateClub={showCreateClub} setShowCreateClub={setShowCreateClub} />;
      case "Subscription":
        return <SubscriptionSection />;
      case "Contact":
        return <ContactSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-purple-700">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Spectra</h1>
              <p className="text-xs text-purple-200">Member Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-1 p-3">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={
                    item.name === "Logout"
                      ? handleLogout
                      : () => {
                          setActiveSection(item.name);
                          if (item.name === "Events") setSelectedEventId(null);
                          if (item.name === "Clubs") setSelectedClubId(null);
                        }
                  }
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    activeSection === item.name
                      ? "bg-white text-purple-900 shadow-lg"
                      : "hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-purple-700">
          <div className="flex items-center gap-3 mb-3">
            <img src={profileData.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white/20" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{profileData.name}</p>
              <p className="text-xs text-purple-200 truncate">{profileData.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const stats = [
    { label: "Joined Clubs", value: "3", icon: Users, color: "purple", trend: "+2 this month" },
    { label: "Events Registered", value: "5", icon: Calendar, color: "blue", trend: "2 upcoming" },
    { label: "Posts Shared", value: "12", icon: ImageIcon, color: "pink", trend: "+4 this week" },
    { label: "Total Likes", value: "234", icon: Heart, color: "red", trend: "+45 this week" },
  ];

  const recentActivity = [
    { type: "event", title: "Registered for Tech Summit 2025", time: "2 hours ago", icon: Calendar },
    { type: "post", title: "Posted new photo", time: "5 hours ago", icon: ImageIcon },
    { type: "club", title: "Joined Design Innovators", time: "1 day ago", icon: Users },
    { type: "achievement", title: "Earned 'Active Member' badge", time: "2 days ago", icon: Award },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h2>
        <p className="text-gray-600 mt-1">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            <p className="text-xs text-green-600 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
              <div className="bg-purple-100 p-2 rounded-lg">
                <activity.icon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-xl hover:shadow-lg transition">
          <Plus className="w-6 h-6 mb-2" />
          <p className="font-semibold">Create Post</p>
        </button>
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl hover:shadow-lg transition">
          <Calendar className="w-6 h-6 mb-2" />
          <p className="font-semibold">Browse Events</p>
        </button>
        <button className="bg-gradient-to-r from-pink-600 to-pink-700 text-white p-6 rounded-xl hover:shadow-lg transition">
          <Users className="w-6 h-6 mb-2" />
          <p className="font-semibold">Explore Clubs</p>
        </button>
      </div>
    </div>
  );
};

// Profile Section Component
const ProfileSection = ({ profileData, setProfileData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-600 mt-1">Manage your account information and verification</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={profileData.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white" />
            <button className="absolute bottom-0 right-0 bg-white text-purple-600 p-2 rounded-full hover:bg-gray-100 transition">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{profileData.name}</h3>
            <p className="text-purple-100">{profileData.email}</p>
            <div className="flex gap-2 mt-3">
              {profileData.isCollegeIdVerified && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> College Verified
                </span>
              )}
              {profileData.isPhoneVerified && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Phone Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">College Name</label>
            <input
              type="text"
              value={profileData.college}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">College ID Verification</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-600 transition">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Contact Number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={profileData.phone}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <button type="button" className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition">
                Verify OTP
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-4">Social Links</label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  value={profileData.linkedin}
                  placeholder="LinkedIn URL"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-600" />
                <input
                  type="text"
                  value={profileData.instagram}
                  placeholder="Instagram handle"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  value={profileData.twitter}
                  placeholder="Twitter handle"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium">
              Save Changes
            </button>
            <button type="button" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Posts Section Component
const PostsSection = ({ posts, setPosts, showCreatePost, setShowCreatePost }) => {
  const [newPost, setNewPost] = useState({ caption: '', image: null, isPublic: true });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Posts</h2>
          <p className="text-gray-600 mt-1">Share your moments with the community</p>
        </div>
        <button
          onClick={() => setShowCreatePost(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" /> Create Post
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Create New Post</h3>
            <button onClick={() => setShowCreatePost(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <textarea
            value={newPost.caption}
            onChange={(e) => setNewPost({...newPost, caption: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="What's on your mind?"
            rows="4"
          ></textarea>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:border-purple-600 transition">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPost.isPublic}
                  onChange={(e) => setNewPost({...newPost, isPublic: e.target.checked})}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-600"
                />
                <span className="text-sm text-gray-700">Make post public</span>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreatePost(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
            <div className="relative">
              <img src={post.image} alt="Post" className="w-full h-64 object-cover" />
              <div className="absolute top-3 right-3 flex gap-2">
                {post.isPublic ? (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Public</span>
                ) : (
                  <span className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs">Private</span>
                )}
                <button className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-800 mb-3">{post.caption}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </span>
                </div>
                <span>{post.date}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 text-purple-600 hover:bg-purple-50 py-2 rounded-lg transition flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> View
                </button>
                <button className="flex-1 text-red-600 hover:bg-red-50 py-2 rounded-lg transition flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Events Section Component
const EventsSection = ({ events, eventTypes, searchTerm, setSearchTerm, selectedType, setSelectedType, onEventClick }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
        <p className="text-gray-600 mt-1">Discover and join exciting events happening in your community</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {eventTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} onClick={() => onEventClick(event.id)} className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">{event.type}</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-purple-600 transition">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-3 h-10 overflow-hidden">{event.description}</p>
                <div className="flex items-center text-sm text-gray-500 gap-3">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                {event.isFree ? (
                  <span className="text-green-600 font-bold">FREE</span>
                ) : (
                  <span className="text-purple-600 font-bold">{event.price}</span>
                )}
                <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition">View Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
          <p className="text-gray-500 text-lg">No events found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

// Clubs Section Component
const ClubsSection = ({ clubs, onClubClick, showCreateClub, setShowCreateClub }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Clubs & Communities</h2>
          <p className="text-gray-600 mt-1">Discover, join, and engage with clubs</p>
        </div>
        <button
          onClick={() => setShowCreateClub(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" /> Create Club
        </button>
      </div>

      {/* Create Club Modal */}
      {showCreateClub && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Create New Club</h3>
            <button onClick={() => setShowCreateClub(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form className="space-y-4">
            <input type="text" placeholder="Club Name" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
            <textarea placeholder="Club Description" rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-2.5"></textarea>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowCreateClub(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg">Create</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => (
          <div key={club.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group">
            <img src={club.image} alt={club.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium mb-2 inline-block">{club.category}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{club.name}</h3>
              <p className="text-sm text-gray-600 mb-3 h-10">{club.description}</p>
              <div className="flex items-center text-sm text-gray-500 gap-3">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {club.members}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {club.events}</span>
                <span className="flex items-center gap-1"><ImageIcon className="w-4 h-4" /> {club.posts}</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={() => onClubClick(club.id)}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                View Club
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Subscription Section Component
const SubscriptionSection = () => {
  const plans = [
    { name: "Basic", price: "Free", features: ["Access to public events", "Join up to 3 clubs", "Basic support"], isCurrent: false },
    { name: "Pro", price: "₹499/yr", features: ["Access to all events", "Unlimited club access", "Create your own club", "Priority support"], isCurrent: true },
    { name: "Premium", price: "₹999/yr", features: ["All Pro features", "Host paid events", "Advanced analytics", "Dedicated support"], isCurrent: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Subscription</h2>
        <p className="text-gray-600 mt-1">Manage your plan and unlock premium features</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.name} className={`bg-white rounded-xl shadow-sm border-2 p-6 flex flex-col ${plan.isCurrent ? 'border-purple-600' : 'border-gray-100'}`}>
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-3xl font-bold text-purple-600 my-4">{plan.price}</p>
            <ul className="space-y-2 text-gray-600 flex-grow">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full mt-6 py-3 rounded-lg font-medium transition ${plan.isCurrent ? 'bg-gray-200 text-gray-700' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
              {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Contact & Support</h2>
        <p className="text-gray-600 mt-1">Get help or send us your feedback</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form className="space-y-4">
          <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
          <textarea placeholder="Your message..." rows="5" className="w-full border border-gray-300 rounded-lg px-4 py-2.5"></textarea>
          <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">Submit</button>
        </form>
      </div>
    </div>
  );
};

// Event Detail View Component
const EventDetailView = ({ event, onBack }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  if (!event) return <div>Event not found.</div>;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-purple-600 hover:text-purple-800 font-medium">
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back to Events
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <img src={event.image} alt={event.title} className="w-full h-80 object-cover rounded-lg mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
          <p className="text-gray-700 text-lg mb-6">{event.description}</p>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.fullDescription || '' }} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold mb-4">Event Details</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3"><Calendar className="w-5 h-5 text-purple-600" /> {new Date(event.date).toDateString()}</li>
              <li className="flex items-center gap-3"><Clock className="w-5 h-5 text-purple-600" /> {event.time}</li>
              <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-purple-600" /> {event.location}</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold mb-4">Registration</h3>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-bold">
              {isRegistered ? '✓ Registered' : 'Register Now'}
            </button>
          </div>
          {event.speakers && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4">Speakers</h3>
              <div className="space-y-3">
                {event.speakers.map(speaker => (
                  <div key={speaker.name} className="flex items-center gap-3">
                    <img src={speaker.image} alt={speaker.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-semibold">{speaker.name}</p>
                      <p className="text-sm text-gray-600">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Club Detail View Component
const ClubDetailView = ({ club, onBack }) => {
  if (!club) return <div>Club not found.</div>;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-purple-600 hover:text-purple-800 font-medium">
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back to Clubs
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          <img src={club.image} alt={club.name} className="w-32 h-32 rounded-full border-4 border-purple-200" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900">{club.name}</h1>
            <p className="text-gray-600 mt-2">{club.description}</p>
            <div className="mt-4 flex justify-center md:justify-start gap-4">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
                {club.isJoined ? 'Joined' : 'Join Club'}
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Contact</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-b border-gray-200 py-4">
          <div><p className="text-2xl font-bold">{club.members}</p><p className="text-sm text-gray-500">Members</p></div>
          <div><p className="text-2xl font-bold">{club.events}</p><p className="text-sm text-gray-500">Events</p></div>
          <div><p className="text-2xl font-bold">{club.posts}</p><p className="text-sm text-gray-500">Posts</p></div>
          <div><p className="text-2xl font-bold flex items-center justify-center gap-1"><Star className="w-5 h-5 text-yellow-500" /> 4.8</p><p className="text-sm text-gray-500">Rating</p></div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
          {/* Placeholder for club posts */}
          <p className="text-gray-500">No posts yet.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMember;
