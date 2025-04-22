import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium';
  
  const variantStyles = {
    primary: 'bg-[var(--color-primary-main)] text-white',
    secondary: 'bg-[var(--color-secondary-main)] text-black',
    success: 'bg-[var(--color-status-success)] text-white',
    warning: 'bg-[var(--color-status-warning)] text-white',
    danger: 'bg-[var(--color-status-error)] text-white',
    info: 'bg-[var(--color-status-info)] text-white',
    light: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-800)]',
    dark: 'bg-[var(--color-neutral-800)] text-white',
    'outline-primary': 'bg-transparent border border-[var(--color-primary-main)] text-[var(--color-primary-main)]',
    'outline-secondary': 'bg-transparent border border-[var(--color-secondary-main)] text-[var(--color-secondary-main)]',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };
  
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  
  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${roundedStyles[rounded] || roundedStyles.full}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
    'light',
    'dark',
    'outline-primary',
    'outline-secondary',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  className: PropTypes.string,
};

export default Badge; 