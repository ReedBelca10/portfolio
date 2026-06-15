// API client pour tester les endpoints Strapi
// Utiliser avec: npm run api:test ou directement dans un node REPL

import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

// Créer un client API
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test functions
export const testAPI = {
  async getPortfolioInfo() {
    try {
      const response = await apiClient.get('/portfolio-info?populate=*');
      console.log('Portfolio Info:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  },

  async getProjects() {
    try {
      const response = await apiClient.get('/projects?populate=*&sort=createdAt:desc');
      console.log('Projects:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  },

  async getSkills() {
    try {
      const response = await apiClient.get('/skills?sort=category');
      console.log('Skills:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  },

  async createMessage(data) {
    try {
      const response = await apiClient.post('/messages', {
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });
      console.log('Message created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
};

// Export for use in tests
export default testAPI;
