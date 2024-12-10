import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm mb-8"
        >
          <Search className="h-8 w-8 text-blue-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="text-7xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
          <p className="text-xl text-gray-400 mb-8">
            Oops! The page you're looking for seems to have wandered off into cyberspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </motion.button>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
              >
                Return Home
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Animated 404 Text */}
        <motion.div
          className="absolute -z-10 inset-0 opacity-5 select-none pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-9xl font-bold"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            >
              404
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;