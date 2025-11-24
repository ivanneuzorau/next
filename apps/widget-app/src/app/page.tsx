'use client';

import { useState, Suspense } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';

function WidgetContent() {
  const searchParams = useSearchParams();
  const [loaded, setLoaded] = useState(false);

  // Get parameters from URL query string
  const mode = (searchParams.get('mode') || 'embedded') as 'admin' | 'embedded';
  const theme = (searchParams.get('theme') || 'blue') as 'green' | 'blue';
  const tenantId = searchParams.get('tenant-id') || undefined;
  const apiBaseUrl = searchParams.get('api-base-url') || '';

  return (
    <div className="w-full h-full min-h-screen">
      <Script
        src="https://ivanneuzorau.github.io/next/sk8-pipelines.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      {loaded ? (
        // @ts-ignore - web component type
        <sk8-pipelines
          mode={mode}
          theme={theme}
          tenant-id={tenantId}
          api-base-url={apiBaseUrl}
        />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600">Loading widget...</div>
        </div>
      )}
    </div>
  );
}

export default function WidgetPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <WidgetContent />
    </Suspense>
  );
}
