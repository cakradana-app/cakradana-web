'use client';

import { useEffect } from 'react';

export default function DomainRedirect() {
  useEffect(() => {
    const canonical = process.env.NEXT_PUBLIC_BASE_DOMAIN;
    if (canonical && window.location.hostname !== canonical) {
      const { pathname, search, hash } = window.location;
      window.location.replace(`https://${canonical}${pathname}${search}${hash}`);
    }
  }, []);

  return null;
}
