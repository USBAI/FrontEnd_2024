import React from 'react';
import { motion } from 'framer-motion';
import { Users, Linkedin, Github, Twitter } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TeamPage = () => {
  const team = [
    {
      name: 'Elias Luzwehimana',
      role: 'Co-Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      bio: 'Leading the vision and strategy for Kluret',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      name: 'Ernest Itangishaka',
      role: 'Co-Founder & CTO',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      bio: 'Driving technical innovation and development',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
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
              <Users className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Meet Our Team
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              The passionate individuals driving innovation at Kluret
            </motion.p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-blue-400 mb-2">{member.role}</p>
                      <p className="text-gray-400 mb-4">{member.bio}</p>
                      <div className="flex items-center gap-4">
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                          <Github className="h-5 w-5" />
                        </a>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-gray-400 mb-6">
              We're always looking for talented individuals to join our mission
            </p>
            <a
              href="mailto:careers@kluret.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;