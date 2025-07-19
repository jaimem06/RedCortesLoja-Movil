import { theme } from './globalTheme';

/**
 * Utility functions for common style patterns
 */

// Get color by semantic name with fallback
export const getColor = (colorName, fallback = theme.colors.textPrimary) => {
  return theme.colors[colorName] || fallback;
};

// Get spacing value
export const getSpacing = (spacingName) => {
  return theme.spacing[spacingName] || 0;
};

// Get typography style
export const getTypography = (typographyName) => {
  return theme.globalStyles[typographyName] || {};
};

// Get shadow style
export const getShadow = (shadowName = 'md') => {
  return theme.shadows[shadowName] || theme.shadows.md;
};

// Create button style with theme
export const createButtonStyle = (variant = 'primary', size = 'md', customStyles = {}) => {
  const baseButton = theme.globalStyles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`] || theme.globalStyles.buttonPrimary;
  
  let sizeStyles = {};
  switch (size) {
    case 'sm':
      sizeStyles = {
        minHeight: 40,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      };
      break;
    case 'lg':
      sizeStyles = {
        minHeight: 56,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
      };
      break;
    default:
      // md size - use defaults from theme
      break;
  }
  
  return {
    ...baseButton,
    ...sizeStyles,
    ...customStyles,
  };
};

// Create input style with theme
export const createInputStyle = (variant = 'default', customStyles = {}) => {
  let baseStyle = theme.globalStyles.input;
  
  if (variant === 'focused') {
    baseStyle = {
      ...baseStyle,
      ...theme.globalStyles.inputFocused,
    };
  }
  
  return {
    ...baseStyle,
    ...customStyles,
  };
};

// Create card style with theme
export const createCardStyle = (variant = 'default', customStyles = {}) => {
  let baseStyle = theme.globalStyles.card;
  
  if (variant === 'compact') {
    baseStyle = theme.globalStyles.cardCompact;
  }
  
  return {
    ...baseStyle,
    ...customStyles,
  };
};

// Create text style with theme
export const createTextStyle = (variant = 'body', color = null, customStyles = {}) => {
  let baseStyle = theme.globalStyles[variant] || theme.globalStyles.body;
  
  if (color) {
    baseStyle = {
      ...baseStyle,
      color: getColor(color, baseStyle.color),
    };
  }
  
  return {
    ...baseStyle,
    ...customStyles,
  };
};

// Responsive spacing helper
export const responsiveSpacing = (base = 'md', multiplier = 1) => {
  return theme.spacing[base] * multiplier;
};

// Create border style
export const createBorderStyle = (width = 1, color = 'border', radius = 'md') => {
  return {
    borderWidth: width,
    borderColor: getColor(color),
    borderRadius: theme.borderRadius[radius] || theme.borderRadius.md,
  };
};

// Status-specific styles
export const statusStyles = {
  success: {
    backgroundColor: theme.colors.success,
    color: theme.colors.white,
  },
  error: {
    backgroundColor: theme.colors.error,
    color: theme.colors.white,
  },
  warning: {
    backgroundColor: theme.colors.warning,
    color: theme.colors.white,
  },
  info: {
    backgroundColor: theme.colors.info,
    color: theme.colors.white,
  },
};

// Get status style by name
export const getStatusStyle = (status) => {
  return statusStyles[status] || statusStyles.info;
};

export default {
  getColor,
  getSpacing,
  getTypography,
  getShadow,
  createButtonStyle,
  createInputStyle,
  createCardStyle,
  createTextStyle,
  responsiveSpacing,
  createBorderStyle,
  getStatusStyle,
};