'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@context/AuthContext';
import { 
  Loader2, 
  Mail, 
  Lock, 
  LogIn, 
  Shield, 
  Eye, 
  EyeOff,
  Sparkles,
  ArrowRight 
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  if (isAuthenticated && !isLoading) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      await login({ email, password });
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      
      {/* ========== LEFT SIDE: FORM ========== */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 md:px-12 lg:px-20 relative">
        
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--color-savoora-primary)]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[var(--color-savoora-accent)]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
          
          {/* Logo & Header */}
          <div className="text-center m-0">
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
          </div>

          {/* Form Card */}
          <div className="bg-[var(--color-bg)] border border-[var(--color-savoora-light)]/20 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-[var(--color-text)]"
                >
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
                    className={`absolute left-4 transition-colors ${
                      focusedField === 'email' 
                        ? 'text-[var(--color-savoora-primary)]' 
                        : 'text-[var(--color-savoora-muted)]'
                    }`}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="john.doe@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[var(--color-text)] placeholder-[var(--color-savoora-muted)] focus:outline-none rounded-xl"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-semibold text-[var(--color-text)]"
                  >
                    Password
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs font-medium text-[var(--color-savoora-primary)] hover:text-[var(--color-savoora-accent)] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                    className={`absolute left-4 transition-colors ${
                      focusedField === 'password' 
                        ? 'text-[var(--color-savoora-primary)]' 
                        : 'text-[var(--color-savoora-muted)]'
                    }`}
                  />
                  <input
                    id="password"
                    name="password"
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-[var(--color-savoora-light)] text-[var(--color-savoora-primary)] focus:ring-2 focus:ring-[var(--color-savoora-primary)]/30 cursor-pointer"
                  />
                  <span className="text-sm text-[var(--color-savoora-muted)] group-hover:text-[var(--color-text)] transition-colors">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--color-savoora-primary)] to-[var(--color-savoora-accent)] hover:shadow-2xl hover:shadow-[var(--color-savoora-primary)]/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing you in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <LogIn size={20} />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-savoora-light)]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[var(--color-bg)] text-[var(--color-savoora-muted)]">
                  New to Savoora?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link href="/register">
              <button className="w-full py-3.5 rounded-xl font-semibold border-2 border-[var(--color-savoora-primary)] text-[var(--color-savoora-primary)] hover:bg-[var(--color-savoora-primary)]/5 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                Create Your Account
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center p-5 gap-6 text-xs text-[var(--color-savoora-muted)]">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-[var(--color-savoora-success)]" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={14} className="text-[var(--color-savoora-success)]" />
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== RIGHT SIDE: ILLUSTRATION ========== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[var(--color-savoora-primary)]/10 via-[var(--color-savoora-accent)]/5 to-transparent">
        
        {/* Floating Card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-6 p-12 bg-white/5 dark:bg-black/10 backdrop-blur-sm rounded-3xl border border-[var(--color-savoora-light)]/20 shadow-2xl">
            <Sparkles size={48} className="mx-auto text-[var(--color-savoora-primary)]" />
            <h2 className="text-3xl font-display font-black text-[var(--color-text)]">
              Start Your Journey
            </h2>
            <p className="text-[var(--color-savoora-muted)] text-lg max-w-md">
              Join thousands of learners and tutors building their future
            </p>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[var(--color-savoora-primary)]/10 backdrop-blur-md border border-[var(--color-savoora-light)]/20"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 rounded-full bg-[var(--color-savoora-accent)]/10 backdrop-blur-md border border-[var(--color-savoora-light)]/20"></div>
      </div>
    </div>
  );
};

export default LoginPage;