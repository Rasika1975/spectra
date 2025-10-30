import { useState } from "react";
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
} from "lucide-react";

const DashboardClub = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

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
    { name: "Media", icon: ImageIcon },
    { name: "Subscription", icon: CreditCard },
    { name: "Contact", icon: Mail },
    { name: "Analytics", icon: BarChart3 },
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

  // ======================== DASHBOARD SECTION ========================
  const renderDashboard = () => {
    const pendingMembers = members.filter((m) => m.status === "Pending").length;
    const activeMembers = members.filter((m) => m.status === "Active").length;
    const upcomingEvents = events.filter((e) => e.status === "Upcoming").length;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back! 👋</h2>
            <p className="text-gray-600 mt-1">Here's what's happening with your club today</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Bell className="w-4 h-4" />
            Notifications
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
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Create Blog", icon: FileText, action: () => setActiveSection("Blogs") },
              { label: "Host Event", icon: Calendar, action: () => setActiveSection("Events") },
              { label: "Upload Photos", icon: ImageIcon, action: () => setActiveSection("Media") },
              { label: "View Members", icon: Users, action: () => setActiveSection("Members") },
            ].map((action, i) => (
              <button
                key={i}
                onClick={action.action}
                className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 hover:shadow-md transition-all"
              >
                <action.icon className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-semibold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New member request: Riya Sharma", time: "5 min ago" },
              { text: "Tech Expo 2025: 145 registrations", time: "1 hour ago" },
              { text: "Blog published: Future of AI", time: "2 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.text}</p>
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
      <h2 className="text-2xl font-bold text-gray-800">Club Profile</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Club Image */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md">
          <img
            src={clubProfile.image}
            alt="Club"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Upload className="w-4 h-4" />
            Change Image
          </button>
        </div>

        {/* Club Details */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
            <input
              type="text"
              value={clubProfile.name}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={clubProfile.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About Club</label>
            <textarea
              rows="4"
              value={clubProfile.about}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Club Head Details */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">Club Head Details</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <img
              src={clubProfile.headImage}
              alt="Head"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <Upload className="w-4 h-4" />
              Update
            </button>
          </div>
          <div className="md:col-span-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={clubProfile.headName}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={clubProfile.headEmail}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={clubProfile.headPhone}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">Social Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(clubProfile.links).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {platform}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
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
          <h2 className="text-2xl font-bold text-gray-800">Member Management</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-yellow-800 font-semibold">
            ⚠️ You have {members.filter((m) => m.status === "Pending").length} pending member
            approval(s)
          </p>
        </div>

        {/* Member Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
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
                      <h3 className="font-bold text-gray-800">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.college}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : member.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{member.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Joined:</span>
                    <span className="font-medium">{member.joinedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Events:</span>
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
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
        <h2 className="text-2xl font-bold text-gray-800">Club Blogs</h2>
        <button
          onClick={() => {
            setModalType("createBlog");
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          Create Blog
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{blog.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{blog.date}</span>
                <div className="flex items-center gap-3">
                  <span>👁️ {blog.views}</span>
                  <span>❤️ {blog.likes}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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

      {/* Create Blog Form in Modal */}
      {showModal && modalType === "createBlog" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold">Create New Blog</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows="8"
                  placeholder="Write your blog content..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Publish Blog
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ======================== EVENTS SECTION ========================
  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Event Management</h2>
        <button
          onClick={() => {
            setModalType("createEvent");
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          Host Event
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="relative">
              <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === "Upcoming"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {event.status}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{event.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">{event.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Registrations:</span>
                  <span className="font-semibold">
                    {event.registrations} / {event.maxCapacity}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
      case "Media":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Media & Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <img
                  key={i}
                  src={`https://source.unsplash.com/random/400x400?team,club,${i}`}
                  alt="Club Media"
                  className="rounded-lg shadow-sm hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        );

      /** 💳 Subscription Section */
      case "Subscription": return <SubscriptionSection />;

      /** 📩 Contact Section */
      case "Contact":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact & Support</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Club Email</label>
                <input
                  type="email"
                  placeholder="Enter your club email"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your query"
                ></textarea>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Submit
              </button>
            </form>
          </div>
        );

      default:
        return <div>Dashboard</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Club Panel</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-1 p-4">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    activeSection === item.name
                      ? "bg-purple-600 text-white shadow-lg"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-screen-2xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default DashboardClub;
