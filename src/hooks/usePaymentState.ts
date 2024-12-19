import { useState, useCallback } from 'react';

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface PaymentState {
  status: PaymentStatus;
  paymentId: string | null;
  error: string | null;
}

export const usePaymentState = () => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: 'idle',
    paymentId: null,
    error: null
  });

  const startPayment = useCallback(() => {
    setPaymentState({
      status: 'processing',
      paymentId: null,
      error: null
    });
  }, []);

  const completePayment = useCallback((paymentId: string) => {
    setPaymentState({
      status: 'success',
      paymentId,
      error: null
    });
  }, []);

  const failPayment = useCallback((error: string) => {
    setPaymentState({
      status: 'error',
      paymentId: null,
      error
    });
  }, []);

  const resetPayment = useCallback(() => {
    setPaymentState({
      status: 'idle',
      paymentId: null,
      error: null
    });
  }, []);

  return {
    paymentState,
    startPayment,
    completePayment,
    failPayment,
    resetPayment
  };
};