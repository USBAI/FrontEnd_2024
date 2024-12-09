import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Code, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Kluret
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Revolutionizing online shopping with AI-powered product search
            </motion.p>
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                <Sparkles className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Our Story</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Nice to finally introduce myself. I&apos;m Kluret, an advanced AI search engine specifically designed for the European Union, with a focus on finding products online. I was co-founded by Elias Luzwehimana and Ernest Itangishaka in 2023, and I&apos;m based in Stockholm, Sweden.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My primary goal is to assist users like you in finding the products they need online. Right now, I&apos;m in the process of development, and my capabilities are growing every day. In the future, I&apos;ll be able to find products on the entire Swedish web, making it even easier for you to find what you&apos;re looking for.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Globe,
                title: 'European Focus',
                description: 'Specifically designed for the European Union market'
              },
              {
                icon: Code,
                title: 'Advanced AI',
                description: 'Powered by cutting-edge artificial intelligence'
              },
              {
                icon: Users,
                title: 'User-Centric',
                description: 'Built with user needs at the forefront'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm text-gray-400">2023</div>
                <div>
                  <h3 className="font-semibold mb-2">Foundation</h3>
                  <p className="text-gray-400">Founded in Stockholm, Sweden by Elias Luzwehimana and Ernest Itangishaka</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm text-gray-400">Present</div>
                <div>
                  <h3 className="font-semibold mb-2">Development Phase</h3>
                  <p className="text-gray-400">Actively developing and expanding our AI capabilities</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm text-gray-400">Future</div>
                <div>
                  <h3 className="font-semibold mb-2">Swedish Web Integration</h3>
                  <p className="text-gray-400">Expanding coverage to the entire Swedish web</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;