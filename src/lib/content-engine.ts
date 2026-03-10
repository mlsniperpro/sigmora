const DEFAULT_CONTENT_ENGINE_BASE_URL = 'https://content-engine.elendra20.workers.dev';

export type ContentEngineStats = {
  storage: {
    usedBytes: number;
    quotaBytes: number;
    usedFormatted: string;
    quotaFormatted: string;
    percentUsed: number;
  };
  content: {
    total: number;
    active: number;
    pending: number;
    deleted: number;
  };
  tenant: {
    name: string;
    rateLimitRpm: number;
    features: Record<string, boolean>;
  };
};

export type CreateContentInput = {
  name: string;
  mimeType: string;
  size: number;
  accessMode: 'presigned' | 'public' | 'private';
  folder?: string;
  tags?: string[];
  metadata?: Record<string, string>;
};

export type CreateContentResponse = {
  id: string;
  accessMode: 'presigned' | 'public' | 'private';
  status: 'pending' | 'active' | 'deleted';
  uploadUrl: string;
  uploadHeaders: Record<string, string>;
  uploadExpires: string;
};

export type ConfirmContentResponse = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  status: 'pending' | 'active' | 'deleted';
  accessMode: 'presigned' | 'public' | 'private';
  publicUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContentEngineConfig = {
  baseUrl: string;
  apiKeyPresent: boolean;
  configured: boolean;
};

function getConfig(): ContentEngineConfig {
  const baseUrl = process.env.CONTENT_ENGINE_BASE_URL || DEFAULT_CONTENT_ENGINE_BASE_URL;
  const apiKeyPresent = !!process.env.CONTENT_ENGINE_API_KEY;

  return {
    baseUrl,
    apiKeyPresent,
    configured: apiKeyPresent,
  };
}

async function contentEngineRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const config = getConfig();

  if (!config.configured || !process.env.CONTENT_ENGINE_API_KEY) {
    throw new Error('Content Engine is not configured. Set CONTENT_ENGINE_API_KEY on the server.');
  }

  const response = await fetch(`${config.baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.CONTENT_ENGINE_API_KEY}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`Content Engine request failed: ${response.status} ${payload}`);
  }

  return response.json() as Promise<T>;
}

export function getContentEngineConfig() {
  return getConfig();
}

export async function getContentEngineStats() {
  return contentEngineRequest<ContentEngineStats>('/v1/stats');
}

export async function createContentUpload(input: CreateContentInput) {
  return contentEngineRequest<CreateContentResponse>('/v1/content', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function confirmContentUpload(contentId: string) {
  return contentEngineRequest<ConfirmContentResponse>(`/v1/content/${contentId}/confirm`, {
    method: 'POST',
  });
}
