// src/components/layout/Header.tsx
'use client';

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Moon, Sun, LogOut } from 'lucide-react';
//import { useTheme } from '@/app/context/ThemeContext'; // Assurez-vous d'utiliser useTheme
import { useRouter } from 'next/navigation';
import ThemeSwitcher from '../../ThemeSwitcher';

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  // Assume que vous avez un useTheme dans ThemeContext
  //const { theme, toggleTheme } = useTheme(); 
  const router = useRouter();

  return (
    <header className="p-4 border-b border-savoora-muted/50 
                       // Utilise les couleurs de fond/texte du body par défaut
                       bg-savoora-light/90 dark:bg-savoora-dark/90 sticky top-0 backdrop-blur-sm z-10">
      
      <div className="flex justify-between items-center">
        
        {/* Titre de la page (peut être dynamique) */}
        <h1 className="text-xl font-display font-semibold">
          Bienvenue, {user?.username || 'Admin'}
        </h1>
        
        <div className="flex items-center space-x-4">
          
          {/* Bouton de basculement de thème */}
          <ThemeSwitcher />
          
          {/* Bouton de Déconnexion */}
          <button
            onClick={() => logout()}
            className="flex items-center p-2 rounded-lg text-sm font-medium 
                       bg-savoora-danger text-white hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;