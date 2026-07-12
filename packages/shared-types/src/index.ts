export interface Portfolio {
  id: string;
  name: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  image?: string;
  resume?: string;
  social_links: SocialLink[];
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  platform: 'twitter' | 'github' | 'linkedin' | 'email' | 'website';
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  images: string[];
  technologies: string[];
  featured: boolean;
  link?: string;
  github?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  stack: 
    | 'Programming Languages' 
    | 'Web Development' 
    | 'Mobile Development' 
    | 'Backend Development' 
    | 'Database & DevOps' 
    | 'Design & Tools';
  subcategory: string;
  proficiency: number;
  icon?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
  content: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  price?: number;
  duration?: string;
}
