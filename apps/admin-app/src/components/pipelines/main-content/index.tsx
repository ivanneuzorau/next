'use client';

import { useState } from 'react';
import Script from 'next/script';
import { PageHeader } from '../page-header';
import '../../types/web-components';

export function MainContent() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="flex-1 p-4 md:p-8 bg-white flex flex-col overflow-y-auto md:h-full">
      <PageHeader />
      <Script
        src="https://ivanneuzorau.github.io/next/sk8-pipelines.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      {loaded ? (
        // @ts-ignore - web component type
        <sk8-pipelines mode="admin" theme="green" api-base-url="" />
      ) : (
        <div className="p-6">Loading pipelines component...</div>
      )}
    </main>
  );
}
