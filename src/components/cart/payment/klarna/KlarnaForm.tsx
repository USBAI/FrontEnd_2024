import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import KlarnaFeatures from './KlarnaFeatures';
import KlarnaHeader from './KlarnaHeader';

interface KlarnaFormProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const KlarnaForm: React.FC<KlarnaFormProps> = ({ isSubmitting, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <KlarnaHeader />
        <KlarnaFeatures />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#FFB3C7] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#FF9FB7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            Continue with Klarna
            <Lock className="h-5 w-5" />
          </>
        )}
      </motion.button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="h-4 w-4" />
        <p>Secure payment processed by Klarna</p>
      </div>
    </form>
  );
};

export default KlarnaForm;