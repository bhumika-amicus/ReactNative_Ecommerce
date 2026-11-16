
import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#0866E9',
    primaryPressed: '#0757C7',

    text: '#172033',
    textSecondary: '#687386',

    background: '#F4F7FC',
    surface: '#FFFFFF',

    border: '#E5EAF2',

    star: '#F5A623',
    success: '#16A34A',
    danger: '#DC2626',

    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
  },

  dark: {
    primary: '#3B82F6',
    primaryPressed: '#2563EB',

    text: '#F8FAFC',
    textSecondary: '#A7B0C0',

    background: '#101827',
    surface: '#1B2638',

    border: '#334155',

    star: '#FBBF24',
    success: '#4ADE80',
    danger: '#F87171',

    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
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
  caption: 12,
  small: 14,
  body: 16,
  subtitle: 18,
  heading: 24,
  title: 28,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  small: 6,
  button: 8,
  card: 12,
  large: 16,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;
