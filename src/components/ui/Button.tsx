import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const className = variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary';
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
