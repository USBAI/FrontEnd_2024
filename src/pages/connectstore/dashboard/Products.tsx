import React from 'react';
import { motion } from 'framer-motion';

const Products = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>

      {/* Website Preview Section */}
      <div className="relative mb-12 py-16">
        {/* Animated Globe Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-pink-200/20"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1.1, 1, 1.1]
            }}
            transition={{ 
              rotate: {
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10"
          />
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400/50 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.5, 0.1],
                x: Math.cos(i * Math.PI / 10) * 300 + window.innerWidth / 2,
                y: Math.sin(i * Math.PI / 10) * 300 + window.innerHeight / 2,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Mac-style Frame */}
        <div className="relative max-w-5xl mx-auto">
          {/* Mac Window Frame */}
          <div className="bg-gray-800 rounded-t-xl p-1">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          
          {/* Website Content */}
          <div className="bg-white aspect-[16/10] rounded-b-xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
              src="https://kluret.se"
              className="w-full h-full"
              title="Store Preview"
            />
          </div>
        </div>

        {/* AI Scan Status */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-pink-100"
          >
            <span className="text-gray-600">
              Kluret AI has scanned <span className="font-bold text-pink-500">103,023</span> products from your store
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;