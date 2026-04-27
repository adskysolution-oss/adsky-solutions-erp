'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref') || searchParams.get('vendor') || searchParams.get('agent');
    if (ref) {
      localStorage.setItem('adsky_referral_code', ref.toUpperCase());
      console.log('🔗 Referral Detected:', ref.toUpperCase());
    }
  }, [searchParams]);

  return null;
}
