import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const LaptopPreview = () => {
  return (
    <div className="h-full p-6 relative">
      {/* Laptop Frame */}
      <div className="relative h-full">
        {/* Laptop Screen */}
        <div className="absolute inset-0 bg-gray-800 rounded-2xl p-2">
          {/* Browser Chrome */}
          <div className="bg-gray-700 rounded-t-xl p-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 px-2">
                <div className="bg-gray-600 rounded-md h-6 w-full" />
              </div>
            </div>
          </div>

          {/* Store Preview */}
          <div className="bg-white h-[calc(100%-2.5rem)] rounded-b-xl p-4 relative overflow-hidden">
            {/* Background Animation */}
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
            <div className="relative h-full flex flex-col items-center justify-center text-center">
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
                Create Your Store in Minutes
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 max-w-md"
              >
                Let our AI guide you through building your perfect online store. Start by chatting with our assistant on the left.
              </motion.p>

              {/* Floating Elements Animation */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, ${i % 2 === 0 ? '#ff69b4' : '#38bdf8'}, ${i % 2 === 0 ? '#818cf8' : '#ff69b4'})`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, i % 2 === 0 ? 10 : -10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${20 + i * 15}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Laptop Base */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-2 bg-gray-700 rounded-b-xl" />
      </div>
    </div>
  );
};

export default LaptopPreview;