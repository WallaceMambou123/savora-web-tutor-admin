// src/app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'; 

// --- Types et Interfaces ---
// Role 1: Student, 2: Tutor, 3: Admin
export type UserRole = 1 | 2 | 3; 

interface User {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  is_verified_tutor: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (credentials: any, role: 1 | 2) => Promise<void>;
  getAccessToken: () => string | null;
}

// L'URL de base de votre API Django
const API_BASE_URL = 'http://127.0.0.1:8000/api'; 
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Hook Personnalisé ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// --- Composant Provider ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction utilitaire
  const getAccessToken = () => Cookies.get('access_token') || null;

  // 1. Fonction de Déconnexion
  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
    toast.success("Vous êtes déconnecté.");
    router.push('/login'); 
  };
  
  // 2. Fonction pour rafraîchir le token
  const refreshAuthToken = async (): Promise<string | null> => {
    const refresh = Cookies.get('refresh_token');
    if (!refresh) {
      logout();
      return null;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh });
      const newAccess = response.data.access;
      Cookies.set('access_token', newAccess, { expires: 1/24, secure: process.env.NODE_ENV === 'production' });
      return newAccess;
    } catch (error) {
      logout();
      return null;
    }
  };

  // 3. Fonction de Connexion (Utilisée aussi après l'inscription)
  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      // Étape 1: Obtenir les tokens
      const tokenResponse = await axios.post(`${API_BASE_URL}/token/`, credentials);
      const { access, refresh } = tokenResponse.data;

      Cookies.set('access_token', access, { expires: 1/24, secure: process.env.NODE_ENV === 'production' }); 
      Cookies.set('refresh_token', refresh, { expires: 7, secure: process.env.NODE_ENV === 'production' });

      // Étape 2: Récupérer le profil utilisateur
      const userProfileResponse = await axios.get(`${API_BASE_URL}/auth/user/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      const userData: User = userProfileResponse.data;
      
      setUser(userData);
      toast.success("Connexion réussie !");

      // 3. Redirection basée sur le rôle
      if (userData.role === 3) {
        router.push('/admin');
      } else if (userData.role === 2) {
        router.push('/tutor');
      } else {
        router.push('/');
      }

    } catch (error) {
        const err = error as AxiosError;
        // CORRECTION DE TYPAGE
        const data = err.response?.data as { detail?: string };
        const errorMessage = data?.detail || "Erreur de connexion : Vérifiez vos identifiants.";
        
        toast.error(errorMessage);
        throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // 4. Fonction d'Inscription
  const register = async (credentials: any, role: 1 | 2) => {
      // NOTE: endpoint à aligner avec votre API Django (ex: /auth/register/tutor/)
      // Nous utilisons un endpoint générique ici pour la simplicité du MVP.
      const endpoint = `${API_BASE_URL}/auth/register/`; 
      
      try {
          const response = await axios.post(endpoint, { ...credentials, role });
          
          if (response.status === 201 || response.status === 200) {
              toast.success(`Inscription réussie ! Vous pouvez maintenant vous connecter.`);
              // Après l'inscription, l'utilisateur doit se connecter (ou être connecté automatiquement)
              router.push('/login'); 
          }
      } catch (error) {
          const err = error as AxiosError;
          // Gestion des erreurs de validation Django (ex: email déjà pris)
          const errorData = err.response?.data as { [key: string]: string[] };
          const firstError = errorData ? Object.values(errorData).flat()[0] : "Échec de l'inscription.";
          toast.error(firstError || "Une erreur inattendue est survenue.");
          throw error;
      }
  };


  // 5. Vérification de la session au montage
  useEffect(() => {
    const checkUser = async () => {
      const access = getAccessToken();
      
      if (access) {
        try {
          // Tente de récupérer l'utilisateur avec l'access token actuel
          const userProfileResponse = await axios.get(`${API_BASE_URL}/auth/user/`, {
            headers: { Authorization: `Bearer ${access}` },
          });
          setUser(userProfileResponse.data);
        } catch (error) {
           // Si le token est expiré, tente de le rafraîchir
           const newAccess = await refreshAuthToken();
           if (newAccess) {
             try {
                // Tente à nouveau de récupérer l'utilisateur avec le nouveau token
                const userProfileResponse = await axios.get(`${API_BASE_URL}/auth/user/`, {
                    headers: { Authorization: `Bearer ${newAccess}` },
                });
                setUser(userProfileResponse.data);
             } catch(e) {
                logout(); // Échec final
             }
           }
        }
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, register, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};