import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const strapiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interfaces pour les réponses de Strapi
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

// Fonctions helper pour les requêtes
export async function fetchPortfolioInfo() {
  try {
    const response = await strapiClient.get<StrapiResponse<any>>(
      '/portfolio-info?populate=*'
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching portfolio info:', error);
    throw error;
  }
}

export async function fetchProjects() {
  try {
    const response = await strapiClient.get<StrapiResponse<any>>(
      '/projects?populate=*&sort=createdAt:desc'
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function fetchSkills() {
  try {
    const response = await strapiClient.get<StrapiResponse<any>>(
      '/skills?sort=category'
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}

export async function submitMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const response = await strapiClient.post('/messages', { data });
    return response.data;
  } catch (error) {
    console.error('Error submitting message:', error);
    throw error;
  }
}
