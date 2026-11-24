import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Brand & Primary
    primary: '#0866E9',
    primaryPressed: '#0757C7',

    // Content & Typography
    text: '#172033',
    textSecondary: '#687386',
    textInverse: '#FFFFFF',
    textInverseMuted: '#94A3B8',

    // Surfaces & Backgrounds
    background: '#F4F7FC',
    surface: '#FFFFFF',
    surfaceDark: '#0F172A', // Deep midnight surface for high-contrast sections

    // Borders & Dividers
    border: '#E5EAF2',
    borderInverse: 'rgba(255, 255, 255, 0.12)',

    // System Status & Ratings
    star: '#F5A623',
    success: '#16A34A',
    danger: '#DC2626',
    dangerPressed: '#B91C1C',
    warning: '#FBBF24',
    info: '#60A5FA',
    accentGreen: '#34D399',

    // Neutral Elements & Overlays
    shadow: '#000000',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    overlayDark: 'rgba(15, 23, 42, 0.72)',
    overlaySubtle: 'rgba(15, 23, 42, 0.25)',
    overlayGlass: 'rgba(255, 255, 255, 0.18)',
    borderGlass: 'rgba(255, 255, 255, 0.25)',

    // Centralized Semantic Promo Cards Palette
    promos: {
      blue: {
        bg: '#EFF6FF',
        accent: '#1D4ED8',
      },
      amber: {
        bg: '#FFFBEB',
        accent: '#B45309',
      },
      rose: {
        bg: '#FEF2F2',
        accent: '#B91C1C',
      },
      purple: {
        bg: '#F5F3FF',
        accent: '#6D28D9',
      },
    },
  },

  dark: {
    primary: '#3B82F6',
    primaryPressed: '#2563EB',

    text: '#F8FAFC',
    textSecondary: '#A7B0C0',
    textInverse: '#172033',
    textInverseMuted: '#687386',

    background: '#101827',
    surface: '#1B2638',
    surfaceDark: '#080D1A',

    border: '#334155',
    borderInverse: 'rgba(255, 255, 255, 0.08)',

    star: '#FBBF24',
    success: '#4ADE80',
    danger: '#F87171',
    dangerPressed: '#DC2626',
    warning: '#FBBF24',
    info: '#60A5FA',
    accentGreen: '#34D399',

    shadow: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    overlayDark: 'rgba(0, 0, 0, 0.75)',
    overlaySubtle: 'rgba(0, 0, 0, 0.35)',
    overlayGlass: 'rgba(255, 255, 255, 0.12)',
    borderGlass: 'rgba(255, 255, 255, 0.15)',

    promos: {
      blue: {
        bg: '#1E293B',
        accent: '#60A5FA',
      },
      amber: {
        bg: '#2A251B',
        accent: '#FBBF24',
      },
      rose: {
        bg: '#2E1E24',
        accent: '#F87171',
      },
      purple: {
        bg: '#251E38',
        accent: '#C084FC',
      },
    },
  },
} as const;

export type ThemeColor =
  keyof typeof Colors.light &
  keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Typography = {
  badge: 10,
  micro: 11,
  caption: 12,
  sub: 13,
  small: 14,
  regular: 15,
  body: 16,
  subtitle: 18,
  title: 20,
  heading: 24,
  display: 28,
} as const;

export const Spacing = {
  // Legacy step aliases (for full backward compatibility)
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,

  // Granular, complete design scale (eliminates token arithmetic)
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  compact: 10,
  gap: 12,
  inner: 14,
  base: 16,
  gutter: 18,
  lg: 20,
  xl: 24,
  section: 28,
  xxl: 32,
  huge: 48,
  massive: 64,
} as const;

export const Radius = {
  small: 8,
  button: 12,
  card: 18,
  large: 26,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;
