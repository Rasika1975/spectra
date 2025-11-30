import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { createApiClient } from '../utils/api';
import { API_BASE_URL } from '../config/api';
import memberApi from '../services/memberApi';
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
 const [members, setMembers] = useState([]);


  const [clubs, setClubs] = useState([]);

  const [blogs, setBlogs] = useState([]);

  const [events, setEvents] = useState([]);

  const [contacts, setContacts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [fetchDebug, setFetchDebug] = useState({ lastPath: null, lastStatus: null, details: null });

  const fetchAllData = async () => {
    setLoadingData(true);
    setFetchError(null);

    const token = localStorage.getItem('token');

    // If no admin token, try development-only unauthenticated endpoints
    async function tryDevFallback() {
      console.debug('[AdminDebug] tryDevFallback: attempting unauthenticated dev endpoints');
      try {
        // members
        const mRespRaw = await fetch(`${API_BASE_URL}/admin/dev/members`);
        if (mRespRaw.ok) {
          const mResp = await mRespRaw.json();
          if (mResp && mResp.success && Array.isArray(mResp.data)) {
            setMembers(mResp.data.map(m => ({
              ...m,
              id: m._id || m.id,
              name: m.fullName || m.name || m.email,
              college: m.college || m.collegeName || '',
              avatar: m.avatar || m.profileImg || m.photo || '',
              status: m.status ? String(m.status).charAt(0).toUpperCase() + String(m.status).slice(1) : (m.emailVerified ? 'Active' : 'Pending')
            })));
          }
        }

        // clubs
        const cRespRaw = await fetch(`${API_BASE_URL}/admin/dev/clubs`);
        if (cRespRaw.ok) {
          const cResp = await cRespRaw.json();
          if (cResp && cResp.success && Array.isArray(cResp.data)) {
            setClubs(cResp.data.map(c => ({
              ...c,
              id: c._id || c.id,
              name: c.name || c.fullName || c.clubName || '',
              img: c.img || c.image || c.banner || '',
              head: (c.clubHead && (c.clubHead.name || c.clubHead.fullName)) || c.head || '',
              headPhone: (c.clubHead && (c.clubHead.phone || c.clubHead.headPhone)) || c.headPhone || '',
              members: c.memberCount ?? (Array.isArray(c.members) ? c.members.length : c.members),
              events: c.eventCount ?? (Array.isArray(c.events) ? c.events.length : c.events),
              status: c.status ? String(c.status).charAt(0).toUpperCase() + String(c.status).slice(1) : ''
            })));
          }
        }

        // events
        const eRespRaw = await fetch(`${API_BASE_URL}/admin/dev/events`);
        if (eRespRaw.ok) {
          const eResp = await eRespRaw.json();
          if (eResp && eResp.success && Array.isArray(eResp.data)) {
            setEvents(eResp.data.map(ev => ({
              ...ev,
              id: ev._id || ev.id,
              name: ev.title || ev.name || '',
              status: ev.status || '',
              registrations: ev.registrationsCount ?? (Array.isArray(ev.registrations) ? ev.registrations.length : 0)
            })));
          }
        }

        // blogs
        const bRespRaw = await fetch(`${API_BASE_URL}/admin/dev/blogs`);
        if (bRespRaw.ok) {
          const bResp = await bRespRaw.json();
          if (bResp && bResp.success && Array.isArray(bResp.data)) {
            setBlogs(bResp.data.map(b => ({
              ...b,
              id: b._id || b.id,
              title: b.title,
              status: b.status || '',
              image: (b.image && (b.image.url || b.image)) || b.imagePreview || null,
            })));
            setFetchDebug({ lastPath: '/api/admin/blogs', lastStatus: 'ok', details: `blogs:${bResp.data.length}` });
          }
        }

        // contacts
        const conRespRaw = await fetch(`${API_BASE_URL}/admin/dev/contacts`);
        if (conRespRaw.ok) {
          const conResp = await conRespRaw.json();
          if (conResp && conResp.success && Array.isArray(conResp.data)) {
            setContacts(conResp.data.map(c => ({
              ...c,
              id: c._id || c.id,
              sender: c.senderId?.fullName || c.senderName || c.name || '',
              email: c.senderId?.email || c.email || '',
            })));
          }
        }

        setFetchError(null);
        return true;
      } catch (e) {
        // ignore dev fallback errors
        return false;
      }
    }

    // When developing locally, prefer the unauthenticated dev endpoints first so UI shows DB content immediately
    const isDevClient = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
    if (isDevClient) {
      try {
        const ok = await tryDevFallback();
        setFetchDebug(prev => ({ ...prev, lastPath: 'dev-init', lastStatus: ok ? 'ok' : 'no-data' }));
      } catch (e) {
        console.warn('[AdminDebug] dev-init fetch failed', e?.message || e);
      }
    }

    if (!token) {
      const ok = await tryDevFallback();
      if (!ok) {
        setFetchError('auth');
        toast.error('Admin not authenticated — please sign in as admin to view real data');
      }
      setLoadingData(false);
      return;
    }

    // No early dev-init here; we'll fall back per-collection below if authenticated fetch returns nothing.

    const api = createApiClient(token);
    let foundAny = false;
    try {
      let membersRespSuccess = false;
      let clubsRespSuccess = false;
      let eventsRespSuccess = false;
      let blogsRespSuccess = false;
      let contactsRespSuccess = false;
      // Members
      if (api.admin && typeof api.admin.getAllMembers === 'function') {
        const resp = await api.admin.getAllMembers();
        if (resp && resp.success && Array.isArray(resp.data)) {
          // Keep the full member object and normalize a couple of fields the UI expects
          setMembers(resp.data.map(m => ({
            ...m,
            id: m._id || m.id,
            name: m.fullName || m.name || m.email,
            college: m.college || m.collegeName || m.collegeName || '',
            avatar: m.avatar || m.profileImg || m.photo || '',
            status: m.status ? String(m.status).charAt(0).toUpperCase() + String(m.status).slice(1) : (m.emailVerified ? 'Active' : 'Pending')
          }))); 
          setFetchDebug({ lastPath: '/api/admin/members', lastStatus: 'ok', details: `members:${resp.data.length}` });
          foundAny = true;
          membersRespSuccess = true;
        } else if (resp) {
          setFetchDebug({ lastPath: '/api/admin/members', lastStatus: 'error', details: JSON.stringify(resp).slice(0,200) });
        }
      }

      // Clubs
      if (api.admin && typeof api.admin.getAllClubs === 'function') {
        const resp = await api.admin.getAllClubs();
        if (resp && resp.success && Array.isArray(resp.data)) {
          // Preserve club properties and normalize names used by the UI
          setClubs(resp.data.map(c => ({
            ...c,
            id: c._id || c.id,
            name: c.name || c.fullName || c.clubName || '',
            img: c.img || c.image || c.banner || '',
            head: (c.clubHead && (c.clubHead.name || c.clubHead.fullName)) || c.head || '',
            headPhone: (c.clubHead && (c.clubHead.phone || c.clubHead.headPhone)) || c.headPhone || '',
            members: c.memberCount ?? (Array.isArray(c.members) ? c.members.length : c.members),
            events: c.eventCount ?? (Array.isArray(c.events) ? c.events.length : c.events),
            status: c.status ? String(c.status).charAt(0).toUpperCase() + String(c.status).slice(1) : ''
          })));
          setFetchDebug({ lastPath: '/api/admin/clubs', lastStatus: 'ok', details: `clubs:${resp.data.length}` });
          foundAny = true;
          clubsRespSuccess = true;
        } else if (resp) {
          setFetchDebug({ lastPath: '/api/admin/clubs', lastStatus: 'error', details: JSON.stringify(resp).slice(0,200) });
        }
      }

      // Events (admin)
      try {
        if (api.admin && typeof api.admin.getAllEvents === 'function') {
          const evResp = await api.admin.getAllEvents();
            if (evResp && evResp.success && Array.isArray(evResp.data)) {
            setEvents(evResp.data.map(ev => ({
              ...ev,
              id: ev._id || ev.id,
              name: ev.title || ev.name || '',
              status: ev.status || '',
              registrations: ev.registrationsCount ?? (Array.isArray(ev.registrations) ? ev.registrations.length : 0)
            })));
            setFetchDebug({ lastPath: '/api/admin/events', lastStatus: 'ok', details: `events:${evResp.data.length}` });
            foundAny = true;
            eventsRespSuccess = true;
            } else if (evResp) {
              setFetchDebug({ lastPath: '/api/admin/events', lastStatus: 'error', details: JSON.stringify(evResp).slice(0,200) });
          }
        }
      } catch (e) {
        console.warn('Failed to fetch admin events for dashboard', e.message || e);
      }

      // Blogs (admin) - list all blogs
      try {
        if (api.admin && typeof api.admin.getAllBlogs === 'function') {
          const bResp = await api.admin.getAllBlogs();
            if (bResp && bResp.success && Array.isArray(bResp.data)) {
            setBlogs(bResp.data.map(b => ({
              ...b,
              id: b._id || b.id,
              title: b.title,
              status: b.status || '',
              image: (b.image && (b.image.url || b.image)) || b.imagePreview || null,
            })));
            foundAny = true;
            blogsRespSuccess = true;
            } else if (bResp) {
              setFetchDebug({ lastPath: '/api/admin/blogs', lastStatus: 'error', details: JSON.stringify(bResp).slice(0,200) });
          }
        }

      // Contacts (admin)
      try {
        if (api.admin && typeof api.admin.getContactSubmissions === 'function') {
          const contactResp = await api.admin.getContactSubmissions({});
          if (contactResp && contactResp.success && Array.isArray(contactResp.data)) {
            setContacts(contactResp.data.map(c => ({
              ...c,
              id: c._id || c.id,
              sender: c.senderId?.fullName || c.senderName || c.name || '',
              email: c.senderId?.email || c.email || '',
            })));
            setFetchDebug({ lastPath: '/api/admin/contacts', lastStatus: 'ok', details: `contacts:${contactResp.data.length}` });
            contactsRespSuccess = true;
            foundAny = true;
          }
        }
      } catch (e) {
        console.warn('Failed to fetch admin contacts', e?.message || e);
      }
      } catch (e) {
        console.warn('Failed to fetch admin blogs for dashboard', e.message || e);
      }

      // If any individual collection is empty after authenticated fetch, try the dev endpoints for that collection
      if (!membersRespSuccess) {
        try {
          const raw = await fetch(`${API_BASE_URL}/admin/dev/members`);
          if (raw.ok) {
            const json = await raw.json();
            if (json && json.success && Array.isArray(json.data)) {
              setMembers(json.data.map(m => ({
                ...m,
                id: m._id || m.id,
                name: m.fullName || m.name || m.email,
                college: m.college || m.collegeName || '',
                avatar: m.avatar || m.profileImg || m.photo || '',
                status: m.status ? String(m.status).charAt(0).toUpperCase() + String(m.status).slice(1) : (m.emailVerified ? 'Active' : 'Pending')
              })));
              membersRespSuccess = true;
            }
          }
        } catch (e) {}
      }

      if (!clubsRespSuccess) {
        try {
          const raw = await fetch(`${API_BASE_URL}/admin/dev/clubs`);
          if (raw.ok) {
            const json = await raw.json();
            if (json && json.success && Array.isArray(json.data)) {
              setClubs(json.data.map(c => ({
                ...c,
                id: c._id || c.id,
                name: c.name || c.fullName || c.clubName || '',
                img: c.img || c.image || c.banner || '',
                head: (c.clubHead && (c.clubHead.name || c.clubHead.fullName)) || c.head || '',
                headPhone: (c.clubHead && (c.clubHead.phone || c.clubHead.headPhone)) || c.headPhone || '',
                members: c.memberCount ?? (Array.isArray(c.members) ? c.members.length : c.members),
                events: c.eventCount ?? (Array.isArray(c.events) ? c.events.length : c.events),
                status: c.status ? String(c.status).charAt(0).toUpperCase() + String(c.status).slice(1) : ''
              })));
              clubsRespSuccess = true;
            }
          }
        } catch (e) {}
      }

      if (!eventsRespSuccess) {
        try {
          const raw = await fetch(`${API_BASE_URL}/admin/dev/events`);
          if (raw.ok) {
            const json = await raw.json();
            if (json && json.success && Array.isArray(json.data)) {
              setEvents(json.data.map(ev => ({
                ...ev,
                id: ev._id || ev.id,
                name: ev.title || ev.name || '',
                status: ev.status || '',
                registrations: ev.registrationsCount ?? (Array.isArray(ev.registrations) ? ev.registrations.length : 0)
              })));
              eventsRespSuccess = true;
            }
          }
        } catch (e) {}
      }

      if (!blogsRespSuccess) {
        try {
          const raw = await fetch(`${API_BASE_URL}/admin/dev/blogs`);
          if (raw.ok) {
            const json = await raw.json();
            if (json && json.success && Array.isArray(json.data)) {
              setBlogs(json.data.map(b => ({
                ...b,
                id: b._id || b.id,
                title: b.title,
                status: b.status || '',
                image: (b.image && (b.image.url || b.image)) || b.imagePreview || null,
              })));
              blogsRespSuccess = true;
            }
          }
        } catch (e) {}
      }

      if (!contactsRespSuccess) {
        try {
          const raw = await fetch(`${API_BASE_URL}/admin/dev/contacts`);
          if (raw.ok) {
            const json = await raw.json();
            if (json && json.success && Array.isArray(json.data)) {
              setContacts(json.data.map(c => ({
                ...c,
                id: c._id || c.id,
                sender: c.senderId?.fullName || c.senderName || c.name || '',
                email: c.senderId?.email || c.email || '',
              })));
              contactsRespSuccess = true;
            }
          }
        } catch (e) {}
      }

      if (!foundAny) {
        console.warn('Authenticated admin endpoints returned no data — attempting dev fallback');
        const devOk = await tryDevFallback();
        if (!devOk) {
          // nothing found via auth or dev fallback
          setFetchError('failed');
        } else {
          setFetchError(null);
        }
      } else {
        setFetchError(null);
      }
    } catch (err) {
      // If user isn't an admin or token invalid, fallback to dev endpoints so the dashboard still shows DB records while developing
      if (err?.message && /unauthoriz|forbid|401|403/i.test(err.message)) {
        console.warn('Authenticated admin call failed with auth error — trying dev-only fallback', err.message);
        const ok = await tryDevFallback();
        if (ok) {
          setFetchError(null);
          return;
        }

        setFetchError('auth');
        toast.error('Admin authorization required — please sign in as admin');
      } else {
        setFetchError('failed');
        toast.error('Failed to load admin data — check the backend server or network');
      }
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  // Subscribe to server-sent events so admin UI refreshes automatically when new records are created
  useEffect(() => {
    const token = localStorage.getItem('token');

    // prefer authenticated stream if we have token; otherwise fall back to a dev-only unauthenticated stream
    const streamUrl = token
      ? `${API_BASE_URL}/admin/stream?token=${encodeURIComponent(token)}`
      : `${API_BASE_URL}/admin/dev/stream`;
    let es;
    try {
      es = new EventSource(streamUrl);
    } catch (e) {
      console.warn('Failed to open EventSource', e?.message || e);
      return;
    }

    const onAny = (e) => {
      try {
        // Some events send JSON payloads
        const payload = e?.data ? JSON.parse(e.data) : null;
        // For now, simply refetch authoritative data on any creation event
        if (['member_created', 'club_created', 'event_created', 'blog_created'].includes(e.type) || e.type === 'message') {
          fetchAllData();
        }
      } catch (err) {
        // fallback: refetch anyway on parse failures
        fetchAllData();
      }
    };

    // add listeners
    es.addEventListener('member_created', onAny);
    es.addEventListener('club_created', onAny);
    es.addEventListener('event_created', onAny);
    es.addEventListener('blog_created', onAny);
    es.addEventListener('connected', () => console.log('Admin SSE connected'));
    es.onmessage = onAny; // fallback to default message

    es.onerror = (err) => {
      console.warn('Admin SSE error', err);
      // attempt to reconnect logic handled by EventSource automatically; we may re-fetch occasionally
    };

    return () => {
      try {
        es.close();
      } catch (e) {}
    };
  }, []);

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

  // Derive counts displayed in the Platform Overview so the values reflect live DB state
  const totalMembers = (members && members.length) || 0;
  const totalClubs = (clubs && clubs.length) || 0;

  const isEventActive = (ev) => {
    if (!ev) return false;
    const status = (ev.status || '').toString().toLowerCase();
    if (['upcoming', 'active', 'ongoing', 'running'].includes(status)) return true;
    if (ev.date) {
      try {
        const d = new Date(ev.date);
        const now = new Date();
        // treat future or same-day events as active
        if (!isNaN(d.getTime()) && d >= new Date(now.toDateString())) return true;
      } catch (e) {}
    }
    return false;
  };

  const activeEventsCount = (events || []).filter(isEventActive).length;

  const isBlogPublished = (b) => {
    if (!b) return false;
    const status = (b.status || '').toString().toLowerCase();
    if (status === 'published') return true;
    if (b.published === true || b.isPublished === true) return true;
    return false;
  };

  const publishedBlogsCount = (blogs || []).filter(isBlogPublished).length;

  const totalContacts = (contacts && contacts.length) || 0;

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

  const handleMemberStatusChange = async (memberId, action) => {
    // action expected: 'activate' or 'suspend'
    const optimistic = action === 'suspend' ? 'Suspended' : 'Active';
    setMembers(prev => prev.map(m => (m.id === memberId || m._id === memberId ? { ...m, status: optimistic } : m)));
    try {
      const token = localStorage.getItem('token');
      const api = createApiClient(token);
      if (api.admin && typeof api.admin.updateMemberStatus === 'function') {
        const resp = await api.admin.updateMemberStatus(memberId, action);
        if (resp && resp.success && resp.data) {
          const updated = resp.data;
          setMembers(prev => prev.map(m => (m.id === memberId || m._id === memberId ? ({ ...m, status: (updated.status || '').charAt(0).toUpperCase() + (updated.status || '').slice(1) }) : m)));
          toast.success('Member status updated');
          return;
        }
      }
      toast.error('Failed to persist member status to server');
    } catch (e) {
      console.warn('Failed to persist member status', e?.message || e);
      toast.error('Failed to persist member status to server');
    }
  };

  // expects action: 'approve'|'activate'|'suspend'
  const handleClubStatusChange = async (clubId, action) => {
    const optimisticStatus = action === 'suspend' ? 'Suspended' : 'Active';
    setClubs(prev => prev.map(c => (c.id === clubId || c._id === clubId ? { ...c, status: optimisticStatus } : c)));
    try {
      const token = localStorage.getItem('token');
      const api = createApiClient(token);
      if (api.admin && typeof api.admin.updateClubStatus === 'function') {
        const resp = await api.admin.updateClubStatus(clubId, action);
        if (resp && resp.success && resp.data) {
          const updated = resp.data;
          setClubs(prev => prev.map(c => (c.id === clubId || c._id === clubId ? ({ ...c, status: (updated.status || '').charAt(0).toUpperCase() + (updated.status || '').slice(1), members: updated.memberCount ?? c.members, events: updated.eventCount ?? c.events }) : c)));
          toast.success('Club status updated');
          return;
        }
      }
      toast.error('Failed to persist club status to server');
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
          { label: "Total Members", value: totalMembers, change: "+12%", icon: Users, color: "blue" },
          { label: "Total Clubs", value: totalClubs, change: "+5%", icon: Building2, color: "green" },
          { label: "Active Events", value: activeEventsCount, change: "+8%", icon: Calendar, color: "purple" },
          { label: "Published Blogs", value: publishedBlogsCount, change: "+15%", icon: FileText, color: "orange" },
          { label: "Contacts", value: totalContacts, change: "+0%", icon: Mail, color: "teal" },
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
      const matchesSearch = (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (m.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = memberFilters.status === 'all' || (m.status || '').toLowerCase() === memberFilters.status;
      const matchesSubscription = memberFilters.subscription === 'all' || (m.subscription || '').toLowerCase().includes(memberFilters.subscription);
      const memCity = (m.city && String(m.city).trim()) || 'Unknown';
      const matchesCity = memberFilters.city === 'all' || memCity === memberFilters.city;
      return matchesSearch && matchesStatus && matchesSubscription && matchesCity;
    });

    // Group members by city
    const membersByCity = filteredMembers.reduce((acc, member) => {
      const city = (member.city && String(member.city).trim()) || 'Unknown';
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
  {[...new Set(members.map(m => (m.city && String(m.city).trim()) || 'Unknown'))].map(city => (
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
                    {/* Status action buttons */}
                    {member.status === 'Active' && (
                      <button onClick={() => handleMemberStatusChange(member.id, 'suspend')} className="p-2 bg-yellow-600/50 text-white rounded-lg hover:bg-yellow-600" title="Suspend">
                        <UserX className="w-4 h-4" />
                      </button>
                    )}
                    {(member.status === 'Pending' || member.status === 'Suspended') && (
                      <button onClick={() => handleMemberStatusChange(member.id, 'activate')} className="p-2 bg-green-600/50 text-white rounded-lg hover:bg-green-600" title="Activate">
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
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
                    onClick={() => handleClubStatusChange(club.id, 'approve')}
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
                {club.status === 'Active' && (
                  <button
                    onClick={() => handleClubStatusChange(club.id, 'suspend')}
                    className="p-2 bg-yellow-600/50 text-white rounded-lg hover:bg-yellow-600"
                    title="Suspend"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                )}
                {club.status === 'Suspended' && (
                  <button
                    onClick={() => handleClubStatusChange(club.id, 'activate')}
                    className="p-2 bg-green-600/50 text-white rounded-lg hover:bg-green-600"
                    title="Reactivate"
                  >
                    <UserCheck className="w-4 h-4" />
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
              <td className="px-6 py-4 text-sm text-gray-300">{(typeof blog.author === 'object' ? (blog.author.fullName || blog.author.name || blog.author.email) : blog.author) || '—'}</td>
              <td className="px-6 py-4 text-sm text-gray-300">{(typeof blog.club === 'object' ? (blog.club.name || blog.club.fullName || blog.club._id) : blog.club) || '—'}</td>
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
          {fetchError === 'auth' && (
            <div className="mb-4 p-4 rounded-lg bg-yellow-600/10 text-yellow-300 border border-yellow-600/20 flex items-center justify-between">
              <div>
                <strong className="font-semibold">Admin authorization required</strong>
                <div className="text-sm text-yellow-300/70">Sign in as an admin account to view and manage real data.</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { window.location.href = '/admin-login'; }} className="px-3 py-1 rounded bg-yellow-600 text-black font-semibold">Sign in</button>
                <button onClick={() => fetchAllData()} className="px-3 py-1 rounded bg-white/10 text-white">Retry</button>
                {/* Dev helper: create admin quickly if backend is local and no admin exists */}
                <button onClick={async () => {
                  try {
                    const resp = await fetch(`${API_BASE_URL.replace('/api', '')}/api/auth/debug/seed-admin`, { method: 'POST' });
                    const json = await resp.json();
                    if (json && (json.token || json.data)) {
                      // if token provided auto-login
                      if (json.token) {
                        localStorage.setItem('token', json.token);
                        localStorage.setItem('user', JSON.stringify({ email: json.data?.email || 'admin', role: 'admin' }));
                        toast.success('Dev admin created and signed in');
                        fetchAllData();
                        return;
                      }
                    }
                    toast.success('Dev admin created — please sign in');
                  } catch (e) {
                    toast.error('Failed to create dev admin');
                  }
                }} className="px-3 py-1 rounded bg-white/10 text-white">Create dev admin</button>
              </div>
            </div>
          )}
          {fetchError === 'failed' && (
            <div className="mb-4 p-4 rounded-lg bg-red-600/10 text-red-300 border border-red-600/20 flex items-center justify-between">
              <div>
                <strong className="font-semibold">Failed to load live admin data</strong>
                <div className="text-sm text-red-300/70">Check the backend server or your network. You can still use local (mock) UI while offline.</div>
              </div>
              <div>
                <button onClick={() => fetchAllData()} className="px-3 py-1 rounded bg-white/10 text-white">Retry</button>
              </div>
            </div>
          )}
          {/* Debug info for dev */}
          {(typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) && fetchDebug?.lastPath && (
            <div className="mb-4 p-3 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10">
              <strong className="text-xs text-gray-400 mr-2">Debug:</strong>
              <span className="mr-4">path: <code className="text-xs">{fetchDebug.lastPath}</code></span>
              <span className="mr-4">status: <code className="text-xs">{fetchDebug.lastStatus}</code></span>
              {fetchDebug.details && <span>details: <code className="text-xs">{fetchDebug.details}</code></span>}
            </div>
          )}
          {/* Debug panel for admin fetch (visible in dev) */}
          {fetchDebug.lastPath && (
            <div className="mb-4 p-2 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <strong className="text-xs text-gray-200">Fetch:</strong>
                <div className="text-xs text-gray-300">{fetchDebug.lastPath}</div>
                <div className="text-xs text-gray-400">· {fetchDebug.lastStatus}</div>
                {fetchDebug.details && <div className="text-xs text-gray-400">· {fetchDebug.details}</div>}
              </div>
              <div className="text-xs text-gray-400 italic">Dev debug</div>
            </div>
          )}
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
    <p className="text-sm text-gray-400">By {(typeof selectedItem.author === 'object' ? (selectedItem.author.fullName || selectedItem.author.name || selectedItem.author.email) : selectedItem.author) || 'Unknown'}</p>
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