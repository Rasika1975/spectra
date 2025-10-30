import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Image as ImageIcon,
  CreditCard,
  Mail,
  Settings,
  UserCheck,
  UserX,
  Eye,
  Edit2,
  Trash2,
  Plus,
  Upload,
  Link as LinkIcon,
  Phone,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Share2,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";

const DashboardClub = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // Local blog/event form states
  const [newBlog, setNewBlog] = useState({title:"",content:"",image:""});
  const [newEvent, setNewEvent] = useState({name:"",date:"",time:"",venue:"",description:"",image:""});

  // Club Profile State
  const [clubProfile, setClubProfile] = useState({
    name: "Tech Innovators",
    email: "tech@spectra.com",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400",
    about: "We are a community of tech enthusiasts passionate about innovation and learning.",
    headName: "Rohan Kumar",
    headEmail: "rohan@gmail.com",
    headPhone: "+91 98765 11111",
    headImage: "https://i.pravatar.cc/150?img=12",
    links: {
      website: "https://techinnovators.com",
      linkedin: "https://linkedin.com/company/techinnovators",
      instagram: "https://instagram.com/techinnovators",
      twitter: "https://twitter.com/techinnovators",
    },
  });

  // Members Data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Riya Sharma",
      email: "riya@gmail.com",
      college: "MIT",
      phone: "+91 98765 43210",
      status: "Pending",
      joinedDate: "2025-10-28",
      idCard: "id_card_url",
      avatar: "https://i.pravatar.cc/150?img=1",
      eventsAttended: 0,
    },
    {
      id: 2,
      name: "Arjun Mehta",
      email: "arjun@gmail.com",
      college: "PCCOE",
      phone: "+91 98765 43211",
      status: "Active",
      joinedDate: "2025-09-15",
      idCard: "id_card_url",
      avatar: "https://i.pravatar.cc/150?img=2",
      eventsAttended: 5,
    },
    {
      id: 3,
      name: "Priya Desai",
      email: "priya@gmail.com",
      college: "VIT",
      phone: "+91 98765 43212",
      status: "Pending",
      joinedDate: "2025-10-29",
      idCard: "id_card_url",
      avatar: "https://i.pravatar.cc/150?img=3",
      eventsAttended: 0,
    },
  ]);

  // Blogs Data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Future of AI in Education",
      content: "Artificial Intelligence is transforming education...",
      date: "2025-10-20",
      views: 1250,
      likes: 89,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    },
    {
      id: 2,
      title: "Web Development Best Practices",
      content: "Learn the best practices for modern web development...",
      date: "2025-10-25",
      views: 890,
      likes: 67,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    },
  ]);

  // Events Data
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Expo 2025",
      date: "2025-11-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      description: "Annual tech exhibition showcasing latest innovations",
      registrations: 145,
      maxCapacity: 200,
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    },
    {
      id: 2,
      name: "Workshop: React Masterclass",
      date: "2025-11-20",
      time: "2:00 PM",
      venue: "Lab 301",
      description: "Hands-on workshop on React.js",
      registrations: 78,
      maxCapacity: 100,
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    },
    {
      id: 3,
      name: "Hackathon 2025",
      date: "2025-10-10",
      time: "9:00 AM",
      venue: "Innovation Center",
      description: "24-hour coding competition",
      registrations: 60,
      maxCapacity: 60,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400",
    },
  ]);

  // Photos/Media Data
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
      caption: "Team meeting",
      visibility: "Public",
      uploadDate: "2025-10-28",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
      caption: "Workshop session",
      visibility: "Public",
      uploadDate: "2025-10-27",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400",
      caption: "Event photo",
      visibility: "Private",
      uploadDate: "2025-10-26",
    },
  ]);

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Profile", icon: Settings },
    { name: "Members", icon: Users },
    { name: "Blogs", icon: FileText },
    { name: "Events", icon: Calendar },
    { name: "Contact", icon: Mail },
  ];

  // Approve/Reject Member
  const handleMemberAction = (memberId, action) => {
    setMembers(
      members.map((m) =>
        m.id === memberId ? { ...m, status: action === "approve" ? "Active" : "Rejected" } : m
      )
    );
  };

  // Delete Blog
  const deleteBlog = (blogId) => {
    setBlogs(blogs.filter((b) => b.id !== blogId));
  };

  // Delete Event
  const deleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  // Delete Photo
  const deletePhoto = (photoId) => {
    setPhotos(photos.filter((p) => p.id !== photoId));
  };

  // Blog Modal - add blog to state
  const handlePublishBlog = () => {
    if (!newBlog.title) return;
    setBlogs([
      ...blogs,
      {
        id: Date.now(),
        title: newBlog.title,
        content: newBlog.content,
        date: new Date().toISOString().substr(0, 10),
        views: 0,
        likes: 0,
        image: newBlog.image || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      },
    ]);
    setNewBlog({title:"",content:"",image:""});
    setShowModal(false);
  };

  // Event Modal - add event to state
  const handleHostEvent = () => {
    if (!newEvent.name || !newEvent.date) return;
    setEvents([
      ...events,
      {
        id: Date.now(), ...newEvent, registrations: 0, maxCapacity: 100, status: "Upcoming",
        image: newEvent.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      },
    ]);
    setNewEvent({name:"",date:"",time:"",venue:"",description:"",image:""});
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/landing');
  };

  // ======================== DASHBOARD SECTION ========================
  const renderDashboard = () => {
    const pendingMembers = members.filter((m) => m.status === "Pending").length;
    const activeMembers = members.filter((m) => m.status === "Active").length;
    const upcomingEvents = events.filter((e) => e.status === "Upcoming").length;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Welcome Back, {clubProfile.name}! 👋</h2>
            <p className="text-gray-400 mt-1">Here's what's happening with your club today.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-gray-300 rounded-lg hover:bg-white/20 transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            Notifications
          </button>
        </div>

        {/* Host Event & Create Blog Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              setModalType("createBlog");
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Create Blog
          </button>
          <button
            onClick={() => {
              setModalType("createEvent");
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Host Event
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Members", value: activeMembers, icon: Users, color: "blue" },
            { label: "Pending Approvals", value: pendingMembers, icon: Clock, color: "yellow" },
            { label: "Upcoming Events", value: upcomingEvents, icon: Calendar, color: "purple" },
            { label: "Total Blogs", value: blogs.length, icon: FileText, color: "green" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-start mb-4 gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
              </div>
              <p className="text-4xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New member request: Riya Sharma", time: "5 min ago" },
              { text: "Tech Expo 2025: 145 registrations", time: "1 hour ago" },
              { text: "Blog published: Future of AI", time: "2 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-3 bg-black/20 rounded-lg">
                <div className="w-2 h-2 bg-violet-500 rounded-full mt-1.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-200">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ======================== PROFILE SECTION ========================
  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Club Profile</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Club Image */}
        <div className="md:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <img
            src={clubProfile.image}
            alt="Club"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform">
            <Upload className="w-4 h-4" />
            Change Image
          </button>
        </div>

        {/* Club Details */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">Club Name</label>
            <input
              type="text"
              value={clubProfile.name}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={clubProfile.email}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">About Club</label>
            <textarea
              rows="4"
              value={clubProfile.about}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
            />
          </div>
        </div>
      </div>

      {/* Club Head Details */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Club Head Details</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <img
              src={clubProfile.headImage}
              alt="Head"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20">
              <Upload className="w-4 h-4" />
              Update
            </button>
          </div>
          <div className="md:col-span-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={clubProfile.headName}
                className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={clubProfile.headEmail}
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={clubProfile.headPhone}
                    className="flex-1 px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
                  />
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Social Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(clubProfile.links).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
                {platform}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  className="flex-1 px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
                />
                <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform font-semibold">
        Save Changes
      </button>
    </div>
  );

  // ======================== MEMBERS SECTION ========================
  const renderMembers = () => {
    const filteredMembers = members.filter((m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-white">Member Management</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
              />
            </div>
            <select className="px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="text-yellow-300 font-medium">
            ⚠️ You have {members.filter((m) => m.status === "Pending").length} pending member
            approval(s)
          </p>
        </div>

        {/* Member Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div
                className={`h-2 ${
                  member.status === "Active"
                    ? "bg-green-600"
                    : member.status === "Pending"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-white">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.college}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      member.status === "Active"
                        ? "bg-green-500/20 text-green-300"
                        : member.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="font-medium">{member.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="font-medium">{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Joined:</span>
                    <span className="font-medium">{member.joinedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Events:</span>
                    <span className="font-medium">{member.eventsAttended}</span>
                  </div>
                </div>

                {member.status === "Pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMemberAction(member.id, "approve")}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleMemberAction(member.id, "reject")}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedItem(member);
                        setModalType("viewMember");
                        setShowModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ======================== BLOGS SECTION ========================
  const renderBlogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Club Blogs</h2>
        <button
          onClick={() => {
            setModalType("createBlog");
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Create Blog
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{blog.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{blog.date}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4"/> {blog.views}</span>
                  <span className="flex items-center gap-1">❤️ {blog.likes}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600/50 text-white rounded-lg hover:bg-violet-600">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ======================== EVENTS SECTION ========================
  const renderEvents = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <div className="relative">
              <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === "Upcoming"
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                {event.status}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">{event.name}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold">{event.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Registrations:</span>
                  <span className="font-semibold">
                    {event.registrations} / {event.maxCapacity}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600/50 text-white rounded-lg hover:bg-violet-600">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return renderDashboard();
      case "Profile":
        return renderProfile();
      case "Members":
        return renderMembers();
      case "Blogs":
        return renderBlogs();
      case "Events":
        return renderEvents();
      /** 📩 Contact Section */
      case "Contact":
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Contact & Support</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Club Email</label>
                <input
                  type="email"
                  placeholder="Enter your club email"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
                  placeholder="Enter your query"
                ></textarea>
              </div>
              <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                Submit
              </button>
            </form>
          </div>
        );

      default:
        return <div>Dashboard</div>;
    }
  };

  // =============== GLOBAL MODALS FOR BLOG / EVENT CREATION ===================
  const renderModals = () => (
    <>
      {/* Create Blog Modal */}
      {showModal && modalType === "createBlog" && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 pt-20">
          <div className="bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-2xl max-w-2xl w-full max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gray-900/80 backdrop-blur-lg z-10">
              <h3 className="text-xl font-bold text-white">Create New Blog</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                  placeholder="Enter blog title"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Content</label>
                <textarea
                  rows="8"
                  value={newBlog.content}
                  onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                  placeholder="Write your blog content..."
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={newBlog.image}
                  onChange={e => setNewBlog({ ...newBlog, image: e.target.value })}
                  placeholder="Paste image URL (optional)"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold"
                  onClick={handlePublishBlog}
                >
                  Publish Blog
                </button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Host Event Modal */}
      {showModal && modalType === "createEvent" && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 pt-20">
          <div className="bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-2xl max-w-2xl w-full max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gray-900/80 backdrop-blur-lg z-10">
              <h3 className="text-xl font-bold text-white">Host New Event</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })} placeholder="Event Name" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              <input type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              <input type="text" value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })} placeholder="Venue" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              <textarea rows="4" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} placeholder="Description" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              <input type="text" value={newEvent.image} onChange={e => setNewEvent({ ...newEvent, image: e.target.value })} placeholder="Paste event image URL (optional)" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold"
                  onClick={handleHostEvent}
                >
                  Host Event
                </button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-slate-200 flex flex-col shadow-2xl border-r border-white/10">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center font-bold text-white">
            {clubProfile.name.charAt(0)}
          </div>
          <h1 className="text-xl font-bold">{clubProfile.name}</h1>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-1 p-4">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveSection(item.name)}
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
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 cursor-pointer">
            <div className="flex items-center gap-3">
              <img src={clubProfile.headImage} alt="Club Head" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-sm text-white">{clubProfile.headName}</p>
                <p className="text-xs text-slate-400">Club Head</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-black">
        <div className="max-w-screen-2xl mx-auto">
          {renderSection()}
          {renderModals()} {/* <--- Add this here so modal is visible in all sections! */}
        </div>
      </main>
    </div>
  );
};

export default DashboardClub;
