import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface ProjectFile {
  name: string;
  type: string;
  content: string;
}

interface StoreContentProps {
  files: ProjectFile[];
  isLoading: boolean;
  error: string | null;
}

const StoreContent = ({ files, isLoading, error }: StoreContentProps) => {
  const homepageFile = files.find(file => file.name === 'homepage.tsx');

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="h-[calc(100%-2.5rem)] relative">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(255,105,180,0.1), rgba(59,130,246,0.1))',
            'linear-gradient(225deg, rgba(255,105,180,0.1), rgba(59,130,246,0.1))',
            'linear-gradient(45deg, rgba(255,105,180,0.1), rgba(59,130,246,0.1))',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Content */}
      <div className="relative h-full p-8">
        {homepageFile ? (
          <div className="h-full overflow-auto">
            <pre className="text-sm">
              <code className="language-typescript">
                {homepageFile.content}
              </code>
            </pre>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className="w-24 h-24 bg-gradient-to-r from-pink-100 to-blue-100 rounded-full flex items-center justify-center mb-6"
            >
              <ShoppingBag className="h-12 w-12 text-pink-500" />
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text mb-4">
              Store Under Construction
            </h2>
            <p className="text-gray-500">
              Your store files are being prepared. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreContent;