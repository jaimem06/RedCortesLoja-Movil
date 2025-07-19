import { StyleSheet } from 'react-native';
import { theme } from './globalTheme';

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    formContainer: {
        width: '90%',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.lg,
    },
    title: {
        fontSize: theme.typography.fontSize['3xl'],
        fontFamily: theme.typography.fontFamily.headingBold,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    input: {
        marginBottom: theme.spacing.sm + 2,
        backgroundColor: theme.colors.surface,
    },
    label: {
        fontSize: theme.typography.fontSize.base,
        marginBottom: theme.spacing.xs + 1,
        color: theme.colors.textPrimary,
        fontFamily: theme.typography.fontFamily.medium,
    },
    picker: {
        backgroundColor: theme.colors.surfaceSecondary,
        borderRadius: theme.borderRadius.md + 2,
        marginBottom: theme.spacing.md - 1,
    },
    buttonGps: {
        marginVertical: theme.spacing.sm + 2,
        backgroundColor: theme.colors.warning,
    },
    buttonRegister: {
        backgroundColor: theme.colors.success,
    },
    footer: {
        marginTop: theme.spacing.md + 1,
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    link: {
        color: theme.colors.secondary,
        fontFamily: theme.typography.fontFamily.semiBold,
    },
});

export default RegisterStyles;
