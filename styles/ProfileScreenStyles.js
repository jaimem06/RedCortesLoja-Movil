import { StyleSheet, Platform } from 'react-native';
import { theme } from './globalTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.headingSemiBold,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.textPrimary,
  },
  input: {
    height: 40,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textPrimary,
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 50,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
  },
  pickerItem: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textPrimary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  button: {
    padding: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.md,
    flex: 1,
    marginHorizontal: theme.spacing.xs + 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonYes: {
    backgroundColor: theme.colors.success,
  },
  buttonNo: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.textLight,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.medium,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    ...theme.shadows.md,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  cardText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
  },
});

export default styles;
