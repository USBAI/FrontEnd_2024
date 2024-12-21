import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="h-full flex items-center justify-center bg-white p-8 text-center">
      <div>
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-red-500 mb-2">Failed to load preview</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    </div>
  );
};

export default ErrorState;