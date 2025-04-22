import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  type = 'button', 
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  ...props 
}) => {
  const baseStyles = 'btn font-medium transition-all duration-300 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    'outline-primary': 'btn-outline-primary',
    'outline-secondary': 'btn-outline-secondary',
    text: 'bg-transparent text-[var(--color-primary-main)] hover:bg-[var(--color-primary-light)] hover:bg-opacity-10',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1 px-3',
    md: 'py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };
  
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      className={`
        ${baseStyles} 
        ${variantStyles[variant] || variantStyles.primary} 
        ${sizeStyles[size] || sizeStyles.md}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline-primary', 'outline-secondary', 'text']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Button; 