'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@context/AuthContext'; 
import { Loader2, User, Mail, Lock, GraduationCap, BookOpen, Sparkles } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const { register, isLoading, isAuthenticated } = useAuth();
  
  if (isAuthenticated && !isLoading) {
    return null; 
  }

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    const roleId = role === 'student' ? 1 : 2;
    
    try {
      await register({ username, email, password }, roleId);
    } catch (e) {
      // Le toast gère l'affichage des erreurs
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-savoora-primary)]/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-savoora-accent)]/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[var(--color-savoora-primary)]/5 rounded-full blur-2xl animate-[pulse_4s_ease-in-out_infinite]"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card with glassmorphism effect */}
        <div className="
          relative p-8 space-y-6
          bg-[var(--color-bg)]/80 dark:bg-[var(--color-savoora-dark)]/80
          backdrop-blur-xl
          shadow-2xl shadow-black/10
          rounded-2xl 
          border border-[var(--color-savoora-light)]/20
          animate-[fadeInUp_0.6s_ease-out]
        ">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-savoora-primary)] to-[var(--color-savoora-accent)] mb-4 animate-[bounce_2s_ease-in-out_infinite]">
              <Sparkles className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-display font-black bg-gradient-to-r from-[var(--color-savoora-primary)] to-[var(--color-savoora-accent)] bg-clip-text text-transparent">
              Join Savoora
            </h1>
            <p className="text-sm text-[var(--color-savoora-muted)]">
              Start your learning journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-text)]">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`
                    relative overflow-hidden
                    flex flex-col items-center gap-2 py-4 px-3 rounded-xl
                    border-2 transition-all duration-300
                    ${role === 'student' 
                      ? 'border-[var(--color-savoora-primary)] bg-[var(--color-savoora-primary)]/10 scale-105 shadow-lg shadow-[var(--color-savoora-primary)]/20' 
                      : 'border-[var(--color-savoora-light)]/30 hover:border-[var(--color-savoora-primary)]/50 hover:scale-102'
                    }
                  `}
                >
                  <GraduationCap 
                    size={32} 
                    className={role === 'student' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-savoora-muted)]'}
                  />
                  <span className={`text-sm font-semibold ${role === 'student' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-text)]'}`}>
                    Student
                  </span>
                  {role === 'student' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-savoora-primary)]/5 to-transparent pointer-events-none"></div>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`
                    relative overflow-hidden
                    flex flex-col items-center gap-2 py-4 px-3 rounded-xl
                    border-2 transition-all duration-300
                    ${role === 'tutor' 
                      ? 'border-[var(--color-savoora-accent)] bg-[var(--color-savoora-accent)]/10 scale-105 shadow-lg shadow-[var(--color-savoora-accent)]/20' 
                      : 'border-[var(--color-savoora-light)]/30 hover:border-[var(--color-savoora-accent)]/50 hover:scale-102'
                    }
                  `}
                >
                  <BookOpen 
                    size={32} 
                    className={role === 'tutor' ? 'text-[var(--color-savoora-accent)]' : 'text-[var(--color-savoora-muted)]'}
                  />
                  <span className={`text-sm font-semibold ${role === 'tutor' ? 'text-[var(--color-savoora-accent)]' : 'text-[var(--color-text)]'}`}>
                    Tutor
                  </span>
                  {role === 'tutor' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-savoora-accent)]/5 to-transparent pointer-events-none"></div>
                  )}
                </button>
              </div>
            </div>
            
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-[var(--color-text)]">
                Username
              </label>
              <div className={`
                relative flex items-center
                border-2 rounded-lg transition-all duration-300
                ${focusedField === 'username' 
                  ? 'border-[var(--color-savoora-primary)] shadow-md shadow-[var(--color-savoora-primary)]/10' 
                  : 'border-[var(--color-savoora-light)]/30'
                }
              `}>
                <User 
                  size={18} 
                  className={`absolute left-3 transition-colors ${focusedField === 'username' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-savoora-muted)]'}`}
                />
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="johndoe"
                  className="
                    w-full pl-10 pr-4 py-3 bg-transparent
                    text-[var(--color-text)] placeholder-[var(--color-savoora-muted)]
                    focus:outline-none
                  "
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)]">
                Email Address
              </label>
              <div className={`
                relative flex items-center
                border-2 rounded-lg transition-all duration-300
                ${focusedField === 'email' 
                  ? 'border-[var(--color-savoora-primary)] shadow-md shadow-[var(--color-savoora-primary)]/10' 
                  : 'border-[var(--color-savoora-light)]/30'
                }
              `}>
                <Mail 
                  size={18} 
                  className={`absolute left-3 transition-colors ${focusedField === 'email' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-savoora-muted)]'}`}
                />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  className="
                    w-full pl-10 pr-4 py-3 bg-transparent
                    text-[var(--color-text)] placeholder-[var(--color-savoora-muted)]
                    focus:outline-none
                  "
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text)]">
                Password
              </label>
              <div className={`
                relative flex items-center
                border-2 rounded-lg transition-all duration-300
                ${focusedField === 'password' 
                  ? 'border-[var(--color-savoora-primary)] shadow-md shadow-[var(--color-savoora-primary)]/10' 
                  : 'border-[var(--color-savoora-light)]/30'
                }
              `}>
                <Lock 
                  size={18} 
                  className={`absolute left-3 transition-colors ${focusedField === 'password' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-savoora-muted)]'}`}
                />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="
                    w-full pl-10 pr-4 py-3 bg-transparent
                    text-[var(--color-text)] placeholder-[var(--color-savoora-muted)]
                    focus:outline-none
                  "
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                relative w-full py-3.5 rounded-lg
                font-semibold text-white overflow-hidden
                bg-gradient-to-r from-[var(--color-savoora-primary)] to-[var(--color-savoora-accent)]
                hover:shadow-xl hover:shadow-[var(--color-savoora-primary)]/30
                hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                transition-all duration-300
                group
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-savoora-accent)] to-[var(--color-savoora-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Sign Up as {role === 'student' ? 'Student' : 'Tutor'}
                    {role === 'student' ? <GraduationCap size={20} /> : <BookOpen size={20} />}
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="text-center space-y-3 pt-4 border-t border-[var(--color-savoora-light)]/20">
            <p className="text-sm text-[var(--color-savoora-muted)]">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-semibold text-[var(--color-savoora-primary)] hover:text-[var(--color-savoora-accent)] transition-colors"
              >
                Sign In
              </Link>
            </p>
            <p className="text-xs text-[var(--color-savoora-muted)]">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-[var(--color-text)] transition-colors">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-[var(--color-text)] transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;