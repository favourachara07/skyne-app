import React from 'react';

// Button variants: primary, secondary, outline
const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props 
}:{
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md transition duration-200 focus:outline-none';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const variantClasses = {
    primary: 'bg-amber-800 text-white hover:bg-amber-900 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50',
    secondary: 'bg-amber-100 text-amber-800 hover:bg-amber-200 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50',
    outline: 'bg-transparent border border-amber-800 text-amber-800 hover:bg-amber-50 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50',
    ghost: 'bg-transparent text-amber-800 hover:bg-amber-50 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;