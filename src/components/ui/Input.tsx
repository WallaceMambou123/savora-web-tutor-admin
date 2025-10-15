import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <label>
      {label && <span>{label}</span>}
      <input {...props} />
    </label>
  );
}
