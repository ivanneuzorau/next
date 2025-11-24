import { useMemo } from 'react';
import { PipelinesTheme } from '../types';
import { themes, ThemeColors } from '../theme';

/**
 * Hook for getting theme colors and CSS variables style object.
 * Use this hook when you need to explicitly pass theme as a prop.
 * 
 * For components that use ThemeProvider context, use `useTheme()` instead.
 */
export interface UseThemeColorsReturn {
  colors: ThemeColors;
  themeStyle: React.CSSProperties;
}

export function useThemeColors(theme: PipelinesTheme): UseThemeColorsReturn {
  const colors = themes[theme];

  const themeStyle = useMemo(
    () =>
      ({
        '--theme-primary': colors.primary,
        '--theme-primary-light': colors.primaryLight,
        '--theme-primary-dark': colors.primaryDark,
        '--theme-background': colors.background,
        '--theme-text': colors.text,
        '--theme-text-secondary': colors.textSecondary,
        '--theme-border': colors.border,
        '--theme-table-even-row-bg':
          colors.tableEvenRowBg || 'rgba(0, 0, 0, 0.02)',
      }) as React.CSSProperties,
    [colors]
  );

  return { colors, themeStyle };
}

