import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ContactPage = () => {
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
              <Mail className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Contact Us
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Get in touch with our team for any questions or inquiries
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office Location</h3>
                    <p className="text-gray-400">Stockholm, Sweden</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:contact@kluret.com" className="text-blue-400 hover:text-blue-300">
                      contact@kluret.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href="tel:+46701234567" className="text-blue-400 hover:text-blue-300">
                      +46 70 123 4567
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-gray-400">Available 24/7</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  Start Chat
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;