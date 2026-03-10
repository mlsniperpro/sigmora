import { NextResponse } from 'next/server';
import { processWebhookEvent } from '@/lib/billing';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const data = payload?.data ?? payload;
  const reference =
    data?.id ||
    data?.checkout_id ||
    data?.client_reference;
  const status =
    data?.status ||
    payload?.type ||
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
