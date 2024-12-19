import { PaymentIntent } from '@stripe/stripe-js';

interface WindowOptions {
  width?: number;
  height?: number;
  target?: string;
  enforceNewTab?: boolean;
}

export const openPaymentWindow = (url: string, options: WindowOptions = {}) => {
  const width = options.width || 500;
  const height = options.height || 700;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  // For Klarna and other redirect-based payments, force new tab
  if (options.enforceNewTab) {
    return window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }

  return window.open(
    url,
    options.target || 'PaymentWindow',
    `width=${width},height=${height},left=${left},top=${top},location=yes,status=yes,scrollbars=yes`
  );
};

export const handleRedirectFlow = (
  paymentIntent: PaymentIntent,
  onSuccess: (id: string) => void,
  onError: (error: string) => void,
  options: WindowOptions = {}
) => {
  if (paymentIntent.next_action?.redirect_to_url?.url) {
    const redirectUrl = paymentIntent.next_action.redirect_to_url.url;
    const isKlarna = redirectUrl.includes('klarna.com');
    
    // Store payment intent ID for tracking
    localStorage.setItem('current_payment_intent', paymentIntent.id);
    localStorage.setItem('payment_return_url', window.location.href);
    
    // Open payment window - force new tab for Klarna
    const popup = openPaymentWindow(redirectUrl, {
      ...options,
      enforceNewTab: isKlarna || options.enforceNewTab
    });
    
    if (!popup) {
      onError('Please allow popups for this site');
      return null;
    }

    // Monitor popup window
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        const storedPaymentId = localStorage.getItem('current_payment_intent');
        
        if (!storedPaymentId) {
          onError('Payment window was closed');
        }
      }
    }, 500);

    return popup;
  }
  return null;
};

export const handlePaymentReturn = () => {
  const returnUrl = localStorage.getItem('payment_return_url');
  if (returnUrl) {
    localStorage.removeItem('payment_return_url');
    window.location.href = returnUrl;
  }
};