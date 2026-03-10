import { PAYMENT_API_BASE_URL } from '@/lib/payment-config';

type GatewayResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    code?: string;
  };
};

type PaystackCheckoutResponse = {
  authorization_url?: string;
  reference?: string;
  access_code?: string;
};

type PolarCheckoutResponse = {
  id: string;
  url?: string;
};

async function paymentApiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${PAYMENT_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const payload = (await response.json()) as GatewayResponse<T>;

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.error?.message || payload.message || `Payment API request failed for ${path}`);
  }

  return payload.data;
}

export async function createPaystackCheckout(input: {
  email: string;
  amount: number;
  currency: string;
  txRef: string;
  callbackUrl: string;
  metadata?: Record<string, string>;
}) {
  return paymentApiRequest<PaystackCheckoutResponse>('/paystack/card', {
    method: 'POST',
    body: JSON.stringify({
      payload: {
        email: input.email,
        amount: input.amount,
        currency: input.currency,
        tx_ref: input.txRef,
        callback_url: input.callbackUrl,
        metadata: input.metadata,
      },
    }),
  });
}

export async function verifyPaystackPayment(reference: string, expectedAmount: number) {
  return paymentApiRequest<{ verified: boolean; status: string; amount?: number }>(
    `/paystack/verify/${reference}?expectedAmount=${expectedAmount}`,
  );
}

export async function createPolarCheckout(input: {
  clientReference: string;
  productId: string;
  successUrl: string;
  customerEmail: string;
  customerName?: string;
  metadata?: Record<string, string>;
}) {
  return paymentApiRequest<PolarCheckoutResponse>('/polar/checkout', {
    method: 'POST',
    body: JSON.stringify({
      client_reference: input.clientReference,
      product_id: input.productId,
      success_url: input.successUrl,
      customer_email: input.customerEmail,
      customer_name: input.customerName,
      metadata: input.metadata,
    }),
  });
}

export async function verifyPolarCheckout(checkoutId: string, expectedAmount: number) {
  return paymentApiRequest<{ verified: boolean; status: string; amount?: number }>(
    `/polar/verify/${checkoutId}?expectedAmount=${expectedAmount}`,
  );
}
