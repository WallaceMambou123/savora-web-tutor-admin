'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@context/AuthContext';
import {
  Loader2,
  User,
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  Eye,
  EyeOff,
  ArrowRight,
  Shield
} from 'lucide-react';

const RegisterPage: React.FC = () => {
  const { register, isLoading, isAuthenticated } = useAuth();

  if (isAuthenticated && !isLoading) {
    return null;
  }

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const roleId = role === 'student' ? 1 : 2;

    try {
      await register({ username, email, password }, roleId);
    } catch (e) {
      console.error('Registration error:', e);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">

      {/* ========== LEFT SIDE: ILLUSTRATION ========== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[var(--color-savoora-accent)]/10 via-[var(--color-savoora-primary)]/5 to-transparent">

        {/* Floating Card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-6 p-12 bg-white/5 dark:bg-black/10 backdrop-blur-sm rounded-3xl border border-[var(--color-savoora-light)]/20 shadow-2xl max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-savoora-accent)] to-[var(--color-savoora-primary)] mb-4">
              <GraduationCap size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-display font-black text-[var(--color-text)]">
              Join Our Community
            </h2>
            <p className="text-[var(--color-savoora-muted)] text-lg">
              Whether you're here to learn or teach, your journey to success starts now
            </p>
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-savoora-primary)]">10K+</div>
                <div className="text-xs text-[var(--color-savoora-muted)]">Students</div>
              </div>
              <div className="w-px h-12 bg-[var(--color-savoora-light)]/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-savoora-accent)]">500+</div>
                <div className="text-xs text-[var(--color-savoora-muted)]">Tutors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[var(--color-savoora-accent)]/10 backdrop-blur-md border border-[var(--color-savoora-light)]/20"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full bg-[var(--color-savoora-primary)]/10 backdrop-blur-md border border-[var(--color-savoora-light)]/20"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-[var(--color-savoora-accent)]/5"></div>
      </div>

      {/* ========== RIGHT SIDE: FORM ========== */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 md:px-12 lg:px-20 relative">

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[var(--color-savoora-accent)]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[var(--color-savoora-primary)]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8 relative z-10">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-40 h-40">
              <Image
                src={require("../../assets/logo/4.png")}
                alt="Savoora Logo"
                width={360}
                height={360}
                priority
                className="h-50 w-auto object-contain"
              />
            </div>
            <p className="text-[var(--color-savoora-muted)] text-lg">
              Créer votre compte et commencez votre voyage
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[var(--color-bg)] border border-[var(--color-savoora-light)]/20 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--color-text)]">
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
                        : 'border-[var(--color-savoora-light)]/30 hover:border-[var(--color-savoora-primary)]/50'
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
                        : 'border-[var(--color-savoora-light)]/30 hover:border-[var(--color-savoora-accent)]/50'
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
                  </button>
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-[var(--color-text)]">
                  Username
                </label>
                <div className={`
                  relative flex items-center
                  border-2 rounded-xl transition-all duration-300
                  ${focusedField === 'username'
                    ? 'border-[var(--color-savoora-primary)] shadow-lg shadow-[var(--color-savoora-primary)]/20'
                    : 'border-[var(--color-savoora-light)]/30'
                  }
                `}>
                  <User
                    size={20}
                    className={`absolute left-4 transition-colors ${focusedField === 'username' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-savoora-muted)]'}`}
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
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[var(--color-text)] placeholder-[var(--color-savoora-muted)] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text)]">
                  Email Address
                </label>
                <div className={`
                  relative flex items-center
                  border-2 rounded-xl transition-all duration-300
                  ${focusedField === 'email'
                    ? 'border-[var(--color-savoora-primary)] shadow-lg shadow-[var(--color-savoora-primary)]/20'
                    : 'border-[var(--color-savoora-light)]/30'
                  }
                `}>
                  <Mail
                    size={20}
                    className={`absolute left-4 transition-colors ${focusedField === 'email' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-savoora-muted)]'}`}
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
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[var(--color-text)] placeholder-[var(--color-savoora-muted)] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-text)]">
                  Password
                </label>
                <div className={`
                  relative flex items-center
                  border-2 rounded-xl transition-all duration-300
                  ${focusedField === 'password'
                    ? 'border-[var(--color-savoora-primary)] shadow-lg shadow-[var(--color-savoora-primary)]/20'
                    : 'border-[var(--color-savoora-light)]/30'
                  }
                `}>
                  <Lock
                    size={20}
                    className={`absolute left-4 transition-colors ${focusedField === 'password' ? 'text-[var(--color-savoora-primary)]' : 'text-[var(--color-savoora-muted)]'}`}
                  />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-transparent text-[var(--color-text)] placeholder-[var(--color-savoora-muted)] focus:outline-none rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-[var(--color-savoora-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-[var(--color-savoora-muted)] mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--color-savoora-accent)] to-[var(--color-savoora-primary)] hover:shadow-2xl hover:shadow-[var(--color-savoora-accent)]/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    <>
                      Create Account as {role === 'student' ? 'Student' : 'Tutor'}
                      {role === 'student' ? <GraduationCap size={20} /> : <BookOpen size={20} />}
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-savoora-light)]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[var(--color-bg)] text-[var(--color-savoora-muted)]">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link href="/login">
              <button className="w-full py-3.5 rounded-xl font-semibold border-2 border-[var(--color-savoora-primary)] text-[var(--color-savoora-primary)] hover:bg-[var(--color-savoora-primary)]/5 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                Sign In Instead
                <ArrowRight size={18} />
              </button>
            </Link>

            {/* Terms */}
            <p className="text-xs text-center text-[var(--color-savoora-muted)] mt-4">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-[var(--color-text)] transition-colors">
                Terms
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-[var(--color-text)] transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-xs text-[var(--color-savoora-muted)]">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-[var(--color-savoora-success)]" />
              <span>Secure Registration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={14} className="text-[var(--color-savoora-success)]" />
              <span>SSL Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;