export const detectPaymentCapabilities = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  return {
    isApplePaySupported: isIOS && window.ApplePaySession?.canMakePayments?.(),
    isGooglePaySupported: isAndroid && window.isSecureContext,
    isKlarnaSupported: true, // Always supported in Sweden
    isCardSupported: true // Always supported
  };
};

export const getPaymentMethodOrder = () => {
  const capabilities = detectPaymentCapabilities();
  const methods = ['card', 'klarna']; // Always include card and Klarna

  if (capabilities.isApplePaySupported) {
    methods.unshift('apple_pay');
  }

  if (capabilities.isGooglePaySupported) {
    methods.unshift('google_pay');
  }

  return methods;
};

export const formatCurrency = (amount: number, currency: string = 'SEK'): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: currency
  }).format(amount);
};