'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/navigation';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params?.locale as string) || 'en';

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(l => l.code === currentLocale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLanguage = (code: string) => {
    setIsOpen(false);
    // @ts-ignore - next-intl router types can be strict with path params
    router.replace(pathname, { locale: code });
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '99px',
          padding: '0.4rem 0.8rem',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.2s',
          fontWeight: 500,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}
        aria-expanded={isOpen}
        aria-label="Change Language"
      >
        <span>{currentLanguage.flag}</span>
        <span style={{ textTransform: 'uppercase' }}>{currentLanguage.code}</span>
        <span style={{ 
          fontSize: '0.65rem', 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          opacity: 0.7 
        }}>▼</span>
      </button>

      {/* Popover/Dropdown Menu */}
      {isOpen && (
        <ul style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          background: 'var(--panel-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px var(--glass-shadow)',
          padding: '6px',
          minWidth: '140px',
          zIndex: 1100,
          backdropFilter: 'blur(20px)',
          animation: 'fade-in 0.15s ease-out',
          margin: 0,
          listStyle: 'none'
        }}>
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => selectLanguage(lang.code)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: currentLocale === lang.code ? 'var(--color-accent-500)' : 'transparent',
                  color: currentLocale === lang.code ? '#fff' : 'var(--text-primary)',
                  border: 0,
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
