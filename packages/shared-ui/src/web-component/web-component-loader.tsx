'use client';

/**
 * React component wrapper that loads web component from CDN
 * Use this in Next.js apps to load the component externally
 */

import { useEffect, useState, ReactNode } from 'react';
import { loadWebComponent, isWebComponentLoaded } from './loader';

export interface WebComponentLoaderProps {
  cdnUrl?: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function WebComponentLoader({
  cdnUrl,
  children,
  fallback = <div>Loading component...</div>,
}: WebComponentLoaderProps) {
  const [loaded, setLoaded] = useState(isWebComponentLoaded());

  useEffect(() => {
    if (loaded) return;

    loadWebComponent({
      cdnUrl,
      onLoad: () => setLoaded(true),
      onError: (error) => {
        console.error('Failed to load web component:', error);
        // Still set loaded to true to show children (component might be available)
        setLoaded(true);
      },
    });
  }, [cdnUrl, loaded]);

  if (!loaded) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Re-export loader functions
export { loadWebComponent, isWebComponentLoaded } from './loader';

// Re-export loader functions
export { loadWebComponent, isWebComponentLoaded } from './loader';
