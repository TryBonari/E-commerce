import React from 'react';

export const Button = ({ variant = 'primary', children, ...props }) => {
  const base = 'h-12 px-6 rounded-sm font-medium transition-colors cursor-pointer text-base';
  const styles = {
    primary: 'bg-cta text-cta-ink hover:bg-cta-hover focus:outline-2 focus:outline-blue-400 focus:outline-offset-2',
    secondary: 'bg-transparent border border-ink text-ink hover:bg-paper-2',
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
