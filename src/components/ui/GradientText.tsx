import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText = ({ children, className = '' }: GradientTextProps) => {
  return (
    <span className={`bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-transparent bg-clip-text ${className}`}>
      {children}
    </span>
  );
};

export default GradientText;