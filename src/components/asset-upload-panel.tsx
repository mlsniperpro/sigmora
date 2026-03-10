'use client';

import { startTransition, useState } from 'react';
import { getClientAuthHeaders } from '@/lib/client-auth';

type AssetUploadPanelProps = {
  workspaceSlug: string;
};

export function AssetUploadPanel({ workspaceSlug }: AssetUploadPanelProps) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok');
  const [tags, setTags] = useState('');
  const [durationSeconds, setDurationSeconds] = useState('30');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setStatus('Select a video file first.');
      return;
    }

    setPending(true);
    setStatus('Preparing upload...');

    try {
      const authHeaders = await getClientAuthHeaders();

      const initResponse = await fetch(`/api/workspaces/${workspaceSlug}/assets/upload-init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type || 'video/mp4',
          size: file.size,
          title: title || file.name.replace(/\.[^.]+$/, ''),
          platform,
          tags: tags.split(',').map((item) => item.trim()).filter(Boolean),
          accessMode: 'private',
          durationSeconds: Number(durationSeconds || '0'),
        }),
      });

      const initPayload = await initResponse.json();

      if (!initResponse.ok || !initPayload.success) {
        throw new Error(initPayload.error || 'Failed to initialize upload.');
      }

      setStatus('Uploading binary to Content Engine...');

      const uploadResponse = await fetch(initPayload.data.upload.uploadUrl, {
        method: 'PUT',
        headers: initPayload.data.upload.uploadHeaders,
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Binary upload failed.');
      }

      setStatus('Confirming upload...');

      const confirmResponse = await fetch(`/api/workspaces/${workspaceSlug}/assets/upload-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({
          contentId: initPayload.data.upload.id,
        }),
      });

      const confirmPayload = await confirmResponse.json();

      if (!confirmResponse.ok || !confirmPayload.success) {
        throw new Error(confirmPayload.error || 'Failed to confirm upload.');
      }

      startTransition(() => {
        setStatus('Upload complete. Refreshing library...');
      });

      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="panel form-panel">
      <div className="table-header">
        <div>
          <h2>Upload benchmark video</h2>
          <p>This is a real ingestion flow: initialize Content Engine upload, send binary, confirm, and persist the asset.</p>
        </div>
      </div>

      <form onSubmit={handleUpload} className="entity-form">
        <label>
          <span>Video File</span>
          <input
            type="file"
            accept="video/*"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            required
          />
        </label>
        <label>
          <span>Title</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Benchmark candidate" />
        </label>
        <label>
          <span>Platform</span>
          <select value={platform} onChange={(event) => setPlatform(event.target.value as 'tiktok' | 'instagram' | 'youtube')}>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
          </select>
        </label>
        <label>
          <span>Duration Seconds</span>
          <input value={durationSeconds} onChange={(event) => setDurationSeconds(event.target.value)} type="number" min="1" />
        </label>
        <label className="form-span-full">
          <span>Tags</span>
          <input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="hook, demo, cta" />
        </label>
        <button type="submit" className="button" disabled={pending}>
          {pending ? 'Uploading...' : 'Upload video'}
        </button>
      </form>

      {status ? <p>{status}</p> : null}
    </section>
  );
}
