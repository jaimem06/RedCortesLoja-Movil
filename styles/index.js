// Export everything from the theme system for easy imports
export { default as theme, colors, typography, spacing, borderRadius, shadows, globalStyles } from './globalTheme';
export { ThemeProvider, useTheme, createThemedStyles } from './ThemeProvider';
export { default as styleUtils } from './styleUtils';
export * from './styleUtils';

// Re-export original styles for backwards compatibility during migration
export { default as LoginStyles } from './LoginStyles';
export { default as RegisterStyles } from './RegisterStyles';
export { default as ProfileScreenStyles } from './ProfileScreenStyles';