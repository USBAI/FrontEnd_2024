import React from 'react';

interface KlarnaErrorProps {
  onRetry: () => void;
}

const KlarnaError: React.FC<KlarnaErrorProps> = ({ onRetry }) => {
  return (
    <div className="text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p className="text-red-600">Failed to load Klarna payment. Please try again.</p>
      </div>
      <button
        onClick={onRetry}
        className="text-blue-500 hover:text-blue-600 underline"
      >
        Retry
      </button>
    </div>
  );
};

export default KlarnaError;