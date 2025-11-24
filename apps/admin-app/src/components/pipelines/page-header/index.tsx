'use client';

import { useTheme } from '@sk8-workspace/shared-ui';

export function PageHeader() {
  const { colors } = useTheme();

  return (
    <header className="flex justify-end items-center mb-4">
      <span
        className="text-xs md:text-sm"
        style={{ color: colors.textSecondary }}
      >
        Vendor: Vendor 1 Connected
      </span>
    </header>
  );
}
