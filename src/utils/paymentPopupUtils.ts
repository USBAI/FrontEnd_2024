/**
 * Utility functions for handling payment popups and redirects
 */

export const openPaymentPopup = (url: string): Window | null => {
  // Always open in new tab for payment redirects
  const popup = window.open(
    url,
    '_blank',
    'noopener,noreferrer'
  );

  if (popup) {
    popup.focus();
  }

  return popup;
};

export const handlePaymentReturn = () => {
  const returnUrl = localStorage.getItem('payment_return_url');
  if (returnUrl) {
    localStorage.removeItem('payment_return_url');
    window.location.href = returnUrl;
  }
};