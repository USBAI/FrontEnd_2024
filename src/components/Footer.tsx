import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, ExternalLink } from 'lucide-react';

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
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/kluret_ai/', 
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    { 
      icon: Mail, 
      href: 'mailto:hej@kluret.se', 
      label: 'Email',
      color: 'hover:text-purple-500'
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-50/20 via-blue-50/10 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-16">
          {/* Logo and Description */}
          <div className="space-y-6">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="50" fill="black"/>
              <rect x="42" y="15" width="50" height="50" rx="25" fill="white"/>
              <path d="M1.5 62H98.5V62C98.2174 65.3914 95.3823 68 91.9792 68H8.02079C4.61764 68 1.78261 65.3914 1.5 62V62Z" fill="white"/>
            </svg>

            <p className="text-gray-600 text-sm leading-relaxed">
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
                  className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
              <motion.a
                href="https://www.tiktok.com/@kluret_ab"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
              >
                <img
                  src="https://www.svgrepo.com/show/452114/tiktok.svg"
                  alt="TikTok"
                  className="h-5 w-5"
                />
              </motion.a>
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
              <h3 className="text-gray-900 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 text-sm group"
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
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Kluret. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
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
