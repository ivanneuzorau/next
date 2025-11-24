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
        <h1
          className="text-lg md:text-xl font-bold m-0 mb-2"
          style={{ color: colors.text }}
        >
          Sk8 Admin
        </h1>
        <span
          className="inline-block px-2 py-0.5 text-white rounded-xl text-[9px] md:text-[10px] font-semibold uppercase"
          style={{ backgroundColor: colors.primary }}
        >
          PIPELINES
        </span>
      </div>

      <nav>
        <NavItem active>All Pipelines</NavItem>
        <NavItem>Tenant Activity</NavItem>
        <NavItem>Sync History</NavItem>
      </nav>

      <div className="mt-auto pt-4 md:pt-6 flex items-center gap-2">
        <div
          className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] md:text-xs flex-shrink-0"
          style={{ backgroundColor: colors.primary }}
        >
          V1
        </div>
        <div
          className="text-[11px] md:text-xs font-medium min-w-0"
          style={{ color: colors.text }}
        >
          <div>Vendor 1 Sandbox</div>
          <span
            className="inline-block px-1.5 py-0.5 text-white rounded-lg text-[8px] md:text-[9px] mt-1"
            style={{ backgroundColor: colors.primary }}
          >
            Sk8
          </span>
        </div>
      </div>
    </aside>
  );
}
