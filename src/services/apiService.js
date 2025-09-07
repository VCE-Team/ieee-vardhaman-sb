const API_BASE_URL = 'http://localhost:8081/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    } else {
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is ok first
      if (!response.ok) {
        // Try to parse error message if there's content
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          // If we can't parse the error response, use the default message
        }
        throw new Error(errorMessage);
      }

      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const text = await response.text();
          if (!text || text.trim() === '') {
            return {};
          }
          const data = JSON.parse(text);
          return data;
        } catch (parseError) {
          throw new Error('Invalid JSON response from server');
        }
      } else {
        // Return empty object for successful responses without JSON content
        return {};
      }
    } catch (error) {
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData) {
    return await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.setToken(null);
    }
  }

  async verifyToken() {
    return await this.request('/auth/verify');
  }

  async getProfile() {
    return await this.request('/auth/profile');
  }

  async changePassword(oldPassword, newPassword) {
    return await this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }

  // Public Society methods
  async getAllSocieties() {
    return await this.request('/societies');
  }

  async getSocietyById(id) {
    return await this.request(`/societies/${id}`);
  }

  async getSocietyByName(name) {
    return await this.request(`/societies/name/${name}`);
  }

  // Society Dashboard methods
  async getSocietyDetails(societyId) {
    return await this.request(`/society-dashboard/society/${societyId}`);
  }

  async updateSociety(societyId, societyData) {
    return await this.request(`/society-dashboard/society/${societyId}`, {
      method: 'PUT',
      body: JSON.stringify(societyData),
    });
  }

  // Society Members
  async getSocietyMembers(societyId) {
    return await this.request(`/society-dashboard/society/${societyId}/members`);
  }

  async createSocietyMember(societyId, memberData) {
    return await this.request(`/society-dashboard/society/${societyId}/members`, {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  }

  async updateSocietyMember(societyId, memberId, memberData) {
    return await this.request(`/society-dashboard/society/${societyId}/members/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  }

  async deleteSocietyMember(societyId, memberId) {
    return await this.request(`/society-dashboard/society/${societyId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }

  async getSocietyPastEvents(societyId) {
    return await this.request(`/society-dashboard/society/${societyId}/events/past`);
  }

  async createSocietyPastEvent(societyId, eventData) {
    return await this.request(`/society-dashboard/society/${societyId}/events/past`, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateSocietyPastEvent(societyId, eventId, eventData) {
    return await this.request(`/society-dashboard/society/${societyId}/events/past/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteSocietyPastEvent(societyId, eventId) {
    return await this.request(`/society-dashboard/society/${societyId}/events/past/${eventId}`, {
      method: 'DELETE',
    });
  }

  async getSocietyUpcomingEvents(societyId) {
    return await this.request(`/society-dashboard/society/${societyId}/events/upcoming`);
  }

  async createSocietyUpcomingEvent(societyId, eventData) {
    return await this.request(`/society-dashboard/society/${societyId}/events/upcoming`, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateSocietyUpcomingEvent(societyId, eventId, eventData) {
    return await this.request(`/society-dashboard/society/${societyId}/events/upcoming/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteSocietyUpcomingEvent(societyId, eventId) {
    return await this.request(`/society-dashboard/society/${societyId}/events/upcoming/${eventId}`, {
      method: 'DELETE',
    });
  }

  async getSocietyAchievements(societyId) {
    return await this.request(`/society-dashboard/society/${societyId}/achievements`);
  }

  async createSocietyAchievement(societyId, achievementData) {
    return await this.request(`/society-dashboard/society/${societyId}/achievements`, {
      method: 'POST',
      body: JSON.stringify(achievementData),
    });
  }

  async updateSocietyAchievement(societyId, achievementId, achievementData) {
    return await this.request(`/society-dashboard/society/${societyId}/achievements/${achievementId}`, {
      method: 'PUT',
      body: JSON.stringify(achievementData),
    });
  }

  async deleteSocietyAchievement(societyId, achievementId) {
    return await this.request(`/society-dashboard/society/${societyId}/achievements/${achievementId}`, {
      method: 'DELETE',
    });
  }

  async getSocietyGallery(societyId) {
    return await this.request(`/society-dashboard/society/${societyId}/gallery`);
  }

  async createSocietyGalleryItem(societyId, itemData) {
    return await this.request(`/society-dashboard/society/${societyId}/gallery`, {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async deleteSocietyGalleryItem(societyId, itemId) {
    return await this.request(`/society-dashboard/society/${societyId}/gallery/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Council Dashboard methods (similar structure)
  async getCouncilDetails(councilId) {
    return await this.request(`/council-dashboard/council/${councilId}`);
  }

  async updateCouncil(councilId, councilData) {
    return await this.request(`/council-dashboard/council/${councilId}`, {
      method: 'PUT',
      body: JSON.stringify(councilData),
    });
  }

  // Council Members
  async getCouncilMembers(councilId) {
    return await this.request(`/council-dashboard/council/${councilId}/members`);
  }

  async createCouncilMember(councilId, memberData) {
    return await this.request(`/council-dashboard/council/${councilId}/members`, {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  }

  async updateCouncilMember(councilId, memberId, memberData) {
    return await this.request(`/council-dashboard/council/${councilId}/members/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  }

  async deleteCouncilMember(councilId, memberId) {
    return await this.request(`/council-dashboard/council/${councilId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }

  async getCouncilPastEvents(councilId) {
    return await this.request(`/council-dashboard/council/${councilId}/events/past`);
  }

  async createCouncilPastEvent(councilId, eventData) {
    return await this.request(`/council-dashboard/council/${councilId}/events/past`, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateCouncilPastEvent(councilId, eventId, eventData) {
    return await this.request(`/council-dashboard/council/${councilId}/events/past/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteCouncilPastEvent(councilId, eventId) {
    return await this.request(`/council-dashboard/council/${councilId}/events/past/${eventId}`, {
      method: 'DELETE',
    });
  }

  async getCouncilUpcomingEvents(councilId) {
    return await this.request(`/council-dashboard/council/${councilId}/events/upcoming`);
  }

  async createCouncilUpcomingEvent(councilId, eventData) {
    return await this.request(`/council-dashboard/council/${councilId}/events/upcoming`, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateCouncilUpcomingEvent(councilId, eventId, eventData) {
    return await this.request(`/council-dashboard/council/${councilId}/events/upcoming/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteCouncilUpcomingEvent(councilId, eventId) {
    return await this.request(`/council-dashboard/council/${councilId}/events/upcoming/${eventId}`, {
      method: 'DELETE',
    });
  }

  async getCouncilAchievements(councilId) {
    return await this.request(`/council-dashboard/council/${councilId}/achievements`);
  }

  async createCouncilAchievement(councilId, achievementData) {
    return await this.request(`/council-dashboard/council/${councilId}/achievements`, {
      method: 'POST',
      body: JSON.stringify(achievementData),
    });
  }

  async updateCouncilAchievement(councilId, achievementId, achievementData) {
    return await this.request(`/council-dashboard/council/${councilId}/achievements/${achievementId}`, {
      method: 'PUT',
      body: JSON.stringify(achievementData),
    });
  }

  async deleteCouncilAchievement(councilId, achievementId) {
    return await this.request(`/council-dashboard/council/${councilId}/achievements/${achievementId}`, {
      method: 'DELETE',
    });
  }

  async getCouncilGallery(councilId) {
    return await this.request(`/council-dashboard/council/${councilId}/gallery`);
  }

  async createCouncilGalleryItem(councilId, itemData) {
    return await this.request(`/council-dashboard/council/${councilId}/gallery`, {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async deleteCouncilGalleryItem(councilId, itemId) {
    return await this.request(`/council-dashboard/council/${councilId}/gallery/${itemId}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
