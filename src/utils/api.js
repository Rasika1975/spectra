const BASE_URL = 'http://localhost:3000';

const API = {
    auth: {
        signin: `${BASE_URL}/api/auth/signin`,
        signup: `${BASE_URL}/api/auth/signup`
    },
    member: {
        profile: `${BASE_URL}/api/member/profile`,
        events: {
            register: `${BASE_URL}/api/member/events/register`,
        },
        clubs: {
            join: `${BASE_URL}/api/member/clubs/join`,
            create: `${BASE_URL}/api/member/clubs/create`
        }
    },
    club: {
        profile: `${BASE_URL}/api/club/profile`,
        members: {
            pending: `${BASE_URL}/api/club/members/pending`,
            handleRequest: `${BASE_URL}/api/club/members/handle-request`
        },
        events: {
            create: `${BASE_URL}/api/club/events`,
            registrations: (eventId) => `${BASE_URL}/api/club/events/${eventId}/registrations`
        },
        blogs: {
            create: `${BASE_URL}/api/club/blogs`,
            list: `${BASE_URL}/api/club/blogs`
        }
    },
    admin: {
        profile: `${BASE_URL}/api/admin/profile`,
        members: {
            list: `${BASE_URL}/api/admin/members`,
            updateStatus: `${BASE_URL}/api/admin/members/status`
        },
        clubs: {
            list: `${BASE_URL}/api/admin/clubs`,
            updateStatus: `${BASE_URL}/api/admin/clubs/status`
        },
        blogs: {
            create: `${BASE_URL}/api/admin/blogs`
        },
        contacts: {
            list: `${BASE_URL}/api/admin/contacts`,
            updateStatus: `${BASE_URL}/api/admin/contacts/status`
        }
    }
};

export const createApiClient = (token = null) => {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchWithAuth = async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...headers,
                    ...options.headers
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            if (!window.navigator.onLine) {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    };

    return {
        auth: {
            signin: (credentials) => fetchWithAuth(API.auth.signin, {
                method: 'POST',
                body: JSON.stringify(credentials)
            }),
            signup: (userData) => fetchWithAuth(API.auth.signup, {
                method: 'POST',
                body: JSON.stringify(userData)
            })
        },
        member: {
            updateProfile: (data) => fetchWithAuth(API.member.profile, {
                method: 'PUT',
                body: JSON.stringify(data)
            }),
            registerForEvent: (eventId) => fetchWithAuth(API.member.events.register, {
                method: 'POST',
                body: JSON.stringify({ eventId })
            }),
            requestToJoinClub: (clubId) => fetchWithAuth(API.member.clubs.join, {
                method: 'POST',
                body: JSON.stringify({ clubId })
            })
        },
        club: {
            updateProfile: (data) => fetchWithAuth(API.club.profile, {
                method: 'PUT',
                body: JSON.stringify(data)
            }),
            getPendingRequests: () => fetchWithAuth(API.club.members.pending),
            handleMemberRequest: (memberId, action) => fetchWithAuth(API.club.members.handleRequest, {
                method: 'POST',
                body: JSON.stringify({ memberId, action })
            }),
            createEvent: (eventData) => fetchWithAuth(API.club.events.create, {
                method: 'POST',
                body: JSON.stringify(eventData)
            }),
            getEventRegistrations: (eventId) => fetchWithAuth(API.club.events.registrations(eventId)),
            createBlog: (blogData) => fetchWithAuth(API.club.blogs.create, {
                method: 'POST',
                body: JSON.stringify(blogData)
            }),
            getBlogs: () => fetchWithAuth(API.club.blogs.list)
        },
        admin: {
            updateProfile: (data) => fetchWithAuth(API.admin.profile, {
                method: 'PUT',
                body: JSON.stringify(data)
            }),
            getAllMembers: () => fetchWithAuth(API.admin.members.list),
            updateMemberStatus: (memberId, action) => fetchWithAuth(API.admin.members.updateStatus, {
                method: 'PUT',
                body: JSON.stringify({ memberId, action })
            }),
            getAllClubs: () => fetchWithAuth(API.admin.clubs.list),
            updateClubStatus: (clubId, action) => fetchWithAuth(API.admin.clubs.updateStatus, {
                method: 'PUT',
                body: JSON.stringify({ clubId, action })
            }),
            createBlog: (blogData) => fetchWithAuth(API.admin.blogs.create, {
                method: 'POST',
                body: JSON.stringify(blogData)
            }),
            getContactSubmissions: (filters) => fetchWithAuth(`${API.admin.contacts.list}?${new URLSearchParams(filters)}`),
            updateContactStatus: (contactId, status, adminNotes) => fetchWithAuth(API.admin.contacts.updateStatus, {
                method: 'PUT',
                body: JSON.stringify({ contactId, status, adminNotes })
            })
        }
    };
};

export default API;