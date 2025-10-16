// src/components/auth/AdminGuard.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // 1. Si pas authentifié, rediriger vers la page de connexion
      if (!isAuthenticated) {
        toast.error("Veuillez vous connecter pour accéder à cette page.");
        router.replace('/login');
        return;
      }
      
      // 2. Si authentifié mais n'est PAS Admin (role !== 3), rediriger à la racine
      if (user && user.role !== 3) {
        toast.error("Accès non autorisé. Seuls les administrateurs peuvent accéder à ce panneau.");
        router.replace('/'); 
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Pendant le chargement, ou si l'utilisateur est connecté mais on vérifie le rôle
  if (isLoading || (isAuthenticated && user?.role !== 3)) {
    // Afficher un grand loader pour couvrir l'écran
    return (
      <div className="min-h-screen flex items-center justify-center bg-savoora-light dark:bg-savoora-dark">
        <Loader2 className="w-10 h-10 text-savoora-primary animate-spin" />
        <span className="ml-3 text-lg text-savoora-dark dark:text-savoora-light font-sans">Vérification de la session...</span>
      </div>
    );
  }

  // Si l'utilisateur est bien l'Admin (role === 3), on affiche le contenu
  if (user && user.role === 3) {
    return <>{children}</>;
  }
  
  // Si le Guard a déclenché une redirection, on ne rend rien pour éviter un flash de contenu
  return null; 
};

export default AdminGuard;