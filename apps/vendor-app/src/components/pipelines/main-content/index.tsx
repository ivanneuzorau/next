'use client';

import { useState } from 'react';
import Script from 'next/script';
import { MainContentProps } from './types';
import '../../types/web-components';

export function MainContent({ tenantId }: MainContentProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="flex-1 p-4 md:p-8 bg-white">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 m-0 mb-4 md:mb-6 flex flex-wrap items-center gap-2">
          My Pipelines
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-lg text-[9px] md:text-[10px] font-medium">
            Embedded Sk8 component
          </span>
        </h2>
      </div>

      <Script
        src="https://ivanneuzorau.github.io/next/sk8-pipelines.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      {loaded ? (
        // @ts-ignore - web component type
        <sk8-pipelines
          mode="embedded"
          theme="blue"
          tenant-id={tenantId}
          api-base-url=""
        />
      ) : (
        <div className="p-6">Loading pipelines component...</div>
      )}
    </main>
  );
}
