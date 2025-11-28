import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import Spline from '@splinetool/react-spline';
import memberApi from '../services/memberApi';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Mail,
  Settings,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Camera,
  Heart,
  MessageCircle,
  MapPin,
  ArrowLeft,
  Linkedin,
  Instagram,
  Twitter,
  X,
} from "lucide-react";


const DashboardMember = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [eventTab, setEventTab] = useState('upcoming');
  const [clubTab, setClubTab] = useState('discover');

  // State for member's profile
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    college: "",
    avatar: "https://i.pravatar.cc/150?img=5", // Default avatar
    bio: "",
    phone: "",
    isCollegeIdVerified: false,
    isPhoneVerified: false,
    linkedin: "",
    instagram: "",
    twitter: "",
  });

  // Fetch user profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await memberApi.getProfile();
        if (response.success && response.data) {
          setProfileData({
            name: response.data.fullName || "",
            email: response.data.email || "",
            college: response.data.collegeName || "",
            avatar: response.data.avatar || "https://i.pravatar.cc/150?img=5",
            bio: response.data.bio || "",
            phone: response.data.phone || "",
            isCollegeIdVerified: response.data.isCollegeIdVerified || false,
            isPhoneVerified: response.data.isPhoneVerified || false,
            linkedin: response.data.socialLinks?.linkedin || "",
            instagram: response.data.socialLinks?.instagram || "",
            twitter: response.data.socialLinks?.twitter || "",
          });
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch profile data");
      }
    };
    fetchProfile();
  }, []);

  // State for member's posts
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ 
    title: "", 
    content: "", 
    isPublic: true,
    image: null,
    imagePreview: null
  });

  // State for events
  const [selectedEventId, setSelectedEventId] = useState(null);
  const eventTypes = ["All", "Workshop", "Competition", "Seminar", "Social"];
  const [selectedType, setSelectedType] = useState("All");
  const [allEvents, setAllEvents] = useState([]);

  // Enhanced states for event management
  const [registeredEvents, setRegisteredEvents] = useState({
    upcoming: [],
    past: [],
    pending: []
  });

  // Enhanced states for club management
  const [clubMemberships, setClubMemberships] = useState({
    joined: [],
    pending: [],
    created: []
  });

  // Fetch events and club data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const eventsResponse = await memberApi.getAllEvents();
        if (eventsResponse.success && eventsResponse.data) {
          // Normalize event objects to always include an `id` field
          const normalized = eventsResponse.data.map(ev => ({ ...ev, id: ev._id || ev.id }));
          setAllEvents(normalized);
        }

        // Fetch registered events
        const registeredResponse = await memberApi.getRegisteredEvents();
        if (registeredResponse.success && registeredResponse.data) {
          // Convert registered event objects into arrays of ids so includes() checks work
          const reg = registeredResponse.data;
          const normalized = {
            upcoming: (reg.upcoming || []).map(e => e._id || e.id),
            past: (reg.past || []).map(e => e._id || e.id),
            pending: (reg.pending || []).map(e => e._id || e.id),
          };
          setRegisteredEvents(normalized);
        }

        // Fetch public blogs to show in posts/feed
        const blogsResponse = await memberApi.getPublicBlogs();
        if (blogsResponse.success && blogsResponse.data) {
          // Map blogs to the posts shape used in this component
          const blogPosts = blogsResponse.data.map(b => ({
            id: b._id,
            caption: b.title,
            image: b.image || 'https://via.placeholder.com/400x250',
            likes: b.likes || 0,
            comments: b.comments || 0,
            date: b.createdAt,
            isPublic: true
          }));
          setPosts(blogPosts);
        }

        // Fetch club memberships
        const membershipsResponse = await memberApi.getClubMemberships();
        if (membershipsResponse.success && membershipsResponse.data) {
          // membershipsResponse.data is expected to be { joined: [], pending: [], created: [] }
          setClubMemberships(membershipsResponse.data);
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, []);
  const filteredEvents = allEvents.filter(event =>
    (selectedType === "All" || event.type === selectedType) &&
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // State for clubs
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [showCreateClub, setShowCreateClub] = useState(false);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [allClubs, setAllClubs] = useState([]);

  // Fetch clubs data
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await memberApi.getAllClubs();
        if (response.success && response.data) {
          // Normalize clubs to include `id` for consistent client usage
          const normalized = response.data.map(c => ({ ...c, id: c._id || c.id }));
          setAllClubs(normalized);
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch clubs");
      }
    };
    fetchClubs();
  }, []);

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Profile", icon: Settings },
    { name: "Events", icon: Calendar },
    { name: "Clubs", icon: Users },
    { name: "Contact", icon: Mail },
    { name: "Logout", icon: LogOut },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  // Add these new handler functions
  const handleEventRegistration = async (eventId) => {
    try {
      // Prevent duplicate registrations
      if (registeredEvents.upcoming.includes(eventId) || 
          registeredEvents.pending.includes(eventId)) {
        toast.error("You've already registered for this event!");
        return;
      }

      const response = await memberApi.registerForEvent(eventId);
      setRegisteredEvents(prev => ({
        ...prev,
        pending: [...prev.pending, eventId]
      }));
      toast.success(response.message || "Registration successful!");
      
      // Refresh events list (normalize to id arrays)
      const updatedEvents = await memberApi.getRegisteredEvents();
      if (updatedEvents && updatedEvents.data) {
        const reg = updatedEvents.data;
        setRegisteredEvents({
          upcoming: (reg.upcoming || []).map(e => e._id || e.id),
          past: (reg.past || []).map(e => e._id || e.id),
          pending: (reg.pending || []).map(e => e._id || e.id)
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to register for event");
    }
  };

  const handleClubJoinRequest = async (clubId) => {
    try {
      // Check if already a member or pending
      if (clubMemberships.joined.includes(clubId) || 
          clubMemberships.pending.includes(clubId)) {
        toast.error("You've already joined or requested to join this club!");
        return;
      }

      const response = await memberApi.requestToJoinClub(clubId);
      setClubMemberships(prev => ({
        ...prev,
        pending: [...prev.pending, clubId]
      }));
      toast.success(response.message || "Join request sent successfully!");
      
      // Refresh club memberships
      const updatedMemberships = await memberApi.getClubMemberships();
      // memberApi.getClubMemberships returns: { success: true, data: { joined, pending, created }}
      if (updatedMemberships && updatedMemberships.data) setClubMemberships(updatedMemberships.data);
    } catch (error) {
      toast.error(error.message || "Failed to send join request");
    }
  };

  const handleClubCreation = async (clubData) => {
    try {
      // Validate club creation email
      if (!clubData.email || clubData.email === profileData.email) {
        toast.error("Please use a different email for club creation");
        return;
      }

      const response = await fetch('/api/clubs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(clubData)
      });

      const data = await response.json();

      if (response.ok) {
        setClubMemberships(prev => ({
          ...prev,
          created: [...prev.created, data.clubId]
        }));
        toast.success("Club created successfully!");
        setShowCreateClub(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to create club");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    try {
      await memberApi.createBlogPost({
        title: newPost.title,
        content: newPost.content,
        image: newPost.image,
        isPublic: newPost.isPublic
      });

      // Refresh the posts list
      const blogsResponse = await memberApi.getPublicBlogs();
      if (blogsResponse.success && blogsResponse.data) {
        setPosts(blogsResponse.data);
      }

      // Reset form and close modal
      setShowCreatePost(false);
      setNewPost({ 
        title: "", 
        content: "", 
        isPublic: true,
        image: null,
        imagePreview: null
      });
      
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to create post');
    }
  };

  const renderSection = () => {
      switch (activeSection) {
         case "Dashboard":
        return <DashboardOverview profileData={profileData} posts={posts} allEvents={allEvents} allClubs={allClubs} />;
         case "Profile":
        return <ProfileSection profileData={profileData} setProfileData={setProfileData} startEditing={profileEditMode} onEditingDone={() => setProfileEditMode(false)} />;
      case "My Posts":
        return <PostsSection posts={posts} setShowCreatePost={setShowCreatePost} />;
         case "Events":
        if (selectedEventId) {
          const event = allEvents.find(e => e.id === selectedEventId);
          return <EventDetails 
                    event={event} 
                    onBack={() => setSelectedEventId(null)} 
                    onRegister={handleEventRegistration}
                    isRegistered={registeredEvents.upcoming.includes(event.id)}
                 />;
        }
        return <EventsSection 
                  events={filteredEvents} 
                  eventTypes={eventTypes} 
                  activeTab={eventTab}
                  setActiveTab={setEventTab}
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm} 
                  selectedType={selectedType} 
                  setSelectedType={setSelectedType}
                  registeredEvents={registeredEvents}
                  handleEventRegistration={handleEventRegistration}
                  onEventClick={setSelectedEventId} 
               />;
      case "Clubs":
        if (selectedClubId) {
          const club = allClubs.find(c => c.id === selectedClubId);
          return <ClubDetails club={club} onBack={() => setSelectedClubId(null)} />;
        }
        return <ClubsSection 
            clubs={allClubs} 
            onClubClick={setSelectedClubId} 
            clubMemberships={clubMemberships}
            handleClubJoinRequest={handleClubJoinRequest}
            activeTab={clubTab}
            setActiveTab={setClubTab} />;
         case "Contact":
        return <ContactSection />;
         default:
        return <DashboardOverview profileData={profileData} posts={posts} allEvents={allEvents} allClubs={allClubs} />;
      }
   };

   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 text-white relative font-sans">
      {/* Background Spline and Glow Effects */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Spline scene="https://prod.spline.design/GY9dYJg6o7hSFA5E/scene.splinecode" />
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
         {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-xl text-slate-200 flex flex-col shadow-2xl border-r border-blue-500/20">
            <div className="p-6 border-b border-white/10">
               <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-violet-500 p-2 rounded-lg shadow-lg shadow-blue-500/50">
                     <Users className="w-6 h-6" />
                  </div>
                  <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Spectra</h1>
              <p className="text-xs text-gray-400">Member Portal</p>
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
                                 ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                                 : "hover:bg-white/10 text-slate-400 hover:text-white"
                           }`}
                        >
                           <item.icon className="w-5 h-5" />
                           <span className="font-medium">{item.name}</span>
                        </button>
                     </li>
                  ))}
               </ul>
            </nav>
            <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <img src={profileData.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{profileData.name}</p>
              <p className="text-xs text-gray-400 truncate">{profileData.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setActiveSection('Profile'); setProfileEditMode(true); }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md">
                Edit
              </button>
            </div>
          </div>
            </div>
         </aside>

         {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black/20">
            <div className="max-w-7xl mx-auto p-6 md:p-8">
               {renderSection()}
            </div>
         </main>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Create New Post</h3>
              <button onClick={() => setShowCreatePost(false)} className="text-gray-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Post Title"
                className="w-full border border-gray-700 rounded-lg px-4 py-2.5 bg-gray-800 text-white"
              />
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="What's on your mind?"
                rows="4"
                className="w-full border border-gray-700 rounded-lg px-4 py-2.5 bg-gray-800 text-white"
              ></textarea>
              
              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">Add Image</label>
                <div className="flex items-center gap-4">
                  {newPost.imagePreview && (
                    <div className="relative">
                      <img 
                        src={newPost.imagePreview} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setNewPost(prev => ({ ...prev, image: null, imagePreview: null }))}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {!newPost.imagePreview && (
                    <label className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                      <Camera className="w-5 h-5" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewPost(prev => ({
                                ...prev,
                                image: file,
                                imagePreview: reader.result
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={newPost.isPublic}
                    onChange={(e) => setNewPost({ ...newPost, isPublic: e.target.checked })}
                    className="rounded border-gray-700 bg-gray-800 text-violet-600 focus:ring-violet-500"
                  />
                  Make this post public
                </label>
              </div>
              
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreatePost(false)} className="bg-white/10 text-gray-300 px-6 py-2 rounded-lg">Cancel</button>
                <button 
                  type="submit" 
                  disabled={!newPost.title || !newPost.content}
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Club Modal */}
      {showCreateClub && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Create New Club</h3>
              <button onClick={() => setShowCreateClub(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const clubData = Object.fromEntries(formData.entries());
                handleClubCreation(clubData);
            }} className="space-y-4">
              <input name="name" type="text" placeholder="Club Name" className="w-full border border-gray-700 rounded-lg px-4 py-2.5 bg-gray-800 text-white" required />
              <textarea name="description" placeholder="Club Description" rows="3" className="w-full border border-gray-700 rounded-lg px-4 py-2.5 bg-gray-800 text-white" required></textarea>
              <input name="email" type="email" placeholder="Club Contact Email" className="w-full border border-gray-700 rounded-lg px-4 py-2.5 bg-gray-800 text-white" required />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateClub(false)} className="bg-white/10 text-gray-300 px-6 py-2 rounded-lg">Cancel</button>
                <button type="submit" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-lg">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
      </div>
   );
};

const DashboardOverview = ({ profileData, posts, allEvents, allClubs }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-white">Welcome back, {profileData.name.split(' ')[0]}!</h2>
    
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "My Posts", value: posts.length, icon: FileText, color: "blue" },
          { label: "Joined Clubs", value: allClubs.filter(c => c.isJoined).length, icon: Users, color: "green" },
          { label: "Registered Events", value: allEvents.length, icon: Calendar, color: "purple" },
        ].map((stat, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-3 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
          <p className="text-4xl font-bold text-white mt-1">{stat.value}</p>
        </div>
      ))}
    </div>

    {/* Quick Actions & Recent Activity */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg">
            <Plus className="w-4 h-4" /> Create Post
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-gray-300 rounded-lg">
            <Settings className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        <p className="text-gray-400">Your latest post "Excited for the upcoming Tech Summit!" received 5 new likes.</p>
      </div>
    </div>
  </div>
);

const ProfileSection = ({ profileData, setProfileData, startEditing = false, onEditingDone }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);

  // Sync formData when profileData changes
  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  // Start editing if parent requests it
  useEffect(() => {
    if (startEditing) setIsEditing(true);
  }, [startEditing]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      // store both file (for upload) and preview (data URL) for UI
      setFormData(prev => ({ ...prev, avatarPreview: reader.result, avatarFile: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      // If a file was chosen, upload as FormData to avoid sending large base64 JSON
      let payload;
      if (formData.avatarFile instanceof File) {
        payload = new FormData();
        payload.append('fullName', formData.name || '');
        payload.append('collegeName', formData.college || '');
        payload.append('bio', formData.bio || '');
        payload.append('phone', formData.phone || '');
        payload.append('socialLinks', JSON.stringify({ linkedin: formData.linkedin || '', instagram: formData.instagram || '', twitter: formData.twitter || '' }));
        payload.append('avatar', formData.avatarFile);
      } else {
        payload = {
          fullName: formData.name,
          collegeName: formData.college,
          bio: formData.bio,
          phone: formData.phone,
          socialLinks: {
            linkedin: formData.linkedin,
            instagram: formData.instagram,
            twitter: formData.twitter,
          }
        };
        if (formData.avatarPreview) payload.avatar = formData.avatarPreview;
      }

      const response = await memberApi.updateProfile(payload);

      if (response && response.success && response.data) {
        const updatedUser = response.data;
        setProfileData({
          name: updatedUser.fullName || formData.name,
          email: updatedUser.email || profileData.email,
          college: updatedUser.collegeName || formData.college,
          avatar: updatedUser.avatar || formData.avatarPreview || formData.avatar || profileData.avatar,
          bio: updatedUser.bio || formData.bio,
          phone: updatedUser.phone || formData.phone,
          isCollegeIdVerified: updatedUser.isCollegeIdVerified || profileData.isCollegeIdVerified,
          isPhoneVerified: updatedUser.phoneVerified || profileData.isPhoneVerified,
          linkedin: updatedUser.socialLinks?.linkedin || formData.linkedin,
          instagram: updatedUser.socialLinks?.instagram || formData.instagram,
          twitter: updatedUser.socialLinks?.twitter || formData.twitter,
        });

        toast.success("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        if (typeof onEditingDone === 'function') onEditingDone();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">My Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img src={formData.avatarPreview || formData.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-violet-500/50 object-cover" />
            {isEditing && (
              <div className="absolute bottom-1 right-1">
                <label className="bg-white/90 text-violet-600 p-2 rounded-full shadow-md hover:bg-white cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="text-4xl font-bold bg-transparent border-b border-gray-700 focus:outline-none focus:border-violet-500" />
            ) : (
              <h2 className="text-4xl font-bold text-white">{formData.name}</h2>
            )}
            {isEditing ? (
              <input type="text" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} className="text-gray-400 mt-1 bg-transparent border-b border-gray-700 focus:outline-none focus:border-violet-500" />
            ) : (
              <p className="text-gray-400 mt-1">{formData.college}</p>
            )}
          </div>
        </div>

          <div className="mt-8 space-y-6">
          <div>
            <label className="text-sm text-gray-400">Bio</label>
            {isEditing ? (
              <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows="3" className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"></textarea>
            ) : (
              <p>{formData.bio}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <p className="text-gray-300">{formData.email} {formData.isCollegeIdVerified && <span className="text-green-400 text-xs ml-2">(Verified)</span>}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Phone</label>
            {isEditing ? (
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none" />
            ) : (
              <p className="text-gray-300">{formData.phone} {formData.isPhoneVerified ? <span className="text-green-400 text-xs ml-2">(Verified)</span> : <span className="text-yellow-400 text-xs ml-2">(Not Verified)</span>}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</label>
              {isEditing ? (
                <input type="text" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none" placeholder="linkedin-username" />
              ) : (
                <a href={`https://linkedin.com/in/${formData.linkedin}`} className="text-violet-400 hover:underline">{formData.linkedin}</a>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram</label>
              {isEditing ? (
                <input type="text" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none" placeholder="instagram_handle" />
              ) : (
                <a href={`https://instagram.com/${formData.instagram}`} className="text-violet-400 hover:underline">@{formData.instagram}</a>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter</label>
              {isEditing ? (
                <input type="text" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none" placeholder="twitter_handle" />
              ) : (
                <a href={`https://twitter.com/${formData.twitter}`} className="text-violet-400 hover:underline">@{formData.twitter}</a>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button onClick={handleSave} className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostsSection = ({ posts, setShowCreatePost }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-white">My Posts</h2>
      <button onClick={() => setShowCreatePost(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg">
        <Plus className="w-4 h-4" /> Create Post
      </button>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map(post => (
        <div key={post._id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          {post.image?.url && (
            <img src={post.image.url} alt={post.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="mb-4 text-gray-300">{post.content.slice(0, 150)}{post.content.length > 150 ? '...' : ''}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div className="flex gap-4">
                {post.author && (
                  <span className="flex items-center gap-1">By: {post.author.fullName || 'Unknown'}</span>
                )}
              </div>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  // Update the EventsSection component
  const EventsSection = ({ events, onEventClick, activeTab, setActiveTab, registeredEvents, handleEventRegistration }) => {
    return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
      
      {/* Registration Status Tabs */}
      <div className="flex gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'upcoming' ? 'bg-violet-600' : 'bg-white/10'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'registered' ? 'bg-violet-600' : 'bg-white/10'
          }`}
          onClick={() => setActiveTab('registered')}
        >
          Registered
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-48 object-cover"
              onClick={() => onEventClick(event.id)}
            />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              
              {/* Registration Status & Button */}
              <div className="mt-4">
                {registeredEvents.upcoming.includes(event.id) ? (
                  <div className="flex items-center justify-between bg-green-500/20 text-green-400 px-4 py-2 rounded-lg">
                    <span>Registered</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                ) : registeredEvents.pending.includes(event.id) ? (
                  <div className="flex items-center justify-between bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg">
                    <span>Pending</span>
                    <Clock className="w-4 h-4" />
                  </div>
                ) : (
                  <button
                    onClick={() => handleEventRegistration(event.id)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const EventDetails = ({ event, onBack, onRegister, isRegistered }) => (
  <div>
    <button onClick={onBack} className="flex items-center gap-2 mb-6 text-violet-400">
      <ArrowLeft className="w-4 h-4" /> Back to Events
    </button>
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h2 className="text-4xl font-bold mb-2">{event.title}</h2>
      <div className="flex gap-4 text-gray-400 mb-4">
        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date} at {event.time}</span>
        <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</span>
      </div>
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: event.fullDescription || event.description }} />
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => onRegister(event.id)} 
          disabled={isRegistered}
          className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRegistered ? 'Registered' : (event.isFree ? 'Register for Free' : `Register for ${event.price}`)}
        </button>
      </div>
    </div>
  </div>
);


  // Update the ClubsSection component
  const ClubsSection = ({ clubs, onClubClick, clubMemberships, handleClubJoinRequest, activeTab, setActiveTab }) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Discover Clubs</h2>
      </div>

      {/* Club Status Tabs */}
      <div className="flex gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'discover' ? 'bg-violet-600' : 'bg-white/10'
          }`}
          onClick={() => setActiveTab('discover')}
        >
          Discover
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => (
          <div key={club.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <img 
              src={club.image} 
              alt={club.name} 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-xl mb-2">{club.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{club.description}</p>
            
            {/* Club Join Status & Actions */}
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => onClubClick(club.id)}
                className="px-4 py-2 bg-white/10 rounded-lg text-sm"
              >
                View Details
              </button>
              
              {clubMemberships.joined.includes(club.id) ? (
                <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm">
                  Member
                </div>
              ) : clubMemberships.pending.includes(club.id) ? (
                <div className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm">
                  Pending
                </div>
              ) : (
                <button
                  onClick={() => handleClubJoinRequest(club.id)}
                  className="px-4 py-2 bg-violet-600 rounded-lg text-sm hover:bg-violet-700 transition-colors"
                >
                  Join Club
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

const ClubDetails = ({ club, onBack }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubEvents = async () => {
      try {
        setLoading(true);
        const res = await memberApi.getClubEvents(club._id || club.id);
        if (res.success && res.data) setEvents(res.data);
      } catch (e) {
        toast.error(e.message || 'Failed to load club events');
      } finally {
        setLoading(false);
      }
    };
    if (club) fetchClubEvents();
  }, [club]);

  const handleRegister = async (eventId) => {
    try {
      const resp = await memberApi.registerForEvent(eventId);
      if (resp.success) {
        toast.success(resp.message || 'Registered successfully');
        // Refresh events to update status
        const res = await memberApi.getClubEvents(club._id || club.id);
        if (res.success && res.data) setEvents(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to register for event');
    }
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 mb-6 text-violet-400">
        <ArrowLeft className="w-4 h-4" /> Back to Clubs
      </button>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <h2 className="text-4xl font-bold mb-4">{club.name}</h2>
        <p className="mb-6">{club.description}</p>

        <h3 className="text-2xl font-semibold mb-4">Events by {club.name}</h3>
        {loading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-400">No upcoming events.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map(ev => (
              <div key={ev._id || ev.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <h4 className="font-bold text-lg">{ev.title}</h4>
                <p className="text-sm text-gray-400">{new Date(ev.date).toDateString()}</p>
                <p className="mt-2 text-gray-300">{ev.description?.slice(0, 140)}</p>
                <div className="mt-4">
                  {ev.isRegistered ? (
                    <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm inline-flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Registered
                    </div>
                  ) : (
                    <button onClick={() => handleRegister(ev._id || ev.id)} className="px-4 py-2 bg-violet-600 rounded-lg text-white">Register</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ContactSection = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Contact Support</h2>
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-2xl">
      <form className="space-y-4">
        <input type="text" placeholder="Subject" className="w-full border border-gray-700 rounded-lg px-4 py-2.5 bg-gray-800 text-white" />
        <textarea placeholder="Your message..." rows="5" className="w-full border border-gray-700 rounded-lg px-4 py-2.5 bg-gray-800 text-white"></textarea>
        <div className="flex justify-end">
          <button type="submit" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-lg">Send Message</button>
        </div>
      </form>
    </div>
  </div>
);

export default DashboardMember;