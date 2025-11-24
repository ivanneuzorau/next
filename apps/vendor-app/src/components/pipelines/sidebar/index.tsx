'use client';

import { NavItem } from '../nav-item';
import { useTheme } from '@sk8-workspace/shared-ui';

export function Sidebar() {
  const { colors } = useTheme();

  const sidebarStyle = {
    '--theme-primary': colors.primary,
    '--theme-primary-light': colors.primaryLight,
    '--theme-primary-dark': colors.primaryDark,
    '--theme-background': colors.background,
    '--theme-text': colors.text,
    '--theme-text-secondary': colors.textSecondary,
    '--theme-border': colors.border,
  } as React.CSSProperties;

  return (
    <aside
      className="w-full max-w-full bg-white p-4 md:w-60 md:max-w-[240px] md:p-6 border-r flex flex-col h-full overflow-y-auto"
      style={{ ...sidebarStyle, backgroundColor: colors.background, borderColor: colors.border }}
    >
      <div className="mb-6 md:mb-8">
        <h2
          className="text-[11px] md:text-xs font-semibold uppercase mb-3 md:mb-4"
          style={{ color: colors.textSecondary }}
        >
          FEATURES
        </h2>
        <nav>
          <NavItem active>My Pipelines</NavItem>
          <NavItem>Analytics</NavItem>
          <NavItem>Billing</NavItem>
        </nav>
      </div>

      <div className="mt-auto pt-4 md:pt-6 flex flex-col items-center gap-2">
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0"
          style={{ backgroundColor: colors.primary }}
        >
          T1
        </div>
        <div
          className="text-[11px] md:text-xs font-medium text-center"
          style={{ color: colors.text }}
        >
          xxx-ten-1
        </div>
        <button
          className="px-3 py-1 bg-transparent rounded-md text-[10px] md:text-[11px] font-medium cursor-pointer whitespace-nowrap transition-all duration-200"
          style={{
            color: colors.primary,
            borderColor: colors.primary,
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.primary;
          }}
        >
          Current Tenant
        </button>
      </div>
    </aside>
  );
}
