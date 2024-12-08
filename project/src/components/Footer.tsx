import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'How Kluret works', href: '/#___how_itworks__9jer4' },
        { label: 'FAQs', href: '/faq' },
        { label: 'Report a Problem', href: 'mailto:hej@kluret.se' },
        { label: 'Terms & Conditions', href: '/policy' },
        { label: 'Kluret Chat', href: '/chat' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Our Team', href: '/team' },
        { label: 'Partners', href: '/partner' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { label: 'API Documentation', href: '/docs' },
        { label: 'Integration Guide', href: '/integration' },
        { label: 'Status', href: '/status' },
      ],
    },
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/kluret_network/', 
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    { 
      icon: MessageCircle, // Using MessageCircle instead of TikTok since it's not available
      href: 'https://www.tiktok.com/@kluret_ab', 
      label: 'TikTok',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Mail, 
      href: 'mailto:hej@kluret.se', 
      label: 'Email',
      color: 'hover:text-purple-400'
    },
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-purple-950/10 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Logo and Description */}
          <div className="space-y-6">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg" 
              alt="Kluret" 
              className="h-8 w-auto"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing online shopping with AI-powered product search, making it easier for everyone to find exactly what they're looking for.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm group"
                    >
                      {link.label}
                      {link.href.startsWith('http') && (
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Kluret. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;