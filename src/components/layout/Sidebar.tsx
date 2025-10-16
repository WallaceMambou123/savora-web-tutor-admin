// src/components/layout/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, BookOpen } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext'; 

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Modération Tuteurs', href: '/admin/tutors', icon: Users },
    { name: 'Modération Cours', href: '/admin/courses', icon: BookOpen },
    // Ajoutez d'autres liens ici
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <aside className="w-64 min-h-screen p-4 
                      bg-savoora-dark text-savoora-light 
                      sticky top-0 shadow-lg font-sans">
      
      <div className="text-2xl font-display font-black text-savoora-primary mb-8 border-b border-savoora-muted/50 pb-4">
        Savoora Admin
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="flex items-center p-3 rounded-lg text-sm font-medium 
                       hover:bg-savoora-primary/20 transition-colors"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-4 text-xs text-savoora-muted">
        Connecté en tant que : {user?.username}
      </div>
    </aside>
  );
};

export default Sidebar;