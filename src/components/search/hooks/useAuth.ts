import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCallback, setAuthCallback] = useState<(() => void) | null>(null);

  const checkAuth = useCallback((callback: () => void) => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      callback();
    } else {
      setAuthCallback(() => callback);
      setShowAuthModal(true);
    }
  }, []);

  const handleAuthSuccess = useCallback(() => {
    if (authCallback) {
      authCallback();
      setAuthCallback(null);
    }
  }, [authCallback]);

  return {
    showAuthModal,
    setShowAuthModal,
    checkAuth,
    handleAuthSuccess
  };
};