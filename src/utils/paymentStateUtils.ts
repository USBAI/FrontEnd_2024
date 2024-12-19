/**
 * Utilities for managing payment state persistence
 */

export interface PaymentState {
  paymentIntentId: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  timestamp: number;
}

const PAYMENT_STATE_KEY = 'kluret_payment_state';

export const savePaymentState = (state: PaymentState) => {
  localStorage.setItem(PAYMENT_STATE_KEY, JSON.stringify(state));
};

export const getPaymentState = (): PaymentState | null => {
  const state = localStorage.getItem(PAYMENT_STATE_KEY);
  return state ? JSON.parse(state) : null;
};

export const clearPaymentState = () => {
  localStorage.removeItem(PAYMENT_STATE_KEY);
};

export const isPaymentStateFresh = (state: PaymentState): boolean => {
  // Payment state expires after 30 minutes
  const EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
  return Date.now() - state.timestamp < EXPIRY_TIME;
};