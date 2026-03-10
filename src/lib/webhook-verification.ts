import crypto from 'node:crypto';

function safeCompareHex(left: string, right: string) {
  const leftBuffer = Buffer.from(left, 'hex');
  const rightBuffer = Buffer.from(right, 'hex');

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function safeCompareBase64(left: string, right: string) {
  const leftBuffer = Buffer.from(left, 'base64');
  const rightBuffer = Buffer.from(right, 'base64');

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyPaystackWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return false;
  }

  const digest = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
  return safeCompareHex(digest, signature);
}

function getPolarSecretCandidates(secret: string) {
  const candidates = [Buffer.from(secret)];
  const suffix = secret.includes('_') ? secret.slice(secret.lastIndexOf('_') + 1) : secret;

  try {
    const decoded = Buffer.from(suffix, 'base64');
    if (decoded.length > 0) {
      candidates.push(decoded);
    }
  } catch {
    // Ignore non-base64 secrets and keep the raw secret fallback.
  }

  return candidates;
}

function parsePolarSignatureHeader(signatureHeader: string | null) {
  if (!signatureHeader) {
    return [];
  }

  return signatureHeader
    .split(/\s+/)
    .flatMap((part) => part.split(','))
    .map((part) => part.trim())
    .flatMap((part) => {
      if (part.startsWith('v1=')) {
        return [part.slice(3)];
      }

      if (part.startsWith('v1,')) {
        return [part.slice(3)];
      }

      return [];
    });
}

export function verifyPolarWebhookSignature(rawBody: string, headers: Headers) {
  const secret = process.env.POLAR_WEBHOOK_SECRET;
  const webhookId = headers.get('webhook-id');
  const webhookTimestamp = headers.get('webhook-timestamp');
  const signatureCandidates = parsePolarSignatureHeader(headers.get('webhook-signature'));

  if (!secret || !webhookId || !webhookTimestamp || signatureCandidates.length === 0) {
    return false;
  }

  const timestampMs = Number(webhookTimestamp) * 1000;
  if (!Number.isFinite(timestampMs)) {
    return false;
  }

  const ageMs = Math.abs(Date.now() - timestampMs);
  if (ageMs > 5 * 60 * 1000) {
    return false;
  }

  const payload = `${webhookId}.${webhookTimestamp}.${rawBody}`;

  return getPolarSecretCandidates(secret).some((candidateSecret) => {
    const digest = crypto.createHmac('sha256', candidateSecret).update(payload).digest('base64');
    return signatureCandidates.some((signature) => safeCompareBase64(digest, signature));
  });
}
