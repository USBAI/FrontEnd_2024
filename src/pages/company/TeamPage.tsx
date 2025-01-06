import React from 'react';
import { motion } from 'framer-motion';
import { Users, Linkedin, Github, Twitter } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import eliasLuzwehimana from './images/eliasluzwehimana.png';
import ernestItangishaka from './images/ernestitangishaka.png';

const TeamPage = () => {
  const team = [
    {
      name: 'Elias Luzwehimana',
      role: 'Co-Founder & CEO',
      image: eliasLuzwehimana,
      bio: 'Driving technical innovation and development',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      name: 'Ernest Itangishaka',
      role: 'Co-Founder & SEO - Business Developer',      
      image: ernestItangishaka,
      bio: 'Leading the vision and strategy for Kluret',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    }
  ];

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
              className="inline-block p-3 rounded-2xl bg-blue-100 backdrop-blur-sm mb-8"
            >
              <Users className="h-8 w-8 text-blue-500" />
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
              className="text-xl text-gray-600 max-w-3xl mx-auto"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gray-100 backdrop-blur-sm p-6 rounded-xl border border-gray-300">
                  <div className="flex items-center gap-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-blue-500 mb-2">{member.role}</p>
                      <p className="text-gray-600 mb-4">{member.bio}</p>
                      {/* <div className="flex items-center gap-4">
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                          <Github className="h-5 w-5" />
                        </a>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div> */}
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
            className="bg-gray-100 backdrop-blur-xl rounded-2xl p-8 border border-gray-300 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals to join our mission
            </p>
            <a
              href="mailto:careers@kluret.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Reach out to us
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
