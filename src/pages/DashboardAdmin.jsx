import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Calendar,
  CreditCard,
  Mail,
  History,
  Search,
  Filter,
  Download,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ChevronDown,
  X,
  Check,
  BarChart3,
  TrendingUp,
  UserCheck,
  Image as ImageIcon,
  Settings,
  Archive,
  LogOut,
} from "lucide-react";

const DashboardAdmin = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const [newClub, setNewClub] = useState({ name: "", email: "", head: "" });
  const [newBlog, setNewBlog] = useState({ title: "", author: "", club: "" });
  const [newEvent, setNewEvent] = useState({ name: "", club: "", date: "" });

  // Mock data - replace with API calls
  const [members] = useState([
    {
      id: 1,
      name: "Riya Sharma",
      email: "riya@gmail.com",
      college: "MIT",
      phone: "+91 98765 43210",
      status: "Active",
      subscription: "Yearly",
      joinDate: "2025-01-15",
      clubsJoined: 3,
      eventsAttended: 12,
      photos: 45,
      idVerified: true,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Arjun Mehta",
      email: "arjun@gmail.com",
      college: "PCCOE",
      phone: "+91 98765 43211",
      status: "Pending",
      subscription: "Monthly",
      joinDate: "2025-10-20",
      clubsJoined: 1,
      eventsAttended: 2,
      photos: 8,
      idVerified: false,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Priya Desai",
      email: "priya@gmail.com",
      college: "VIT",
      phone: "+91 98765 43212",
      status: "Active",
      subscription: "6-Monthly",
      joinDate: "2025-03-10",
      clubsJoined: 5,
      eventsAttended: 20,
      photos: 78,
      idVerified: true,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ]);

  const [clubs] = useState([
    { 
      id: 1,
      name: "Tech Innovators",
      email: "tech@spectra.com",
      members: 120,
      events: 15,
      blogs: 25,
      status: "Active",
      subscription: "Yearly",
      head: "Rohan Kumar",
      headPhone: "+91 98765 11111",
      createdDate: "2024-06-10",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400",
    },
    {
      id: 2,
      name: "Art Fusion",
      email: "art@spectra.com",
      members: 80,
      events: 8,
      blogs: 12,
      status: "Active",
      subscription: "Monthly",
      head: "Sneha Patil",
      headPhone: "+91 98765 22222",
      createdDate: "2024-08-15",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
    },
    {
      id: 3,
      name: "Sports Arena",
      email: "sports@spectra.com",
      members: 200,
      events: 30,
      blogs: 18,
      status: "Active",
      subscription: "Yearly",
      head: "Vikram Singh",
      headPhone: "+91 98765 33333",
      createdDate: "2024-05-20",
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
    },
  ]);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Future of AI in Education",
      author: "Admin",
      club: "Tech Innovators",
      date: "2025-10-20",
      views: 1250,
      likes: 89,
      status: "Published",
      category: "Technology",
    },
    {
      id: 2,
      title: "How Clubs Empower Students",
      author: "Rohan Kumar",
      club: "Tech Innovators",
      date: "2025-10-25",
      views: 890,
      likes: 67,
      status: "Published",
      category: "Community",
    },
    {
      id: 3,
      title: "Art Therapy Benefits",
      author: "Sneha Patil",
      club: "Art Fusion",
      date: "2025-10-28",
      views: 450,
      likes: 34,
      status: "Draft",
      category: "Art",
    },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Expo 2025",
      club: "Tech Innovators",
      date: "2025-11-15",
      registrations: 450,
      maxCapacity: 500,
      status: "Upcoming",
      type: "Free",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    },
    {
      id: 2,
      name: "Cultural Fest",
      club: "Art Fusion",
      date: "2025-12-03",
      registrations: 320,
      maxCapacity: 400,
      status: "Upcoming",
      type: "Free",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
    },
    {
      id: 3,
      name: "Sports Championship",
      club: "Sports Arena",
      date: "2025-10-28",
      registrations: 180,
      maxCapacity: 200,
      status: "Completed",
      type: "Free",
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
    },
  ]);

  const [contacts] = useState([
    {
      id: 1,
      name: "Neha Patil",
      email: "neha@gmail.com",
      phone: "+91 98765 55555",
      subject: "Event Inquiry",
      message: "I want to know about upcoming tech events...",
      date: "2025-10-28",
      status: "Unread",
      type: "Event",
    },
    {
      id: 2,
      name: "Rohit Jain",
      email: "rohit@gmail.com",
      phone: "+91 98765 66666",
      subject: "Club Registration",
      message: "How can I register my new club?",
      date: "2025-10-27",
      status: "Read",
      type: "Club",
    },
  ]);

  const [subscriptionPrices, setSubscriptionPrices] = useState({
    member: {
      monthly: 299,
      sixMonthly: 1499,
      yearly: 2499,
    },
    club: {
      monthly: 999,
      sixMonthly: 4999,
      yearly: 8999,
    },
  });

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Members", icon: Users },
    { name: "Clubs", icon: Building2 },
    { name: "Blogs", icon: FileText },
    { name: "Events", icon: Calendar },
    { name: "Subscriptions", icon: CreditCard },
    { name: "Contacts", icon: Mail },
  ];

  const handleCreateClub = () => {
    if (!newClub.name) return;
    // In a real app, you'd post this to your API
    console.log("Creating new club:", newClub);
    // For now, we just close the modal
    setShowModal(false);
    setNewClub({ name: "", email: "", head: "" });
  };

  const handleCreateBlog = () => {
    if (!newBlog.title) return;
    setBlogs([
      ...blogs,
      {
        id: Date.now(),
        title: newBlog.title,
        author: newBlog.author,
        club: newBlog.club,
        date: new Date().toISOString().split("T")[0],
        views: 0,
        likes: 0,
        status: "Draft",
        category: "New",
      },
    ]);
    setShowModal(false);
    setNewBlog({ title: "", author: "", club: "" });
  };

  const handleCreateEvent = () => {
    if (!newEvent.name) return;
    setEvents([
      ...events,
      {
        id: Date.now(),
        name: newEvent.name,
        club: newEvent.club,
        date: newEvent.date,
        registrations: 0,
        maxCapacity: 100, // default
        status: "Upcoming",
        type: "Free",
        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
      },
    ]);
    setShowModal(false);
    setNewEvent({ name: "", club: "", date: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/landing');
  };

  // Modal Component
  const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gray-900/80 backdrop-blur-lg">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 text-gray-300">{children}</div>
      </div>
    </div>
  );

  // ======================== DASHBOARD SECTION ========================
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Platform Overview</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Members", value: "5,247", change: "+12%", icon: Users, color: "blue" },
          { label: "Total Clubs", value: "158", change: "+5%", icon: Building2, color: "green" },
          { label: "Active Events", value: "47", change: "+8%", icon: Calendar, color: "purple" },
          { label: "Published Blogs", value: "1,234", change: "+15%", icon: FileText, color: "orange" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-3 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center text-sm text-green-600 font-semibold">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
            <p className="text-4xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New member joined: Riya Sharma", time: "2 min ago", type: "member" },
              { text: "Tech Expo registrations: 450/500", time: "15 min ago", type: "event" },
              { text: "New blog published: AI in Education", time: "1 hour ago", type: "blog" },
              { text: "Club approved: Music Lovers", time: "2 hours ago", type: "club" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'member' ? 'bg-blue-400' :
                  activity.type === 'event' ? 'bg-green-400' :
                  activity.type === 'blog' ? 'bg-orange-400' : 'bg-violet-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-200">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Subscription Distribution</h3>
          <div className="space-y-4">
            {[
              { plan: "Monthly", count: 1250, percent: 24, color: "bg-blue-600" },
              { plan: "6-Monthly", count: 2100, percent: 40, color: "bg-green-600" },
              { plan: "Yearly", count: 1897, percent: 36, color: "bg-purple-600" },
            ].map((sub, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">{sub.plan}</span>
                  <span className="text-sm font-semibold text-white">{sub.count} users</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className={`bg-gradient-to-r ${sub.color.replace('bg-', 'from-').replace('-600', '-500')} to-${sub.color.replace('bg-', '')} h-2 rounded-full`} style={{ width: `${sub.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ======================== MEMBERS SECTION ========================
  const renderMembers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">Manage Members</h2>
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
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-white/10 bg-gray-800 text-white"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-gray-800 text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="active">Active First</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Member Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-20" />
            <div className="px-6 pb-6">
              <div className="flex items-start -mt-10">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full border-4 border-gray-800 shadow-lg"
                />
                <div className="ml-auto mt-12">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    member.status === "Active" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.college}</p>
                
                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  <div className="flex items-center justify-between">
                    <span>Email:</span>
                    <span className="font-medium">{member.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Subscription:</span>
                    <span className="font-medium">{member.subscription}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ID Verified:</span>
                    {member.idVerified ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-black/20 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Clubs</p>
                    <p className="text-lg font-bold text-violet-400">{member.clubsJoined}</p>
                  </div>
                  <div className="bg-black/20 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Events</p>
                    <p className="text-lg font-bold text-violet-400">{member.eventsAttended}</p>
                  </div>
                  <div className="bg-black/20 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Photos</p>
                    <p className="text-lg font-bold text-violet-400">{member.photos}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedItem(member);
                      setModalType("viewMember");
                      setShowModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600/50 text-white rounded-lg hover:bg-violet-600"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/50 text-white rounded-lg hover:bg-red-600">
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ======================== CLUBS SECTION ========================
  const renderClubs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">Clubs & Communities</h2>
        <button
          onClick={() => {
            setModalType("createClub");
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Create Club
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
            <img src={club.img} alt={club.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{club.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{club.email}</p>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Members:</span>
                  <span className="font-semibold">{club.members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Events:</span>
                  <span className="font-semibold">{club.events}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Blogs:</span>
                  <span className="font-semibold">{club.blogs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subscription:</span>
                  <span className="font-semibold">{club.subscription}</span>
                </div>
              </div>

              <div className="bg-black/20 p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-400 mb-1">Club Head</p>
                <p className="text-sm font-semibold">{club.head}</p>
                <p className="text-xs text-gray-500">{club.headPhone}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedItem(club);
                    setModalType("viewClub");
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600/50 text-white rounded-lg hover:bg-violet-600"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/50 text-white rounded-lg hover:bg-red-600">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ======================== BLOGS SECTION ========================
  const renderBlogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">Blogs Management</h2>
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

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Club</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{blog.title}</p>
                  <p className="text-sm text-gray-400">{blog.category}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{blog.author}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{blog.club}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{blog.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400 flex items-center gap-1"><Eye className="w-4 h-4"/> {blog.views}</span>
                    <span className="text-gray-400 flex items-center gap-1">❤️ {blog.likes}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    blog.status === "Published" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                  }`}>
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-400 hover:bg-white/10 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-yellow-400 hover:bg-white/10 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:bg-white/10 rounded">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:bg-white/10 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ======================== EVENTS SECTION ========================
  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">Events Management</h2>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="relative">
              <img src={event.img} alt={event.name} className="w-full h-48 object-cover" />
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                event.status === "Upcoming" ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"
              }`}>
                {event.status}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{event.club}</p>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold">{event.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Registrations:</span>
                  <span className="font-semibold">{event.registrations} / {event.maxCapacity}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedItem(event);
                    setModalType("viewEvent");
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600/50 text-white rounded-lg hover:bg-violet-600"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/50 text-white rounded-lg hover:bg-red-600">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ======================== CONTACTS SECTION ========================
  const renderContacts = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-gray-400">{contact.email}</p>
                </td>
                <td className="px-6 py-4 text-sm">{contact.subject}</td>
                <td className="px-6 py-4 text-sm">{contact.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    contact.status === 'Unread' ? 'bg-red-500/20 text-red-300' : 'bg-gray-500/20 text-gray-300'
                  }`}>{contact.status}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-blue-400 hover:bg-white/10 rounded"><Eye className="w-4 h-4" /></button>
                  <button className="p-2 text-red-400 hover:bg-white/10 rounded"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ======================== SUBSCRIPTIONS SECTION ========================
  const renderSubscriptions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Subscription Prices</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Member Subscriptions */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Member Plans</h3>
          <div className="space-y-4">
            {Object.entries(subscriptionPrices.member).map(([plan, price]) => (
              <div key={plan} className="flex items-center justify-between">
                <span className="capitalize">{plan}</span>
                <input type="number" value={price} className="w-24 text-right border-b-2 border-gray-700 bg-transparent focus:outline-none focus:border-violet-600" />
              </div>
            ))}
          </div>
        </div>
        {/* Club Subscriptions */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Club Plans</h3>
          <div className="space-y-4">
            {Object.entries(subscriptionPrices.club).map(([plan, price]) => (
              <div key={plan} className="flex items-center justify-between">
                <span className="capitalize">{plan}</span>
                <input type="number" value={price} className="w-24 text-right border-b-2 border-gray-700 bg-transparent focus:outline-none focus:border-violet-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-right">
        <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:scale-105 transition-transform">Save Prices</button>
      </div>
    </div>
  );

  // ======================== RENDER MAIN SECTION ========================
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard": return renderDashboard();
      case "Members": return renderMembers();
      case "Clubs": return renderClubs();
      case "Blogs": return renderBlogs();
      case "Events": return renderEvents();
      case "Contacts": return renderContacts();
      case "Subscriptions": return renderSubscriptions();
      default: return <div>{activeSection}</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-slate-200 flex flex-col shadow-2xl border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-lg">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Spectra Admin</h1>
            </div>
          </div>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-1 p-3">
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
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
            <LogOut className="w-5 h-5 text-slate-400" />
            <span className="font-medium text-slate-400 hover:text-white">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black">
        <div className="max-w-screen-2xl mx-auto p-6 md:p-8">
          {renderSection()}
        </div>
      </main>

      {showModal && (
        <Modal
          title={
            modalType === "viewMember" ? "Member Details" :
            modalType === "viewClub" ? "Club Details" :
            modalType === "createClub" ? "Create New Club" :
            modalType === "createBlog" ? "Create New Blog" :
            modalType === "createEvent" ? "Host New Event" : "Details"
          }
          onClose={() => setShowModal(false)}
        >
          {modalType === "createClub" && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateClub(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Club Name</label>
                <input type="text" value={newClub.name} onChange={(e) => setNewClub({...newClub, name: e.target.value})} placeholder="Enter club name" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Club Email</label>
                <input type="email" value={newClub.email} onChange={(e) => setNewClub({...newClub, email: e.target.value})} placeholder="Enter club email" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Club Head Name</label>
                <input type="text" value={newClub.head} onChange={(e) => setNewClub({...newClub, head: e.target.value})} placeholder="Enter head's name" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold">Create Club</button>
              </div>
            </form>
          )}
          {modalType === "createBlog" && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateBlog(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Blog Title</label>
                <input type="text" value={newBlog.title} onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} placeholder="Enter blog title" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Author</label>
                <input type="text" value={newBlog.author} onChange={(e) => setNewBlog({...newBlog, author: e.target.value})} placeholder="Enter author name" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Club</label>
                <input type="text" value={newBlog.club} onChange={(e) => setNewBlog({...newBlog, club: e.target.value})} placeholder="Enter associated club" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold">Create Blog</button>
              </div>
            </form>
          )}
          {modalType === "createEvent" && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateEvent(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Name</label>
                <input type="text" value={newEvent.name} onChange={(e) => setNewEvent({...newEvent, name: e.target.value})} placeholder="Enter event name" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Hosting Club</label>
                <input type="text" value={newEvent.club} onChange={(e) => setNewEvent({...newEvent, club: e.target.value})} placeholder="Enter hosting club" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Date</label>
                <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold">Host Event</button>
              </div>
            </form>
          )}
          {(modalType === "viewMember" || modalType === "viewClub" || modalType === "viewEvent") && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">{selectedItem?.name}</h4>
              <pre className="text-xs bg-black/20 p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
              <div className="flex justify-end pt-4">
                 <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Close</button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default DashboardAdmin;