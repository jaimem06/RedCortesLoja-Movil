import { StyleSheet, Platform } from 'react-native';

// Color palette based on most frequent colors in the codebase
export const colors = {
  // Primary colors
  primary: '#6200ee',
  primaryLight: '#9c47ff',
  primaryDark: '#3700b3',
  
  // Secondary colors
  secondary: '#007AFF',
  secondaryLight: '#4dabf7',
  secondaryDark: '#1864ab',
  
  // Status colors
  success: '#28a745',
  successLight: '#51cf66',
  successDark: '#2f9e44',
  
  error: '#dc3545',
  errorLight: '#ff6b6b',
  errorDark: '#c92a2a',
  
  warning: '#ff9800',
  warningLight: '#ffc947',
  warningDark: '#fd7e14',
  
  info: '#007BFF',
  infoLight: '#74c0fc',
  infoDark: '#1971c2',
  
  // Neutral colors
  white: '#ffffff',
  black: '#000000',
  
  // Gray scale (from darkest to lightest)
  gray900: '#212529',
  gray800: '#343a40',
  gray700: '#495057',
  gray600: '#6c757d',
  gray500: '#adb5bd',
  gray400: '#ced4da',
  gray300: '#dee2e6',
  gray200: '#e9ecef',
  gray100: '#f8f9fa',
  gray50: '#f8f8f8',
  
  // Semantic colors based on existing patterns
  background: '#f8f8f8',
  surface: '#ffffff',
  surfaceSecondary: '#f5f5f5',
  
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textQuaternary: '#aaaaaa',
  textLight: '#ffffff',
  
  border: '#dddddd',
  borderLight: '#eeeeee',
  borderDark: '#cccccc',
  
  // Shadow colors
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.2)',
  shadowDark: 'rgba(0, 0, 0, 0.3)',
};

// Typography scale with elegant hierarchy
export const typography = {
  // Font families - using elegant fonts
  fontFamily: {
    regular: Platform.select({
      ios: 'Inter_400Regular',
      android: 'Inter_400Regular',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'Inter_500Medium',
      android: 'Inter_500Medium',
      default: 'System',
    }),
    semiBold: Platform.select({
      ios: 'Inter_600SemiBold',
      android: 'Inter_600SemiBold',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'Inter_700Bold',
      android: 'Inter_700Bold',
      default: 'System',
    }),
    // Poppins for headings - more elegant
    headingRegular: Platform.select({
      ios: 'Poppins_400Regular',
      android: 'Poppins_400Regular',
      default: 'System',
    }),
    headingMedium: Platform.select({
      ios: 'Poppins_500Medium',
      android: 'Poppins_500Medium',
      default: 'System',
    }),
    headingSemiBold: Platform.select({
      ios: 'Poppins_600SemiBold',
      android: 'Poppins_600SemiBold',
      default: 'System',
    }),
    headingBold: Platform.select({
      ios: 'Poppins_700Bold',
      android: 'Poppins_700Bold',
      default: 'System',
    }),
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  
  // Font sizes - using a more consistent scale
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

// Spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadow presets
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};

// Global styles that can be reused across components
export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.md,
  },
  
  cardCompact: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    ...shadows.sm,
  },
  
  // Typography
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontFamily: typography.fontFamily.headingBold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
  },
  
  h2: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.headingBold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },
  
  h3: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.headingSemiBold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.normal,
  },
  
  h4: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.headingSemiBold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },
  
  bodyLarge: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  
  body: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  
  bodySecondary: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  
  caption: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textTertiary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  captionSmall: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.textQuaternary,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  
  // Inputs
  input: {
    height: 50,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
  },
  
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  
  // Buttons
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  
  buttonSuccess: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  
  buttonError: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  
  buttonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textLight,
  },
  
  buttonTextSecondary: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.textPrimary,
  },
});

// Theme object for easy access
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  globalStyles,
};

export default theme;