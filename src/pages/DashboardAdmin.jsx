import { useState } from "react";
import { toast } from 'react-hot-toast';
import createApiClient from '../utils/api';
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Calendar,
  CreditCard,
  Mail,
  Search,
  Filter,
  Download,
  Plus,
  Image,
  Edit2,
  Trash2,
  Eye,
  ChevronDown,
  X, // Already imported
  Check, // Already imported
  XCircle,
  UserCheck,
  UserX,
  LogOut,
  Archive,
  CheckCircle,
  GitPullRequestDraft,
  Settings,
  TrendingUp,
} from "lucide-react";

// Modal Component moved outside of DashboardAdmin to prevent re-rendering on state change
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 pt-20">
    <div className="bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gray-900/80 backdrop-blur-lg">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const DashboardAdmin = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const navigate = useNavigate();

  // Member Management States
  const [memberFilters, setMemberFilters] = useState({
    status: 'all',
    subscription: 'all',
    city: 'all',
  });

  // Contact Management States
  const [contactFilters, setContactFilters] = useState({
    status: 'all',
    senderType: 'all',
    date: '',
  });

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@test.com",
    contactNumber: "+1 234-567-8901",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=8",
  });
  const [newClub, setNewClub] = useState({ name: "", email: "", head: "", headPhone: "" });
  const [newBlog, setNewBlog] = useState({ title: "", author: "", club: "", content: "", image: null, imagePreview: null });
  const [newEvent, setNewEvent] = useState({ name: "", club: "", date: "" });

  // Mock data - replace with API calls
 const [members, setMembers] = useState([
  {
    id: 1,
    name: "Riya Sharma",
    email: "riya@gmail.com",
    college: "MIT",
    city: "Pune",
    phone: "+91 9876543210",
    status: "Active",
    subscription: "Yearly",
    joinDate: "2025-01-15",
    avatar: "https://i.pravatar.cc/150?img=1",
    joinedClubs: ["Tech Innovators", "Art Fusion"],
    joinedEvents: ["Tech Expo 2025"],
  },
  {
    id: 2,
    name: "Arjun Mehta",
    email: "arjun@gmail.com",
    college: "PCCOE",
    city: "Pune",
    phone: "+91 9876543211",
    status: "Pending",
    subscription: "Monthly",
    joinDate: "2025-10-20",
    avatar: "https://i.pravatar.cc/150?img=2",
    joinedClubs: ["Art Fusion"],
    joinedEvents: [],
  },
  {
    id: 3,
    name: "Priya Desai",
    email: "priya@gmail.com",
    college: "VIT",
    city: "Mumbai",
    phone: "+91 9876543212",
    status: "Active",
    subscription: "6-Monthly",
    joinDate: "2025-03-10",
    avatar: "https://i.pravatar.cc/150?img=3",
    joinedClubs: ["Tech Innovators", "Sports Arena"],
    joinedEvents: ["Tech Expo 2025", "Cultural Fest"],
  },
  {
    id: 4,
    name: "Suresh Kumar",
    email: "suresh@gmail.com",
    college: "COEP",
    city: "Pune",
    phone: "+91 9876543213",
    status: "Suspended",
    subscription: "Yearly",
    joinDate: "2024-02-20",
    avatar: "https://i.pravatar.cc/150?img=4",
    joinedClubs: ["Sports Arena"],
    joinedEvents: ["Sports Championship"],
  },
]);


  const [clubs, setClubs] = useState([
    { 
      id: 1,
      name: "Tech Innovators",
      email: "tech@spectra.com",
      members: 120,
      events: 15,
      status: "Active",
      subscription: "Yearly",
      head: "Rohan Kumar",
      headPhone: "+91 9876511111",
      createdDate: "2024-06-10",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400",
    },
    {
      id: 2,
      name: "Art Fusion",
      email: "art@spectra.com",
      members: 80,
      events: 8,
      status: "Active",
      subscription: "Monthly",
      head: "Sneha Patil",
      headPhone: "+91 9876522222",
      createdDate: "2024-08-15",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
    },
    {
      id: 3,
      name: "Sports Arena",
      email: "sports@spectra.com",
      members: 200,
      events: 30,
      status: "Suspended",
      subscription: "Yearly",
      head: "Vikram Singh",
      headPhone: "+91 9876533333",
      createdDate: "2024-05-20",
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
    },
    {
      id: 4,
      name: "Literary Circle",
      email: "lit@spectra.com",
      members: 45,
      events: 5,
      status: "Pending",
      subscription: "Monthly",
      head: "Anjali Rao",
      headPhone: "+91 9876544444",
      createdDate: "2025-10-25",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
    },
  ]);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Future of AI in Education",
      image: "https://images.unsplash.com/photo-1581092580498-80b5ab1d6d3b?w=800&auto=format&fit=crop&q=80",
      author: "Admin",
      club: "Tech Innovators",
      date: "2025-10-20",
      views: 1250,
      likes: 89,
      status: "Published",
      category: "Technology",
      content: "This is a full blog content for Future of AI...",
    },
    {
      id: 2,
      title: "How Clubs Empower Students",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
      author: "Rohan Kumar",
      club: "Tech Innovators",
      date: "2025-10-25",
      views: 890,
      likes: 67,
      status: "Published",
      category: "Community",
      content: "This is the full blog writing...",
    },
    {
      id: 3,
      title: "Art Therapy Benefits",
      image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=800&auto=format&fit=crop&q=80",
      author: "Sneha Patil",
      club: "Art Fusion",
      date: "2025-10-28",
      views: 450,
      likes: 34,
      status: "Draft",
      category: "Art",
      content: "Art therapy has various benefits...",
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
    // Add mock registrations to an event
    // events[0].registeredMembers = [members[0], members[2]];
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

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Neha Patil",
      email: "neha@gmail.com",
      phone: "+91 98765 55555",
      subject: "Event Inquiry",
      message: "I want to know more details about the upcoming tech events. Are there any prerequisites for the workshops?",
      date: "2025-10-28",
      status: "Pending",
      senderType: "Member",
    },
    {
      id: 2,
      name: "Rohit Jain",
      email: "rohit@gmail.com",
      phone: "+91 98765 66666",
      subject: "Club Registration Issue",
      message: "How can I register my new club?",
      date: "2025-10-27",
      status: "Resolved",
      senderType: "Club",
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
    { name: "Member Management", icon: Users },
    { name: "Club Management", icon: Building2 },
    { name: "Blogs", icon: FileText },
    { name: "Events", icon: Calendar },
    { name: "Contacts", icon: Mail },
    { name: "Profile", icon: Settings },
    { name: "Logout", icon: LogOut },
  ];

  const handleCreateClub = () => {
    if (!newClub.name || !newClub.email) return;
    
    const club = {
      id: Date.now(),
      ...newClub,
      members: 0,
      events: 0,
      status: "Pending",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400",
    };
    
    // try to persist via API (fallback to local state if not available)
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const api = createApiClient(token);
        if (api.admin && typeof api.admin.createClub === 'function') {
          const resp = await api.admin.createClub({ name: club.name, email: club.email, head: club.head, headPhone: club.headPhone });
          if (resp && resp.success && resp.data) {
            setClubs(prev => [resp.data, ...prev]);
            toast.success('Club created');
            setShowModal(false);
            setNewClub({ name: '', email: '', head: '', headPhone: '' });
            return;
          }
        }
      } catch (e) {
        // ignore and fallback to local
      }

      setClubs([...clubs, club]);
      setShowModal(false);
      setNewClub({ name: "", email: "", head: "", headPhone: "" });
    })();
    setShowModal(false);
    setNewClub({ name: "", email: "", head: "", headPhone: "" });
  };

  const handleCreateBlog = async () => {
    if (!newBlog.title) return;
    try {
      const token = localStorage.getItem('token');
      const api = createApiClient(token);

      // prepare form data
      const formData = new FormData();
      formData.append('title', newBlog.title);
      formData.append('content', newBlog.content);
      formData.append('authorName', newBlog.author || 'Admin');
      formData.append('club', newBlog.club || '');
      if (newBlog.image) formData.append('image', newBlog.image);

      const resp = await api.admin.createBlog(formData);
      if (resp && resp.success) {
        setBlogs([resp.data, ...blogs]);
        toast.success('Blog created');
      } else {
        toast.success('Blog created locally');
        setBlogs([
          ...blogs,
          {
            id: Date.now(),
            title: newBlog.title,
            author: newBlog.author,
            content: newBlog.content,
            club: newBlog.club,
            image: newBlog.imagePreview || null,
            date: new Date().toISOString().split("T")[0],
            views: 0,
            likes: 0,
            status: "Draft",
            category: "New",
          },
        ]);
      }

      setShowModal(false);
      setNewBlog({ title: "", author: "", club: "", content: "", image: null, imagePreview: null });
    } catch (e) {
      toast.error(e.message || 'Failed to create blog');
    }
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

  // ARCHIVE / UNARCHIVE BLOG
  const handleArchiveBlog = (id) => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const api = createApiClient(token);
        // Try to toggle status via API
        const blogToToggle = blogs.find(b => b.id === id || b._id === id);
        // Toggle between clearly capitalized statuses used by the UI and backend: 'Published' <-> 'Draft'
        const newStatus = (blogToToggle?.status || '').toLowerCase() === 'published' ? 'Draft' : 'Published';
        const payload = { status: newStatus };
        const resp = await api.admin.updateBlog(blogToToggle?._id || blogToToggle?.id, payload);
          if (resp && resp.success) {
          setBlogs(prev => prev.map(blog => (blog.id === id || blog._id === id ? resp.data : blog)));
        } else {
          // fallback local toggle
          setBlogs(prev => prev.map(blog => (blog.id === id ? { ...blog, status: (blog.status === "Published" ? "Draft" : "Published") } : blog)));
        }
      } catch (e) {
        setBlogs(prev => prev.map(blog => (blog.id === id ? { ...blog, status: (blog.status === "Published" ? "Draft" : "Published") } : blog)));
      }
    })();
  };
  
  // DELETE BLOG
  const handleDeleteBlog = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const api = createApiClient(token);
      const resp = await api.admin.deleteBlog(id);
      if (resp && resp.success) {
        setBlogs(prev => prev.filter(blog => blog.id !== id && blog._id !== id));
        toast.success('Blog deleted');
      } else {
        // fallback to client-side removal
        setBlogs(prev => prev.filter(blog => blog.id !== id));
      }
    } catch (e) {
      // if API fails, just remove locally so UI still works
      setBlogs(prev => prev.filter(blog => blog.id !== id));
      toast.success('Blog removed locally');
    } finally {
      setShowModal(false);
    }
  };

  const handleMemberStatusChange = async (memberId, newStatus) => {
    // update locally first for snappy UI, then try to persist
    setMembers(prev => prev.map(m => (m.id === memberId ? { ...m, status: newStatus } : m)));
    try {
      const token = localStorage.getItem('token');
      const api = createApiClient(token);
      if (api.admin && typeof api.admin.updateMemberStatus === 'function') {
        const resp = await api.admin.updateMemberStatus(memberId, newStatus);
        if (resp && resp.success) {
          toast.success('Member status updated');
        }
      }
    } catch (e) {
      console.warn('Failed to persist member status', e?.message || e);
      toast.error('Failed to persist member status to server');
    }
  };

  const handleClubStatusChange = async (clubId, newStatus) => {
    setClubs(prev => prev.map(c => (c.id === clubId ? { ...c, status: newStatus } : c)));
    try {
      const token = localStorage.getItem('token');
      const api = createApiClient(token);
      if (api.admin && typeof api.admin.updateClubStatus === 'function') {
        const resp = await api.admin.updateClubStatus(clubId, newStatus);
        if (resp && resp.success) {
          toast.success('Club status updated');
        }
      }
    } catch (e) {
      console.warn('Failed to persist club status', e?.message || e);
      toast.error('Failed to persist club status to server');
    }
  };

  const handleContactStatusChange = (contactId, newStatus) => {
    setContacts(contacts.map(c => (c.id === contactId ? { ...c, status: newStatus } : c)));
  };

  const handleDelete = (item) => {
    if (item.college) { // If it's a member
      setMembers(members.filter(m => m.id !== item.id));
    } else { // Assume club
      setClubs(clubs.filter(c => c.id !== item.id));
    }
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

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
          { label: "Total Members", value: members.length, change: "+12%", icon: Users, color: "blue" },
          { label: "Total Clubs", value: clubs.length, change: "+5%", icon: Building2, color: "green" },
          { label: "Active Events", value: events.filter(e => e.status === 'Upcoming').length, change: "+8%", icon: Calendar, color: "purple" },
          { label: "Published Blogs", value: blogs.filter(b => b.status === 'Published').length, change: "+15%", icon: FileText, color: "orange" },
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
  const renderMembers = () => {
    // Filter members based on search and filters
    let filteredMembers = members.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           m.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = memberFilters.status === 'all' || m.status.toLowerCase() === memberFilters.status;
      const matchesSubscription = memberFilters.subscription === 'all' || m.subscription.toLowerCase().includes(memberFilters.subscription);
      const matchesCity = memberFilters.city === 'all' || m.city === memberFilters.city;
      return matchesSearch && matchesStatus && matchesSubscription && matchesCity;
    });

    // Group members by city
    const membersByCity = filteredMembers.reduce((acc, member) => {
      const city = member.city;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(member);
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-white">Member Management</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {filterOpen && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
            <select
              value={memberFilters.status}
              onChange={(e) => setMemberFilters({...memberFilters, status: e.target.value})}
              className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={memberFilters.subscription}
              onChange={(e) => setMemberFilters({...memberFilters, subscription: e.target.value})}
              className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg"
            >
              <option value="all">All Plans</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
           <select
  value={memberFilters.city}
  onChange={(e) => setMemberFilters({ ...memberFilters, city: e.target.value })}
  className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg"
>
  <option value="all">All Cities</option>
  {[...new Set(members.map(m => m.city))].map(city => (
    <option key={city} value={city}>{city}</option>
  ))}
</select>
          </div>
        )}

        {/* Display members grouped by city */}
        {Object.entries(membersByCity).map(([city, cityMembers]) => (
          <div key={city} className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-violet-400" />
              <h3 className="text-xl font-bold text-white">{city}</h3>
              <span className="px-3 py-1 bg-violet-600/20 text-violet-300 rounded-full text-sm font-semibold">
                {cityMembers.length} {cityMembers.length === 1 ? 'member' : 'members'}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityMembers.map((member) => (
                <div key={member.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.college}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-xs">{member.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-xs">{member.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        member.status === "Active" ? "bg-green-500/20 text-green-300" :
                        member.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" :
                        "bg-red-500/20 text-red-300"
                      }`}>{member.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedItem(member); setModalType("viewMember"); setShowModal(true); }} 
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600/50 text-white rounded-lg hover:bg-violet-600"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button 
                      onClick={() => { setSelectedItem(member); setModalType("confirmDelete"); setShowModal(true); }} 
                      className="p-2 bg-red-600/50 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(membersByCity).length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No members found</p>
          </div>
        )}
      </div>
    );
  };

  // ======================== CLUBS SECTION ========================
  const renderClubs = () => {
    return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">Clubs & Communities</h2>
        <button
          onClick={() => {
            setModalType("createClub");
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Create Club
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <img src={club.img} alt={club.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white mb-2">{club.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    club.status === "Active" ? "bg-green-500/20 text-green-300" : 
                    club.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" :
                    "bg-red-500/20 text-red-300"
                  }`}>
                    {club.status}
                  </span>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Members:</span>
                  <span className="font-semibold">{club.members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span>{club.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Events:</span>
                  <span className="font-semibold">{club.events}</span>
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
                {club.status === 'Pending' && (
                  <button 
                    onClick={() => handleClubStatusChange(club.id, 'Active')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600/50 text-white rounded-lg hover:bg-green-600"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedItem(club);
                    setModalType("confirmDelete");
                    setShowModal(true);
                  }}
                  className="p-2 bg-red-600/50 text-white rounded-lg hover:bg-red-600"
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
  };
  
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
                            <div className="flex items-center gap-3">
                              {(() => {
                                const src = typeof blog.image === 'string' ? blog.image : (blog.image?.url || blog.imagePreview);
                                return src ? (<img src={src} alt={blog.title} className="w-12 h-8 object-cover rounded" />) : null;
                              })()}
                              <div>
                                <p className="font-semibold text-white">{blog.title}</p>
                                <p className="text-sm text-gray-400">{blog.category}</p>
                              </div>
                            </div>
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
                {blog.status === "Published" ? (
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300">
                    <CheckCircle className="w-4 h-4" />
                    {blog.status}
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-300">
                    <GitPullRequestDraft className="w-4 h-4" />
                    {blog.status}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedItem(blog);
                      setModalType("viewBlog");
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-400 hover:bg-white/10 rounded"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setItemToEdit(blog);
                      setModalType("editBlog");
                      setShowModal(true);
                    }}
                    className="p-2 text-yellow-400 hover:bg-white/10 rounded"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleArchiveBlog(blog.id)}
                    className="p-2 text-gray-400 hover:bg-white/10 rounded"
                    title="Archive"
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedItem(blog);
                      setModalType("deleteBlog");
                      setShowModal(true);
                    }}
                    className="p-2 text-red-400 hover:bg-white/10 rounded"
                    title="Delete"
                  >
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
  const renderContacts = () => {
    const filteredContacts = contacts.filter(c => {
      const statusMatch = contactFilters.status === 'all' || c.status.toLowerCase() === contactFilters.status;
      const typeMatch = contactFilters.senderType === 'all' || c.senderType.toLowerCase() === contactFilters.senderType;
      const dateMatch = !contactFilters.date || c.date === contactFilters.date;
      return statusMatch && typeMatch && dateMatch;
    });

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Contact Form Requests</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
          <select
            value={contactFilters.status}
            onChange={(e) => setContactFilters({ ...contactFilters, status: e.target.value })}
            className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={contactFilters.senderType}
            onChange={(e) => setContactFilters({ ...contactFilters, senderType: e.target.value })}
            className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg"
          >
            <option value="all">All Sender Types</option>
            <option value="member">Member</option>
            <option value="club">Club</option>
          </select>
          <input
            type="date"
            value={contactFilters.date}
            onChange={(e) => setContactFilters({ ...contactFilters, date: e.target.value })}
            className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg"
          />
        </div>

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
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-gray-400">{contact.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{contact.subject}</td>
                  <td className="px-6 py-4 text-sm">{contact.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      contact.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'
                    }`}>{contact.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => { setSelectedItem(contact); setModalType('viewContact'); setShowModal(true); }} className="p-2 text-blue-400 hover:bg-white/10 rounded"><Eye className="w-4 h-4" /></button>
                    {contact.status === 'Pending' && (
                      <button onClick={() => handleContactStatusChange(contact.id, 'Resolved')} className="p-2 text-green-400 hover:bg-white/10 rounded"><Check className="w-4 h-4" /></button>
                    )}
                    <button className="p-2 text-red-400 hover:bg-white/10 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ======================== PROFILE SECTION ========================
  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Admin Profile & Access</h2>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-2xl">
        <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = localStorage.getItem('token');
              const api = createApiClient(token);
              // build payload (use FormData if a file was chosen)
              let payload;
              if (adminProfile.avatarFile instanceof File) {
                payload = new FormData();
                payload.append('fullName', adminProfile.name || '');
                payload.append('phone', adminProfile.contactNumber || '');
                payload.append('avatar', adminProfile.avatarFile);
              } else {
                payload = {
                  fullName: adminProfile.name,
                  phone: adminProfile.contactNumber,
                  avatar: adminProfile.avatar
                };
              }
              const resp = await api.admin.updateProfile(payload);
              if (resp && resp.success && resp.data) {
                const data = resp.data;
                // normalize response into adminProfile state
                setAdminProfile(prev => ({
                  ...prev,
                  name: data.fullName || data.name || prev.name,
                  contactNumber: data.phone || prev.contactNumber,
                  avatar: data.avatar || prev.avatar,
                }));
                toast.success('Profile updated');
              }
            } catch (err) {
              toast.error(err.message || 'Failed to update profile');
            }
          }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              value={adminProfile.name}
              onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Avatar</label>
            <div className="flex items-center gap-4">
              <img src={adminProfile.avatarPreview || adminProfile.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => setAdminProfile(prev => ({ ...prev, avatarPreview: reader.result, avatarFile: file }));
                reader.readAsDataURL(file);
              }} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <input type="email" value={adminProfile.email} readOnly className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Contact Number</label>
            <input
              type="tel"
              value={adminProfile.contactNumber}
              onChange={(e) => setAdminProfile({ ...adminProfile, contactNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
            <input type="text" value={adminProfile.role} readOnly className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-400 cursor-not-allowed" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
  

  // ======================== RENDER MAIN SECTION ========================
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard": return renderDashboard(); 
      case "Member Management": return renderMembers();
      case "Club Management": return renderClubs();
      case "Blogs": return renderBlogs();
      case "Events": return renderEvents();
      case "Contacts": return renderContacts();
      case "Profile": return renderProfile();
      
      default: return <div>{activeSection}</div>;
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
                  onClick={
                    item.name === "Logout"
                      ? handleLogout
                      : () => setActiveSection(item.name)
                  }
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    activeSection === item.name
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black/20">
        <div className="max-w-screen-2xl mx-auto p-6 md:p-8">
          {renderSection()}
        </div>
      </main>

      {showModal && (
        <Modal
          title={
            modalType === "createClub" ? "Create New Club" :
            modalType === "createBlog" ? "Create New Blog" :
            modalType === "createEvent" ? "Host New Event" :
            modalType === "viewMember" ? "Member Details" :
            modalType === "editMember" ? "Edit Member" :
            modalType === "confirmDelete" ? "Confirm Deletion" :
            modalType === "viewContact" ? "Contact Message" :
            modalType === "viewBlog" ? "View Blog" :
            modalType === "editBlog" ? "Edit Blog" :
            modalType === "deleteBlog" ? "Delete Blog" : "Details"
          }
          onClose={() => setShowModal(false)}
        >
          {modalType === "createClub" && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateClub(); }} className="space-y-4 text-gray-300">
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
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Head Phone</label>
                <input type="tel" value={newClub.headPhone} onChange={(e) => setNewClub({...newClub, headPhone: e.target.value})} className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold">Create Club</button>
              </div>
            </form>
          )}
          {modalType === "createBlog" && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateBlog(); }} className="space-y-4 text-gray-300">
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
              <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Content</label>
                    <textarea value={newBlog.content} onChange={(e) => setNewBlog({...newBlog, content: e.target.value})} placeholder="Write your blog..." rows="5" className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Feature Image (optional)</label>
                    <div className="flex items-center gap-4">
                      {newBlog.imagePreview && (
                        <div className="relative">
                          <img src={newBlog.imagePreview} alt="Preview" className="w-40 h-24 object-cover rounded-lg" />
                          <button type="button" onClick={() => setNewBlog(prev => ({ ...prev, image: null, imagePreview: null }))} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {!newBlog.imagePreview && (
                        <label className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                          <Image className="w-5 h-5" />
                          <span>Upload Feature Image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files && e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => setNewBlog(prev => ({ ...prev, image: file, imagePreview: reader.result }));
                            reader.readAsDataURL(file);
                          }} />
                        </label>
                      )}
                    </div>
                  </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold">Create Blog</button>
              </div>
            </form>
          )}
          {modalType === "createEvent" && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateEvent(); }} className="space-y-4 text-gray-300">
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
          {modalType === "viewMember" && selectedItem && (
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-4">
                <img src={selectedItem.avatar} alt={selectedItem.name} className="w-20 h-20 rounded-full" />
                <div>
                  <h4 className="text-xl font-bold text-white">{selectedItem.name}</h4>
                  <p className="text-gray-400">{selectedItem.college}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div><p className="text-sm text-gray-400">Email</p><p>{selectedItem.email}</p></div>
                <div><p className="text-sm text-gray-400">Phone</p><p>{selectedItem.phone}</p></div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-400 mb-2">Joined Clubs</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.joinedClubs?.length > 0 ? selectedItem.joinedClubs.map(club => <span key={club} className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full">{club}</span>) : <p className="text-sm">No clubs joined.</p>}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-400 mb-2">Joined Events</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.joinedEvents?.length > 0 ? selectedItem.joinedEvents.map(event => <span key={event} className="bg-violet-500/20 text-violet-300 text-xs px-2 py-1 rounded-full">{event}</span>) : <p className="text-sm">No events joined.</p>}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => { setItemToEdit(selectedItem); setModalType("editMember"); }} className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold">Edit</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Close</button>
              </div>
            </div>
          )}
          {modalType === "editMember" && itemToEdit && (
             <div className="space-y-4 text-gray-300">
                <h4 className="text-lg font-bold text-white">Editing {itemToEdit.name}</h4>
                <div><label className="block text-sm font-medium text-gray-400 mb-1">Name</label><input type="text" value={itemToEdit.name} onChange={e => setItemToEdit({ ...itemToEdit, name: e.target.value })} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" /></div>
                <div><label className="block text-sm font-medium text-gray-400 mb-1">Email</label><input type="email" value={itemToEdit.email} onChange={e => setItemToEdit({ ...itemToEdit, email: e.target.value })} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" /></div>
                <div><label className="block text-sm font-medium text-gray-400 mb-1">College</label><input type="text" value={itemToEdit.college} onChange={e => setItemToEdit({ ...itemToEdit, college: e.target.value })} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                  <input 
                    type="text" 
                    value={itemToEdit.city || ""} 
                    onChange={e => setItemToEdit({ ...itemToEdit, city: e.target.value })} 
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white" 
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button onClick={() => { setModalType("viewMember"); setSelectedItem(itemToEdit); setItemToEdit(null); }} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Cancel</button>
                  <button onClick={() => { setMembers(members.map(m => m.id === itemToEdit.id ? itemToEdit : m)); setSelectedItem(itemToEdit); setModalType("viewMember"); setItemToEdit(null); }} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold">Save Changes</button>
                </div>
             </div>
          )}
          {modalType === "confirmDelete" && selectedItem && (
            <div className="text-gray-300">
              <p className="text-gray-300 my-4">Are you sure you want to delete "{selectedItem.name}"? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Cancel</button>
                <button onClick={() => handleDelete(selectedItem)} className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold">Delete</button>
              </div>
            </div>
          )}
          {modalType === "viewBlog" && selectedItem && (
  <div className="space-y-4 text-gray-300">
    <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
    <p className="text-sm text-gray-400">By {selectedItem.author}</p>
    <p className="text-sm text-gray-500">Club: {selectedItem.club}</p>
    <p className="text-sm text-gray-500">Date: {selectedItem.date}</p>

    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
      {selectedItem.content}
    </div>

    <div className="flex justify-end pt-4">
      <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 rounded-lg">
        Close
      </button>
    </div>
  </div>
)}
  {modalType === "editBlog" && itemToEdit && (
  <div className="space-y-4 text-gray-300">
    <h3 className="text-xl font-bold text-white">Edit Blog</h3>

    <div>
      <label className="text-sm text-gray-400">Title</label>
      <input
        type="text"
        value={itemToEdit.title}
        onChange={(e) => setItemToEdit({ ...itemToEdit, title: e.target.value })}
        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
      />
    </div>

    <div>
      <label className="text-sm text-gray-400">Author</label>
      <input
        type="text"
        value={itemToEdit.author}
        onChange={(e) => setItemToEdit({ ...itemToEdit, author: e.target.value })}
        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
      />
    </div>

    <div>
      <label className="text-sm text-gray-400">Content</label>
      <textarea
        value={itemToEdit.content}
        onChange={(e) => setItemToEdit({ ...itemToEdit, content: e.target.value })}
        rows="5"
        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">Replace image</label>
      <input type="file" accept="image/*" onChange={(e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onloadend = () => setItemToEdit(prev => ({ ...prev, image: f, imagePreview: reader.result }));
        reader.readAsDataURL(f);
      }} />
      {itemToEdit.imagePreview && <img src={itemToEdit.imagePreview} alt="preview" className="mt-2 w-36 h-24 object-cover rounded" />}
    </div>

    <div className="flex justify-end gap-3 pt-4">
      <button
        onClick={() => setShowModal(false)}
        className="px-4 py-2 bg-white/10 rounded-lg"
      >
        Cancel
      </button>

      <button
        onClick={async () => {
          try {
            const token = localStorage.getItem('token');
            const api = createApiClient(token);

            // prepare payload
            let payload;
            if (itemToEdit.image instanceof File) {
              payload = new FormData();
              payload.append('title', itemToEdit.title);
              payload.append('content', itemToEdit.content);
              payload.append('authorName', itemToEdit.author);
              payload.append('club', itemToEdit.club);
              payload.append('image', itemToEdit.image);
            } else {
              payload = { title: itemToEdit.title, content: itemToEdit.content, authorName: itemToEdit.author, club: itemToEdit.club };
            }

            const resp = await api.admin.updateBlog(itemToEdit.id, payload);
            if (resp && resp.success) {
              setBlogs(blogs.map(b => (b.id === itemToEdit.id ? resp.data : b)));
              toast.success('Blog updated');
            } else {
              setBlogs(blogs.map(b => (b.id === itemToEdit.id ? itemToEdit : b)));
            }
            setShowModal(false);
          } catch (e) {
            toast.error(e.message || 'Failed to update blog');
          }
        }}
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  </div>
)}
{modalType === "deleteBlog" && selectedItem && (
  <div className="text-gray-300">
    <p className="pb-4">Delete blog: <strong>{selectedItem.title}</strong>?</p>
    <div className="flex justify-end gap-3">
      <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 rounded">
        Cancel
      </button>
      <button
        onClick={() => handleDeleteBlog(selectedItem.id)}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete
      </button>
    </div>
  </div>
)}
          {(modalType === "viewClub" || modalType === "viewEvent") && (
            <div className="text-gray-300">
              <h4 className="text-lg font-semibold text-white mb-2">{selectedItem?.name}</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedItem).map(([key, value]) => (
                  key !== 'id' && key !== 'img' && (
                    <div key={key}>
                      <label className="block text-sm text-gray-400 capitalize">{key}</label>
                      <p className="font-medium">{String(value)}</p>
                    </div>
                  )
                ))}
              </div>
              <div className="flex justify-end pt-4 mt-4 border-t border-white/10">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Close</button>
              </div>
            </div>
          )}
          {modalType === "viewContact" && selectedItem && (
            <div className="space-y-4 text-gray-300">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">{selectedItem.subject}</h4>
                  <p className="text-sm text-gray-400">From: {selectedItem.name} ({selectedItem.email})</p>
                </div>
                <span className="text-xs text-gray-500">{selectedItem.date}</span>
              </div>
              <p className="p-4 bg-black/20 rounded-lg border border-white/10">{selectedItem.message}</p>
              <div className="flex justify-end pt-4 mt-4 border-t border-white/10">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-semibold">Close</button>
              </div>
            </div>
          )}
        </Modal>
      )}
      </div>
    </div>
  );
};

export default DashboardAdmin;