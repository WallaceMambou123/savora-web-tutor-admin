// src/components/layout/AdminLayout.tsx
'use client';

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar'; 
import Header from './Header';   

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    // La couleur de fond/texte est gérée par le body dans globals.css
    <div className={`min-h-screen flex font-sans`}>
      
      {/* 1. Barre Latérale (Navigation Fixe) */}
      <Sidebar />

      {/* 2. Conteneur Principal (Contenu de la page) */}
      <div className="flex flex-col flex-1">
        
        {/* 2.1. Barre de Navigation Supérieure/Header */}
        <Header />

        {/* 2.2. Contenu de la Page */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;