'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { WelcomeModal } from './welcome-modal';

export function WelcomeModalWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const onboarded = searchParams.get('onboarded') === 'true';

  const handleClose = () => {
    // Remove query param
    const params = new URLSearchParams(searchParams.toString());
    params.delete('onboarded');
    const query = params.toString() ? `?${params.toString()}` : '';
    router.replace(`${pathname}${query}`);
  };

  return <WelcomeModal isOpen={onboarded} onClose={handleClose} />;
}
