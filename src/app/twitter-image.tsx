import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sigmora retention analysis and video remixing';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background:
            'radial-gradient(circle at 0% 0%, rgba(214,100,40,0.45), transparent 35%), radial-gradient(circle at 100% 100%, rgba(24,138,132,0.4), transparent 35%), linear-gradient(180deg, #101319 0%, #06070a 100%)',
          color: '#faf8f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #d66428, #188a84)',
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>Sigmora</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 900 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Analyze retention. Remix what works.
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: 'rgba(250,248,245,0.78)', lineHeight: 1.35 }}>
            Turn winning short-form videos into repeatable scripts and scene plans.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, fontSize: 24, color: 'rgba(250,248,245,0.9)' }}>
          <div style={{ display: 'flex' }}>Import a winner</div>
          <div style={{ display: 'flex' }}>Analyze the hook</div>
          <div style={{ display: 'flex' }}>Generate the next concept</div>
        </div>
      </div>
    ),
    size,
  );
}
