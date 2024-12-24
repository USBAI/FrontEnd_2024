import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ProjectFile {
  name: string;
  type: string;
  content: string;
}

interface StoreRendererProps {
  files: ProjectFile[];
}

const StoreRenderer = ({ files }: StoreRendererProps) => {
  const homepageFile = files.find(file => file.name === 'homepage.tsx');

  if (!homepageFile) {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center p-8 text-center">
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
          Create Your Online Store
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 max-w-md"
        >
          Let our AI help you build and manage your perfect online store in minutes. Start by chatting with our assistant.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all group"
        >
          Start Building
          <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              ${homepageFile.content}
              ReactDOM.render(<App />, document.getElementById('root'));
            </script>
            <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
          </body>
        </html>
      `}
      className="w-full h-full border-0"
      title="Store Preview"
      sandbox="allow-scripts"
    />
  );
};