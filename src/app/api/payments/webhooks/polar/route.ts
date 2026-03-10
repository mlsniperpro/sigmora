import { NextResponse } from 'next/server';
import { processWebhookEvent } from '@/lib/billing';
import { verifyPolarWebhookSignature } from '@/lib/webhook-verification';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const payload = (() => {
    try {
      return JSON.parse(rawBody) as {
        data?: { id?: string; checkout_id?: string; client_reference?: string; status?: string };
        id?: string;
        checkout_id?: string;
        client_reference?: string;
        status?: string;
        type?: string;
      };
    } catch {
      return null;
    }
  })();

  if (!payload) {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!verifyPolarWebhookSignature(rawBody, request.headers)) {
    return NextResponse.json({ success: false, error: 'Invalid webhook signature.' }, { status: 401 });
  }

  const data = payload.data ?? payload;
  const reference =
    data.id ||
    data.checkout_id ||
    data.client_reference;
  const status =
    data.status ||
    payload.type ||
    'unknown';

  if (!reference) {
    return NextResponse.json({ success: false, error: 'Missing Polar reference.' }, { status: 400 });
  }

  const result = await processWebhookEvent({
    provider: 'polar',
    reference,
    status,
  });

  return NextResponse.json({ success: true, data: result });
}
