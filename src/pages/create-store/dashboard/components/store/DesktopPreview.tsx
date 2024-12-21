import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const DesktopPreview = () => {
  return (
    <div className="h-full p-6 relative">
      {/* Desktop Monitor Frame */}
      <div className="relative h-full">
        {/* Monitor Screen */}
        <div className="absolute inset-0 bg-gray-800 rounded-2xl p-4">
          {/* Monitor Bezel */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-700">
            <div className="w-2 h-2 rounded-full bg-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Browser Window */}
          <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-700">
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 px-2">
                <div className="bg-white rounded-md h-6 w-full flex items-center px-3">
                  <span className="text-xs text-gray-400">mystore.kluret.com</span>
                </div>
              </div>
            </div>

            {/* Store Content */}
            <div className="h-[calc(100%-2.5rem)] relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20"
                  style={{
                    background: 'linear-gradient(45deg, #ff69b4, #818cf8, #38bdf8)',
                    filter: 'blur(100px)',
                    borderRadius: '50%'
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 1 }}
                  className="w-24 h-24 bg-gradient-to-r from-pink-100 to-blue-100 rounded-full flex items-center justify-center mb-6"
                >
                  <ShoppingBag className="h-12 w-12 text-pink-500" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text mb-4"
                >
                  Your Online Store
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-500 max-w-md"
                >
                  Chat with our AI assistant to customize your store and start selling online.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Monitor Stand */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-20 h-8 bg-gray-700 rounded-t-lg" />
          <div className="w-32 h-2 bg-gray-800 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default DesktopPreview;