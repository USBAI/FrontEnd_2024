interface PaymentIntentRequest {
  userId: string;
  amount: number;
  currency: string;
}

interface PaymentIntentResponse {
  status: 'success' | 'error';
  clientSecret?: string;
  message?: string;
}

export const createPaymentIntent = async (data: PaymentIntentRequest): Promise<PaymentIntentResponse> => {
  try {
    const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/kluret_stripe/create-payment-intent/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: data.userId,
        total_cost: data.amount.toString(),
        currency: data.currency,
        product_description: 'Cart Purchase'
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to create payment intent');
    }

    return {
      status: 'success',
      clientSecret: responseData.client_secret
    };
  } catch (error) {
    console.error('Payment service error:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Payment processing failed'
    };
  }
};

export const confirmPayment = async (paymentIntentId: string, userId: string): Promise<PaymentIntentResponse> => {
  try {
    const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/kluret_stripe/confirm-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_intent_id: paymentIntentId,
        user_id: userId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to confirm payment');
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