import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface PaymentOverlayState {
  isOpen: boolean;
  isProcessing: boolean;
  paymentIntentId: string | null;
  returnPath: string | null;
}

const STORAGE_KEY = 'payment_overlay_state';

export const usePaymentOverlay = () => {
  const location = useLocation();
  const [state, setState] = useState<PaymentOverlayState>({
    isOpen: false,
    isProcessing: false,
    paymentIntentId: null,
    returnPath: null
  });

  // Restore state from storage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setState(parsedState);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save state before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (state.isOpen) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...state,
          returnPath: location.pathname + location.search
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state, location]);

  const openOverlay = () => {
    setState(prev => ({
      ...prev,
      isOpen: true,
      returnPath: location.pathname + location.search
    }));
  };

  const closeOverlay = () => {
    setState({
      isOpen: false,
      isProcessing: false,
      paymentIntentId: null,
      returnPath: null
    });
  };

  const startProcessing = (paymentIntentId: string) => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      paymentIntentId
    }));
  };

  const stopProcessing = () => {
    setState(prev => ({
      ...prev,
      isProcessing: false
    }));
  };

  return {
    state,
    openOverlay,
    closeOverlay,
    startProcessing,
    stopProcessing
  };
};