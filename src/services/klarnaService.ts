import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {
  locale: 'sv'
});

interface KlarnaPaymentResponse {
  status: 'success' | 'error';
  client_secret?: string;
  payment_intent_id?: string;
  message?: string;
}

export const initializeKlarnaPayment = async (
  userId: string,
  total: number,
  currency: string = 'sek'
): Promise<KlarnaPaymentResponse> => {
  try {
    const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/klarna_pay/create-klarna-payment-intent/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        total_cost: total.toString(),
        currency,
        product_description: 'Cart Purchase'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to initialize Klarna payment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Klarna initialization error:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to initialize payment'
    };
  }
};

export const createKlarnaPaymentElement = async (
  clientSecret: string,
  container: HTMLElement
): Promise<void> => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Failed to load Stripe');

    const elements = stripe.elements({
      clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#0284c7',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorDanger: '#ef4444',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          spacingUnit: '4px',
          borderRadius: '8px'
        }
      }
    });

    const paymentElement = elements.create('payment', {
      defaultValues: {
        billingDetails: {
          address: {
            country: 'SE',
          }
        }
      },
      wallets: {
        applePay: 'never',
        googlePay: 'never'
      },
      paymentMethodOrder: ['klarna']
    });

    paymentElement.mount(container);
  } catch (error) {
    console.error('Error creating Klarna payment element:', error);
    throw error;
  }
};

export const handleKlarnaPaymentStatus = async (
  paymentIntentId: string,
  userId: string
): Promise<{ status: 'success' | 'error'; message?: string }> => {
  try {
    const response = await fetch('http://127.0.0.1:8013/klarna_pay/confirm-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment_intent_id: paymentIntentId,
        user_id: userId
      })
    });

    const data = await response.json();
    return {
      status: data.status,
      message: data.message
    };
  } catch (error) {
    console.error('Error checking Klarna payment status:', error);
    return {
      status: 'error',
      message: 'Failed to verify payment status'
    };
  }
};