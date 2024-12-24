import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface TermsAndConditionsProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

const TermsAndConditions = ({ accepted, onChange }: TermsAndConditionsProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="relative flex-shrink-0 mt-1">
        <input
          type="checkbox"
          className="sr-only"
          checked={accepted}
          onChange={(e) => onChange(e.target.checked)}
          required
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(!accepted)}
          className={`w-5 h-5 rounded border-2 cursor-pointer transition-colors ${
            accepted 
              ? 'bg-blue-500 border-blue-500' 
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {accepted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center h-full"
            >
              <Check className="h-3 w-3 text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
      <label className="text-sm text-gray-600 cursor-pointer">
        I agree to the{' '}
        <a href="/terms" className="text-blue-500 hover:text-blue-600">Terms & Conditions</a>
        {' '}and{' '}
        <a href="/privacy" className="text-blue-500 hover:text-blue-600">Privacy Policy</a>
      </label>
    </div>
  );
};

export default TermsAndConditions;