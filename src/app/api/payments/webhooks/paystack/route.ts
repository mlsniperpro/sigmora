import { NextResponse } from 'next/server';
import { processWebhookEvent } from '@/lib/billing';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const reference =
    payload?.data?.reference ||
    payload?.reference ||
    payload?.tx_ref;
  const status =
    payload?.data?.status ||
    payload?.status ||
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
