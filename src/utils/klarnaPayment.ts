interface KlarnaPaymentResponse {
  status: 'success' | 'error';
  payment_url?: string;
  client_secret?: string;
  message?: string;
}

export const initializeKlarnaPayment = async (
  userId: string,
  total: number,
  currency: string = 'sek'
): Promise<KlarnaPaymentResponse> => {
  try {
    const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/klarna_pay/create-klarna-payment-intent/', {
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
    
    if (data.status === 'success') {
      return {
        status: 'success',
        payment_url: data.payment_url,
        client_secret: data.client_secret
      };
    }
    
    throw new Error(data.message || 'Failed to initialize Klarna payment');
  } catch (error) {
    console.error('Klarna initialization error:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to initialize payment'
    };
  }
};

export const confirmKlarnaPayment = async (
  paymentIntentId: string,
  userId: string
): Promise<KlarnaPaymentResponse> => {
  try {
    const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/klarna_pay/confirm-payment/', {
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
    return data;
  } catch (error) {
    console.error('Klarna confirmation error:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to confirm payment'
    };
  }
};