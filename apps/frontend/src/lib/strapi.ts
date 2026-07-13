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
      '/skills?populate=*&sort=stack'
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}

export async function fetchWorks() {
  try {
    const response = await strapiClient.get<StrapiResponse<any>>(
      '/works?populate=*'
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching works:', error);
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

export async function fetchBlogs() {
  try {
    // Sort by publication date desc
    const response = await strapiClient.get<StrapiResponse<any>>(
      '/blogs?populate=*&sort=publishedDate:desc'
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

export async function fetchBlogById(id: string | number) {
  try {
    const response = await strapiClient.get<StrapiResponse<any>>(
      `/blogs/${id}?populate=*`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    const response = await strapiClient.post('/subscribers', {
      data: { email, active: true },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error subscribing:', error);
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
}
