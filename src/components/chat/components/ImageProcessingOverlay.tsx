import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ImageProcessingOverlayProps {
  image: string;
}

const ImageProcessingOverlay: React.FC<ImageProcessingOverlayProps> = ({ image }) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Scanning Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-transparent"
          animate={{
            y: ["0%", "200%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4
            }}
          >
            <Sparkles className="h-3 w-3 text-blue-400" />
          </motion.div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-xl flex items-center justify-center mb-3"
            >
              <Sparkles className="h-6 w-6 text-blue-400" />
            </motion.div>
            <p className="text-sm text-blue-200 font-medium">
              AI Processing Image...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageProcessingOverlay;