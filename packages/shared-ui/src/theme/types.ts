export type Theme = 'green' | 'blue';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  tableEvenRowBg?: string;
}

export const themes: Record<Theme, ThemeColors> = {
  green: {
    primary: '#10b981',
    primaryLight: '#34d399',
    primaryDark: '#059669',
    background: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    tableEvenRowBg: 'rgba(16, 185, 129, 0.05)',
  },
  blue: {
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    primaryDark: '#2563eb',
    background: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    tableEvenRowBg: 'rgba(59, 130, 246, 0.05)',
  },
};

