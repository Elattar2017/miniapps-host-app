import type {DesignTokens} from '@attar/enterprise-module-sdk';

/** WeConnect telecom brand design tokens (purple + teal) */
export const weConnectTokens: DesignTokens = {
  colors: {
    primary: '#6C2BD9',
    secondary: '#14B8A6',
    background: '#F8F7FC',
    surface: '#FFFFFF',
    text: '#1F1235',
    textSecondary: '#6B7280',
    error: '#DC2626',
    success: '#16A34A',
    warning: '#F59E0B',
    border: '#E5E7EB',
    spinner: '#6C2BD9',
    spinnerTrack: '#E5E7EB',
  },
  typography: {
    fontFamily: 'System',
    baseFontSize: 16,
    scale: {
      h1: 28,
      h2: 22,
      h3: 18,
      h4: 16,
      body: 16,
      caption: 12,
    },
  },
  spacing: {
    unit: 8,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    default: 12,
    sm: 8,
    lg: 16,
    full: 9999,
  },
  shadows: {
    sm: {offsetX: 0, offsetY: 1, blurRadius: 3, color: 'rgba(0,0,0,0.1)'},
    md: {offsetX: 0, offsetY: 4, blurRadius: 6, color: 'rgba(0,0,0,0.1)'},
    lg: {offsetX: 0, offsetY: 8, blurRadius: 16, color: 'rgba(0,0,0,0.15)'},
  },
};

/** Brand colors for use outside of SDK (native screens) */
export const brand = {
  purple: '#6C2BD9',
  purpleDark: '#4C1D95',
  purpleLight: '#A78BFA',
  teal: '#14B8A6',
  tealDark: '#0D9488',
  white: '#FFFFFF',
  background: '#F8F7FC',
  textPrimary: '#1F1235',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
};
