import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const memberApi = {
  // Get member profile
  getProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/member/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to fetch profile';
      throw new Error(msg);
    }
  },

  // Update member profile
  updateProfile: async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      // If sending FormData, let axios set Content-Type with boundary
      if (profileData instanceof FormData) {
        const response = await axios.put(`${API_BASE_URL}/member/profile`, profileData, { headers });
        return response.data;
      }

      const response = await axios.put(`${API_BASE_URL}/member/profile`, profileData, {
        headers: { ...headers }
      });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to update profile';
      throw new Error(msg);
    }
  },

  // Register for event
  registerForEvent: async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/member/events/register`, 
        { eventId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to register for event';
      throw new Error(msg);
    }
  },

  // Request to join club
  requestToJoinClub: async (clubId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/member/clubs/join`,
        { clubId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to send join request';
      throw new Error(msg);
    }
  },

  // Create new club - disabled for members
  createClub: async (clubData) => {
    // Members are not allowed to create clubs. This API is intentionally disabled on the client.
    throw { message: 'Members are not allowed to create clubs. Please contact an administrator.' };
  },

  // Get member's registered events
  getRegisteredEvents: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/member/events/registered`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to fetch registered events';
      throw new Error(msg);
    }
  },

  // Get member's club memberships
  getClubMemberships: async () => {
    // Backend does not currently expose a dedicated memberships endpoint.
    // Derive membership lists from profile endpoint to provide a consistent shape.
    try {
      const profileResult = await memberApi.getProfile();
      const user = profileResult.data;

      const joined = (user.joinedClubs || []).map(c => (typeof c === 'string' ? c : (c._id || c.id)));
      const pending = (user.pendingClubRequests || []).map(r => (r.clubId ? (r.clubId._id || r.clubId) : r.clubId));
      const created = (user.createdClubs || []).map(c => (typeof c === 'string' ? c : (c._id || c.id)));

      return { success: true, data: { joined, pending, created } };
    } catch (error) {
      const msg = error?.message || 'Failed to fetch club memberships';
      throw new Error(msg);
    }
  },

  // Get all events
  getAllEvents: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/member/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to fetch events';
      throw new Error(msg);
    }
  },

  // Get public blogs (feed)
  getPublicBlogs: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/member/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to fetch blogs';
      throw new Error(msg);
    }
  },

  // Get all clubs
  getAllClubs: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/member/clubs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to fetch clubs';
      throw new Error(msg);
    }
  }

  ,
  // Get events for a specific club
  getClubEvents: async (clubId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/member/clubs/${clubId}/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to fetch club events';
      throw new Error(msg);
    }
  },

  // Create a new blog post
  createBlogPost: async (blogData) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Add blog data
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      formData.append('isPublic', blogData.isPublic);
      
      // Add image if exists
      if (blogData.image) {
        formData.append('image', blogData.image);
      }

      const response = await axios.post(
        `${API_BASE_URL}/member/blogs`, 
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to create blog post';
      throw new Error(msg);
    }
  }
};

export default memberApi;