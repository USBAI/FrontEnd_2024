import React from 'react';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

interface KlarnaLoadingProps {
  isCartLoading: boolean;
}

const KlarnaLoading = ({ isCartLoading }: KlarnaLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">
        {isCartLoading ? 'Loading cart...' : 'Initializing Klarna payment...'}
      </p>
    </div>
  );
};

export default KlarnaLoading;