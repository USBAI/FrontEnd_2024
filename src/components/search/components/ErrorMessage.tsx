import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center h-64"
    >
      <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg flex items-center gap-3">
        <AlertCircle className="h-5 w-5" />
        <p>{message}</p>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;