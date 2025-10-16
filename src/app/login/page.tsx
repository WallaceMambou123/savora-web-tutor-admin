// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@context/AuthContext'; 
import { Loader2 } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Rediriger si déjà authentifié (la redirection par rôle est gérée dans AuthProvider)
  if (isAuthenticated && !isLoading) {
    // Note: Le AuthProvider se charge de rediriger vers /admin, /tutor ou /
    return null; 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    try {
      await login({ email, password }); 
    } catch (e) {
      // Le toast a déjà affiché l'erreur
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
                    // Le fond de l'écran est géré par le body dans globals.css
                    p-4">
      
      <div className="w-full max-w-md p-8 space-y-6 
                      bg-savoora-light dark:bg-savoora-dark 
                      shadow-2xl rounded-xl border border-savoora-muted/50">
        
        <h1 className="text-3xl font-display font-black text-center text-savoora-primary">
          SAVOORA Connexion
        </h1>
        <p className="text-center text-sm text-savoora-muted">
          Accès Réservé. Utilisez vos identifiants.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Champ Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-savoora-dark dark:text-savoora-light"
            >
              Adresse Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-savoora-muted/50 rounded-md 
                         shadow-sm placeholder-savoora-muted dark:bg-savoora-dark dark:text-savoora-light 
                         focus:outline-none focus:ring-savoora-primary focus:border-savoora-primary"
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-savoora-dark dark:text-savoora-light"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-savoora-muted/50 rounded-md 
                         shadow-sm placeholder-savoora-muted dark:bg-savoora-dark dark:text-savoora-light 
                         focus:outline-none focus:ring-savoora-primary focus:border-savoora-primary"
            />
          </div>

          {/* Bouton de Connexion */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white 
                       bg-savoora-primary hover:opacity-90 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 focus:ring-savoora-primary disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              'Se Connecter'
            )}
          </button>
        </form>

        <div className="text-center text-sm">
          <Link href="/register" className="font-medium text-savoora-primary hover:opacity-90">
            Créer un compte (Élève/Tuteur)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;