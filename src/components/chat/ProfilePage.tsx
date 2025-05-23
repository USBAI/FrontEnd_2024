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
      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/users/login_authorizer/', {
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/users/register_user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setShowRegisterForm(false);
      } else {
        setError(data.message || 'Registration failed');
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50" />
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

      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50 cursor-pointer"
      >
        <X className="h-6 w-6 text-gray-600" />
      </button>

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
                  className="w-full py-3 bg-black text-white rounded-lg font-medium"
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
              className="rounded-2xl"
            >
              <div className="text-center mb-8">
                <div className='flex w-full aline-center justify-center'>
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" rx="50" fill="black"/>
                    <rect x="42" y="15" width="50" height="50" rx="25" fill="white"/>
                    <path d="M1.5 62H98.5V62C98.2174 65.3914 95.3823 68 91.9792 68H8.02079C4.61764 68 1.78261 65.3914 1.5 62V62Z" fill="white"/>
                  </svg>
                </div>
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

              <form onSubmit={showLoginForm ? handleLogin : handleRegister} className="space-y-6">
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

                {!showLoginForm && (
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm Password"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500/50 text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>
                )}

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
