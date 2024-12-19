import { Stripe } from '@stripe/stripe-js';

interface PaymentRedirectOptions {
  stripe: Stripe;
  redirectUrl: string;
  paymentIntentId: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export const handlePaymentRedirect = async ({
  stripe,
  redirectUrl,
  paymentIntentId,
  onSuccess,
  onError
}: PaymentRedirectOptions): Promise<boolean> => {
  try {
    // Save current state
    localStorage.setItem('current_payment_intent', paymentIntentId);
    localStorage.setItem('payment_return_url', window.location.href);

    // Open payment window in new tab
    const popup = window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    if (!popup) {
      throw new Error('Please allow popups for this site');
    }

    // Start polling for payment status
    const pollInterval = setInterval(async () => {
      try {
        const result = await stripe.retrievePaymentIntent(paymentIntentId);
        
        if (result.paymentIntent?.status === 'succeeded') {
          clearInterval(pollInterval);
          onSuccess(paymentIntentId);
          return true;
        } else if (result.paymentIntent?.status === 'canceled') {
          clearInterval(pollInterval);
          onError('Payment was canceled');
          return false;
        }
      } catch (error) {
        clearInterval(pollInterval);
        onError('Failed to check payment status');
        return false;
      }
    }, 2000);

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      onError('Payment timed out');
    }, 300000);

    return true;
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Failed to process payment');
    return false;
  }
};