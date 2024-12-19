import { useState, useCallback } from 'react';

interface UseKlarnaPaymentProps {
  total: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const useKlarnaPayment = ({ total, onSuccess, onError }: UseKlarnaPaymentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const initializePayment = useCallback(async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      onError('User not authenticated');
      return;
    }

    try {
      // Ensure minimum amount of 3 SEK
      if (total < 3) {
        throw new Error('Minimum order amount is 3 kr');
      }

      const response = await fetch('http://127.0.0.1:8013/klarna_pay/create-klarna-payment-intent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          total_cost: total.toString(),
          currency: 'sek'
        })
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        // If we get a payment_link, use it directly
        if (data.payment_link) {
          setPaymentUrl(data.payment_link);
        }
        // If we get a client_secret, construct the Klarna URL
        else if (data.client_secret) {
          const klarnaUrl = `https://js.playground.klarna.com/payments/${data.client_secret}`;
          setPaymentUrl(klarnaUrl);
        } else {
          throw new Error('Invalid payment response');
        }
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Error initializing Klarna:', error);
      onError(error instanceof Error ? error.message : 'Failed to initialize Klarna payment');
      setPaymentUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, [total, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !paymentUrl) return;

    setIsSubmitting(true);

    try {
      // Store current page state
      localStorage.setItem('payment_return_url', window.location.href);
      localStorage.setItem('payment_form_state', JSON.stringify({
        total,
        timestamp: Date.now()
      }));

      // Open Klarna payment in same tab
      window.location.href = paymentUrl;
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isLoading,
    isSubmitting,
    handleSubmit,
    initializePayment,
    paymentUrl
  };
};