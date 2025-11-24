'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Theme, ThemeColors, themes } from './types';

interface ThemeContextValue {
  theme: Theme;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const colors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors }}>
      <div
        style={{
          '--theme-primary': colors.primary,
          '--theme-primary-light': colors.primaryLight,
          '--theme-primary-dark': colors.primaryDark,
          '--theme-background': colors.background,
          '--theme-text': colors.text,
          '--theme-text-secondary': colors.textSecondary,
          '--theme-border': colors.border,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook for accessing theme from ThemeProvider context.
 * Use this hook in components that are wrapped with ThemeProvider.
 * 
 * For components that receive theme as a prop, use `useThemeColors()` instead.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

