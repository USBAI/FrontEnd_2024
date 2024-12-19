import React from 'react';
import LoadingSpinner from '../../../ui/LoadingSpinner';

const KlarnaLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Initializing Klarna payment...</p>
    </div>
  );
};

export default KlarnaLoading;