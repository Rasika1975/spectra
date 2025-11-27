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
      throw error.response?.data || { message: 'Failed to fetch profile' };
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
      throw error.response?.data || { message: 'Failed to update profile' };
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
      throw error.response?.data || { message: 'Failed to register for event' };
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
      throw error.response?.data || { message: 'Failed to send join request' };
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
      throw error.response?.data || { message: 'Failed to fetch registered events' };
    }
  },

  // Get member's club memberships
  getClubMemberships: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/member/clubs/memberships`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch club memberships' };
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
      throw error.response?.data || { message: 'Failed to fetch events' };
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
      throw error.response?.data || { message: 'Failed to fetch blogs' };
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
      throw error.response?.data || { message: 'Failed to fetch clubs' };
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
      throw error.response?.data || { message: 'Failed to fetch club events' };
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
      throw error.response?.data || { message: 'Failed to create blog post' };
    }
  }
};

export default memberApi;