// src/lib/api/index.ts

import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

// Types basés sur l'API Django
export type UserRole = 1 | 2 | 3; // 1: Élève, 2: Tuteur, 3: Admin

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  role_display: string;
  is_verified_tutor: boolean;
  phone_number?: string;
  date_joined?: string;
}

export interface Level {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  tutor: number;
  tutor_username: string;
  title: string;
  description: string;
  level: number;
  level_name: string;
  subject: number;
  subject_name: string;
  price: string;
  video_url: string;
  is_validated: boolean;
  created_at: string;
}

export interface PurchaseRequest {
  course_id: number;
  phone_number: string;
}

export interface PurchaseResponse {
  message: string;
  transaction_ref: string;
  course_id: number;
  amount_paid: string;
}

export interface TutorStats {
  total_earned: string;
  total_paid: string;
  current_balance: string;
  unpaid_transactions_count: number;
}

export interface Earning {
  id: number;
  course_title: string;
  transaction_ref: string;
  amount: string;
  is_paid: boolean;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Client API avec gestion des tokens
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token d'authentification
    this.client.interceptors.request.use(
      (config) => {
        const token = Cookies.get('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer le rafraîchissement du token
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = Cookies.get('refresh_token');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                refresh: refreshToken,
              });

              const { access } = response.data;
              Cookies.set('access_token', access, {
                expires: 1 / 24,
                secure: process.env.NODE_ENV === 'production',
              });

              originalRequest.headers.Authorization = `Bearer ${access}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Échec du rafraîchissement, déconnexion
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // ============================================
  // AUTHENTIFICATION
  // ============================================

  async login(credentials: { login: string; password: string }) {
    const response = await this.client.post('/token/', credentials);
    return response.data;
  }

  async refreshToken(refresh: string) {
    const response = await this.client.post('/token/refresh/', { refresh });
    return response.data;
  }

  async register(data: {
    username: string;
    email: string;
    password: string;
    phone_number?: string;
    role: UserRole;
  }) {
    const response = await this.client.post('/auth/register/', data);
    return response.data;
  }

  async getUserProfile(): Promise<User> {
    const response = await this.client.get('/auth/user/');
    return response.data;
  }

  // ============================================
  // CATALOGUE PUBLIC
  // ============================================

  async getCourses(page?: number): Promise<PaginatedResponse<Course>> {
    const response = await this.client.get('/courses/', {
      params: page ? { page } : undefined,
    });
    return response.data;
  }

  async getCourse(id: number): Promise<Course> {
    const response = await this.client.get(`/courses/${id}/`);
    return response.data;
  }

  async getLevels(): Promise<Level[]> {
    const response = await this.client.get('/levels/');
    return response.data;
  }

  async getSubjects(): Promise<Subject[]> {
    const response = await this.client.get('/subjects/');
    return response.data;
  }

  // ============================================
  // TUTEUR - Gestion des cours
  // ============================================

  async getTutorCourses(page?: number): Promise<PaginatedResponse<Course>> {
    const response = await this.client.get('/tutor/courses/', {
      params: page ? { page } : undefined,
    });
    return response.data;
  }

  async createCourse(data: {
    title: string;
    description: string;
    level: number;
    subject: number;
    price: string;
    video_url: string;
  }): Promise<Course> {
    const response = await this.client.post('/tutor/courses/', data);
    return response.data;
  }

  async updateCourse(id: number, data: Partial<{
    title: string;
    description: string;
    level: number;
    subject: number;
    price: string;
    video_url: string;
  }>): Promise<Course> {
    const response = await this.client.patch(`/tutor/courses/${id}/`, data);
    return response.data;
  }

  async deleteCourse(id: number): Promise<void> {
    await this.client.delete(`/tutor/courses/${id}/`);
  }

  // ============================================
  // TUTEUR - Statistiques et gains
  // ============================================

  async getTutorStats(): Promise<TutorStats> {
    const response = await this.client.get('/tutor/stats/');
    return response.data;
  }

  async getTutorEarnings(page?: number): Promise<PaginatedResponse<Earning>> {
    const response = await this.client.get('/tutor/earnings/', {
      params: page ? { page } : undefined,
    });
    return response.data;
  }

  // ============================================
  // ÉLÈVE - Achat
  // ============================================

  async purchaseCourse(data: PurchaseRequest): Promise<PurchaseResponse> {
    const response = await this.client.post('/purchase/', data);
    return response.data;
  }

  // ============================================
  // ADMIN - Gestion des tuteurs
  // ============================================

  async getPendingTutors(page?: number): Promise<PaginatedResponse<User>> {
    const response = await this.client.get('/admin/tutors/pending/', {
      params: page ? { page } : undefined,
    });
    return response.data;
  }

  async verifyTutor(id: number): Promise<User> {
    const response = await this.client.patch(`/admin/tutors/${id}/verify/`, {
      is_verified_tutor: true,
    });
    return response.data;
  }

  // ============================================
  // ADMIN - Modération des cours
  // ============================================

  async getPendingCourses(page?: number): Promise<PaginatedResponse<Course>> {
    const response = await this.client.get('/admin/courses/pending/', {
      params: page ? { page } : undefined,
    });
    return response.data;
  }

  async moderateCourse(id: number, is_validated: boolean): Promise<Course> {
    const response = await this.client.patch(`/admin/courses/${id}/moderate/`, {
      is_validated,
    });
    return response.data;
  }

  // ============================================
  // ADMIN - Gestion du catalogue
  // ============================================

  async createLevel(name: string): Promise<Level> {
    const response = await this.client.post('/admin/levels/', { name });
    return response.data;
  }

  async createSubject(name: string): Promise<Subject> {
    const response = await this.client.post('/admin/subjects/', { name });
    return response.data;
  }

  // ============================================
  // ADMIN - Reversement
  // ============================================

  async payTutor(id: number): Promise<{
    message: string;
    amount: string;
    tutor_id: number;
  }> {
    const response = await this.client.post(`/admin/reversement/${id}/pay/`);
    return response.data;
  }
}

// Export d'une instance unique
export const apiClient = new ApiClient();

// Export des fonctions de compatibilité (pour migration progressive)
export async function fetchTuteurs() {
  const response = await apiClient.getPendingTutors();
  return response.results;
}
