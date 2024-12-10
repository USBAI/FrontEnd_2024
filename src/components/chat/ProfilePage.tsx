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

  // Check login status on component mount
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
    // Handle navigation to different sections
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
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-50 flex items-center justify-center"
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-6 w-6 text-white/70 hover:text-white" />
      </motion.button>

      <div className="w-full max-w-md px-4">
        <AnimatePresence mode="wait">
          {!showLoginForm && !showRegisterForm ? (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <img
                src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                alt="Kluret"
                className="h-16 mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold text-white mb-8">
                Kluret AI Search Engine
              </h2>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLoginForm(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowRegisterForm(true)}
                  className="w-full py-3 bg-white/10 text-white rounded-lg font-medium"
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
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <div className="text-center mb-8">
                <img
                  src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                  alt="Kluret"
                  className="h-12 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-white mb-2">
                  {showLoginForm ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-400">
                  {showLoginForm ? 'Sign in to continue' : 'Join Kluret AI'}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
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
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 text-white"
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
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 text-white"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
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
                  className="text-sm text-gray-400 hover:text-white"
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