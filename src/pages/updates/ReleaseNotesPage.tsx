import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Tag, ArrowRight, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const releases = [
  {
    version: '2.4.0',
    date: '2024-03-15',
    type: 'major',
    changes: [
      {
        type: 'feature',
        title: 'Enhanced Search Algorithm',
        description: 'Improved product matching accuracy and performance'
      },
      {
        type: 'improvement',
        title: 'UI Updates',
        description: 'Refreshed user interface with better accessibility'
      },
      {
        type: 'fix',
        title: 'Search Results Pagination',
        description: 'Fixed an issue with pagination in search results'
      }
    ]
  },
  {
    version: '2.3.1',
    date: '2024-03-01',
    type: 'patch',
    changes: [
      {
        type: 'fix',
        title: 'Performance Optimization',
        description: 'Improved loading times for search results'
      },
      {
        type: 'improvement',
        title: 'Mobile Responsiveness',
        description: 'Enhanced mobile view adaptability'
      }
    ]
  }
];

const getChangeTypeIcon = (type: string) => {
  switch (type) {
    case 'feature':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'improvement':
      return <Info className="h-4 w-4 text-blue-500" />;
    case 'fix':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return null;
  }
};

const ReleaseNotesPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm mb-8"
            >
              <FileText className="h-8 w-8 text-blue-500" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Release{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Notes
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Detailed changelog of all updates and improvements
            </motion.p>
          </div>

          {/* Releases Timeline */}
          <div className="space-y-8 mb-16">
            {releases.map((release, index) => (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-gray-300/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-900/10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-blue-500" />
                      <span className="text-lg font-bold">v{release.version}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {release.date}
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      release.type === 'major' 
                        ? 'bg-purple-500/20 text-purple-500'
                        : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {release.type.charAt(0).toUpperCase() + release.type.slice(1)} Release
                    </span>
                  </div>

                  <div className="space-y-4">
                    {release.changes.map((change, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-white/5 rounded-lg"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getChangeTypeIcon(change.type)}
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{change.title}</h4>
                          <p className="text-sm text-gray-600">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Archive Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-300/10 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Looking for older releases?</h2>
            <p className="text-gray-600 mb-6">
              View our complete changelog archive for a full history of updates
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2">
              View Archive
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReleaseNotesPage;
