'use client';

import { useTheme } from '@sk8-workspace/shared-ui';

interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
}

export function NavItem({ children, active }: NavItemProps) {
  const { colors } = useTheme();

  return (
    <div
      className={`px-4 py-3 mb-1 rounded-md font-normal cursor-pointer transition-all duration-200 ${
        active
          ? 'text-white font-medium'
          : 'text-gray-700 hover:bg-black/5'
      }`}
      style={
        active
          ? { backgroundColor: colors.primary }
          : {}
      }
      onMouseEnter={(e) => {
        if (active) {
          e.currentTarget.style.backgroundColor = colors.primaryDark;
        }
      }}
      onMouseLeave={(e) => {
        if (active) {
          e.currentTarget.style.backgroundColor = colors.primary;
        }
      }}
    >
      {children}
    </div>
  );
}
