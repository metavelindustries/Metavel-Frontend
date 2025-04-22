import React from 'react';
import PropTypes from 'prop-types';

const Section = ({
  children,
  className = '',
  background = 'light',
  containerWidth = true,
  padding = true,
  noTopPadding = false,
  interactive = true,
  ...props
}) => {
  const backgroundStyles = {
    light: 'bg-[var(--color-neutral-50)]',
    white: 'bg-white',
    dark: 'bg-[var(--color-neutral-800)] text-white',
    primary: 'bg-[var(--color-primary-main)] text-white',
    secondary: 'bg-[var(--color-secondary-main)] text-black',
    'gradient-primary': 'bg-gradient-primary text-white',
    'gradient-secondary': 'bg-gradient-secondary text-black',
    'gradient-dark': 'bg-gradient-dark text-white',
  };

  const paddingClass = padding ? 'section-padding' : '';
  const containerClass = containerWidth ? 'container-width' : 'w-full';
  const interactiveClass = interactive ? 'section-interactive' : '';

  return (
    <section
      className={`
        ${backgroundStyles[background] || backgroundStyles.light}
        ${paddingClass}
        ${interactiveClass}
        ${className}
      `}
      {...props}
    >
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
};

export const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  ...props
}) => {
  const alignmentClass = centered ? 'text-center' : 'text-left';

  return (
    <div className={`mb-10 ${alignmentClass} ${className}`} {...props}>
      <h2 className={`heading-2 mb-4 ${titleClassName}`}>{title}</h2>
      {subtitle && <p className={`body-large text-[var(--color-neutral-600)] ${subtitleClassName}`}>{subtitle}</p>}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  background: PropTypes.oneOf([
    'light',
    'white',
    'dark',
    'primary',
    'secondary',
    'gradient-primary',
    'gradient-secondary',
    'gradient-dark',
  ]),
  containerWidth: PropTypes.bool,
  padding: PropTypes.bool,
  noTopPadding: PropTypes.bool,
  interactive: PropTypes.bool,
};

SectionTitle.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  centered: PropTypes.bool,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
};

export default Section; 