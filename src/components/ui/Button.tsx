// src/components/ui/Button.tsx
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--color-savoora-primary)] text-white hover:bg-[var(--color-savoora-primary)]/90 focus:ring-[var(--color-savoora-primary)]',
    secondary: 'bg-[var(--color-savoora-accent)] text-white hover:bg-[var(--color-savoora-accent)]/90 focus:ring-[var(--color-savoora-accent)]',
    outline: 'border-2 border-[var(--color-savoora-primary)] text-[var(--color-savoora-primary)] hover:bg-[var(--color-savoora-primary)]/10 focus:ring-[var(--color-savoora-primary)]',
    ghost: 'text-[var(--color-text)] hover:bg-[var(--color-savoora-light)]/50 focus:ring-[var(--color-savoora-primary)]',
    danger: 'bg-[var(--color-savoora-danger)] text-white hover:bg-[var(--color-savoora-danger)]/90 focus:ring-[var(--color-savoora-danger)]',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
