import React from 'react';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  padding = 'lg',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;