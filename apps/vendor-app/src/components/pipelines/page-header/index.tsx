'use client';

import { useTheme } from '@sk8-workspace/shared-ui';

export function PageHeader() {
  const { colors } = useTheme();

  return (
    <header
      className="w-full p-4 md:px-8 md:py-6 bg-white border-b flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
      style={{ borderColor: colors.border }}
    >
      <div>
        <h1
          className="text-xl md:text-2xl font-bold m-0 mb-2 md:mb-0"
          style={{ color: colors.text }}
        >
          Amazing Vendor 1 App Using Sk8
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-xl text-[10px] md:text-[11px] font-semibold whitespace-nowrap">
          PRODUCTION
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-xl text-[10px] md:text-[11px] font-semibold whitespace-nowrap">
          <span style={{ color: colors.primary }}>⚡</span> Powered by Sk8 Pipelines
        </span>
      </div>
    </header>
  );
}
