import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../styles';

const ThemeDemo = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Sistema de Estilos Global</Text>
      
      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipografía</Text>
        <Text style={styles.h1}>Título H1 - Poppins Bold</Text>
        <Text style={styles.h2}>Título H2 - Poppins Bold</Text>
        <Text style={styles.h3}>Título H3 - Poppins SemiBold</Text>
        <Text style={styles.h4}>Título H4 - Poppins SemiBold</Text>
        <Text style={styles.bodyLarge}>Texto grande - Inter Regular</Text>
        <Text style={styles.body}>Texto normal - Inter Regular</Text>
        <Text style={styles.bodySecondary}>Texto secundario - Inter Regular</Text>
        <Text style={styles.caption}>Texto pequeño - Inter Regular</Text>
        <Text style={styles.captionSmall}>Texto muy pequeño - Inter Regular</Text>
      </View>

      {/* Colors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colores</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.primary }]} />
          <Text style={styles.colorLabel}>Primary</Text>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.secondary }]} />
          <Text style={styles.colorLabel}>Secondary</Text>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.success }]} />
          <Text style={styles.colorLabel}>Success</Text>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.error }]} />
          <Text style={styles.colorLabel}>Error</Text>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.warning }]} />
          <Text style={styles.colorLabel}>Warning</Text>
        </View>
      </View>

      {/* Buttons Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Botones</Text>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Botón Principal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Botón Secundario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSuccess}>
          <Text style={styles.buttonText}>Botón Éxito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonError}>
          <Text style={styles.buttonText}>Botón Error</Text>
        </TouchableOpacity>
      </View>

      {/* Cards Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tarjetas</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tarjeta Estándar</Text>
          <Text style={styles.cardText}>
            Esta es una tarjeta con el estilo predeterminado del sistema global.
            Incluye sombras, bordes redondeados y tipografía consistente.
          </Text>
        </View>
        <View style={styles.cardCompact}>
          <Text style={styles.cardTitle}>Tarjeta Compacta</Text>
          <Text style={styles.cardText}>Versión más pequeña para espacios reducidos.</Text>
        </View>
      </View>

      {/* Spacing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Espaciado</Text>
        <View style={styles.spacingDemo}>
          <View style={[styles.spacingBox, { margin: theme.spacing.xs }]}>
            <Text style={styles.spacingLabel}>XS (4px)</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.sm }]}>
            <Text style={styles.spacingLabel}>SM (8px)</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.md }]}>
            <Text style={styles.spacingLabel}>MD (16px)</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.lg }]}>
            <Text style={styles.spacingLabel}>LG (24px)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  mainTitle: {
    ...theme.globalStyles.h1,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.primary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.globalStyles.h3,
    marginBottom: theme.spacing.md,
    color: theme.colors.secondary,
  },
  
  // Typography styles
  h1: theme.globalStyles.h1,
  h2: theme.globalStyles.h2,
  h3: theme.globalStyles.h3,
  h4: theme.globalStyles.h4,
  bodyLarge: theme.globalStyles.bodyLarge,
  body: theme.globalStyles.body,
  bodySecondary: theme.globalStyles.bodySecondary,
  caption: theme.globalStyles.caption,
  captionSmall: theme.globalStyles.captionSmall,
  
  // Color demo styles
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    ...theme.shadows.sm,
  },
  colorLabel: theme.globalStyles.body,
  
  // Button styles
  buttonPrimary: {
    ...theme.globalStyles.buttonPrimary,
    marginBottom: theme.spacing.sm,
  },
  buttonSecondary: {
    ...theme.globalStyles.buttonSecondary,
    marginBottom: theme.spacing.sm,
  },
  buttonSuccess: {
    ...theme.globalStyles.buttonSuccess,
    marginBottom: theme.spacing.sm,
  },
  buttonError: {
    ...theme.globalStyles.buttonError,
    marginBottom: theme.spacing.sm,
  },
  buttonText: theme.globalStyles.buttonText,
  
  // Card styles
  card: {
    ...theme.globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  cardCompact: {
    ...theme.globalStyles.cardCompact,
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    ...theme.globalStyles.h4,
    marginBottom: theme.spacing.sm,
  },
  cardText: theme.globalStyles.body,
  
  // Spacing demo styles
  spacingDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  spacingBox: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  spacingLabel: {
    color: theme.colors.textLight,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default ThemeDemo;