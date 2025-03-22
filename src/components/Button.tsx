import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200';
  const variants = {
    primary: `bg-indigo-600 text-white hover:bg-indigo-700 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`,
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}