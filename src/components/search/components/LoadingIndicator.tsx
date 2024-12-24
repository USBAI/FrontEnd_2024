import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingIndicator;