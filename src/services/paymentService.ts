interface PaymentConfirmationResponse {
  status: 'success' | 'error';
  message?: string;
}

export const handlePaymentConfirmation = async (
  paymentIntentId: string,
  userId: string
): Promise<PaymentConfirmationResponse> => {
  try {
    const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/kluret_stripe/confirm-payment/', {
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
    
    if (!response.ok) {
      throw new Error(data.message || 'Payment confirmation failed');
    }

    return {
      status: 'success',
      message: data.message
    };
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Payment confirmation failed'
    };
  }
};

export const createPaymentIntent = async (
  userId: string,
  total: number,
  currency: string = 'sek'
) => {
  try {
    const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/kluret_stripe/create-payment-intent/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        total_cost: total.toString(),
        currency
      })
    });

    const data = await response.json();
    
    if (data.status === 'success' && data.client_secret) {
      return {
        status: 'success',
        clientSecret: data.client_secret
      };
    }
    
    throw new Error(data.message || 'Failed to initialize payment');
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
};