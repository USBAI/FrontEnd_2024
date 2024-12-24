import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Loader2, Check, X } from 'lucide-react';
import UserProfile from '../profile/UserProfile';

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isOpen, onClose }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/users/login_authorizer/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user_id', data.user_id);
        setIsLoggedIn(true);
        setShowLoginForm(false);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setShowLoginForm(false);
    onClose();
  };

  const handleNavigate = (section: string) => {
    console.log('Navigating to:', section);
  };

  if (!isOpen) return null;

  if (isLoggedIn) {
    return (
      <UserProfile
        onClose={onClose}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 flex items-center justify-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50" />
        
        {/* Animated Waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
              style={{
                transform: `translate(${-50 + i * 25}%, ${-50 + i * 25}%) scale(${1.5 + i * 0.2})`
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
      >
        <X className="h-6 w-6 text-gray-600" />
      </motion.button>

      <div className="w-full max-w-md px-4 relative z-10">
        <AnimatePresence mode="wait">
          {!showLoginForm && !showRegisterForm ? (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <svg width="64" height="64" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
                <rect width="22" height="22" rx="11" fill="url(#paint0_linear_0_1)"/>
                <path d="M0.128418 12.32L21.6595 12.8032V12.8032C21.5887 15.9615 18.9709 18.4643 15.8126 18.3934L5.71863 18.1669C2.56036 18.096 0.0575377 15.4783 0.128418 12.32V12.32Z" fill="url(#paint1_linear_0_1)"/>
                <rect x="9" y="3" width="11" height="11" rx="5.5" fill="white"/>
                <defs>
                  <linearGradient id="paint0_linear_0_1" x1="4.51" y1="2.53" x2="18.26" y2="19.69" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EFF0FF"/>
                    <stop offset="0.55" stopColor="#C9B8FC"/>
                    <stop offset="0.986587" stopColor="#FFBAF6"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_0_1" x1="12.0269" y1="18.3714" x2="12.6321" y2="12.2372" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E7B4FF" stopOpacity="0.22"/>
                    <stop offset="1" stopColor="#8330E8"/>
                  </linearGradient>
                </defs>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Kluret AI Search Engine
              </h2>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLoginForm(true)}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowRegisterForm(true)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  Register
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={showLoginForm ? 'login' : 'register'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="text-center mb-8">
                <svg width="48" height="48" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
                  <rect width="22" height="22" rx="11" fill="url(#paint0_linear_0_1)"/>
                  <path d="M0.128418 12.32L21.6595 12.8032V12.8032C21.5887 15.9615 18.9709 18.4643 15.8126 18.3934L5.71863 18.1669C2.56036 18.096 0.0575377 15.4783 0.128418 12.32V12.32Z" fill="url(#paint1_linear_0_1)"/>
                  <rect x="9" y="3" width="11" height="11" rx="5.5" fill="white"/>
                  <defs>
                    <linearGradient id="paint0_linear_0_1" x1="4.51" y1="2.53" x2="18.26" y2="19.69" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EFF0FF"/>
                      <stop offset="0.55" stopColor="#C9B8FC"/>
                      <stop offset="0.986587" stopColor="#FFBAF6"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_0_1" x1="12.0269" y1="18.3714" x2="12.6321" y2="12.2372" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E7B4FF" stopOpacity="0.22"/>
                      <stop offset="1" stopColor="#8330E8"/>
                    </linearGradient>
                  </defs>
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {showLoginForm ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-500">
                  {showLoginForm ? 'Sign in to continue' : 'Join Kluret AI'}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email address"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500/50 text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Password"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500/50 text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : showLoginForm ? (
                    'Sign In'
                  ) : (
                    <>
                      Create Account
                      <Check className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setShowLoginForm(false);
                    setShowRegisterForm(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Back to options
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfilePage;