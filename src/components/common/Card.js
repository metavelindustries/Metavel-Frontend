import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  ...props
}) => {
  const baseStyles = 'card bg-white rounded-lg overflow-hidden';
  
  const variantStyles = {
    default: 'shadow-md',
    flat: 'border border-[var(--color-neutral-200)]',
    elevated: 'shadow-lg',
  };
  
  const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
  
  return (
    <div 
      className={`
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.default}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardImage = ({ src, alt = '', className = '', aspectRatio = '16/9', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className={`w-full object-cover`}
        style={{ aspectRatio }}
        {...props}
      />
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'flat', 'elevated']),
  hover: PropTypes.bool,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
};

export default Card; 