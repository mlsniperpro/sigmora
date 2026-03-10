import { NextResponse } from 'next/server';
import { processWebhookEvent } from '@/lib/billing';
import { verifyPaystackWebhookSignature } from '@/lib/webhook-verification';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const payload = (() => {
    try {
      return JSON.parse(rawBody) as {
        data?: { reference?: string; status?: string };
        reference?: string;
        tx_ref?: string;
        status?: string;
      };
    } catch {
      return null;
    }
  })();

  if (!payload) {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!verifyPaystackWebhookSignature(rawBody, request.headers.get('x-paystack-signature'))) {
    return NextResponse.json({ success: false, error: 'Invalid webhook signature.' }, { status: 401 });
  }

  const reference =
    payload.data?.reference ||
    payload.reference ||
    payload.tx_ref;
  const status =
    payload.data?.status ||
    payload.status ||
    'unknown';

  if (!reference) {
    return NextResponse.json({ success: false, error: 'Missing payment reference.' }, { status: 400 });
  }

  const result = await processWebhookEvent({
    provider: 'paystack',
    reference,
    status,
  });

  return NextResponse.json({ success: true, data: result });
}
