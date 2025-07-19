import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../styles';

const ThemeComparison = () => {
  const [showOld, setShowOld] = useState(false);

  const toggleView = () => setShowOld(!showOld);

  const oldStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 40,
    },
    card: {
      backgroundColor: '#fff',
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 4,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    cardText: {
      fontSize: 16,
      color: '#666',
    },
    button: {
      backgroundColor: '#6200ee',
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  const newStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.globalStyles.h1,
      marginBottom: theme.spacing['2xl'],
    },
    card: {
      ...theme.globalStyles.card,
      marginVertical: theme.spacing.sm,
    },
    cardTitle: {
      ...theme.globalStyles.h4,
      marginBottom: theme.spacing.sm,
    },
    cardText: theme.globalStyles.bodySecondary,
    button: {
      ...theme.globalStyles.buttonPrimary,
      marginTop: theme.spacing.sm + 2,
    },
    buttonText: theme.globalStyles.buttonText,
  });

  const currentStyles = showOld ? oldStyles : newStyles;

  return (
    <ScrollView style={currentStyles.container}>
      <Text style={currentStyles.title}>
        {showOld ? 'Estilos Anteriores' : 'Sistema Global de Estilos'}
      </Text>
      
      <TouchableOpacity 
        style={[
          theme.globalStyles.buttonSecondary,
          { marginBottom: theme.spacing.lg }
        ]} 
        onPress={toggleView}
      >
        <Text style={theme.globalStyles.buttonText}>
          {showOld ? 'Ver Nuevos Estilos' : 'Ver Estilos Anteriores'}
        </Text>
      </TouchableOpacity>

      <View style={currentStyles.card}>
        <Text style={currentStyles.cardTitle}>Mejoras Implementadas</Text>
        <Text style={currentStyles.cardText}>
          {showOld 
            ? 'Estilos definidos manualmente con valores hardcodeados. Sin tipografía elegante ni sistema centralizado.'
            : 'Sistema de estilos centralizado con tipografía Inter/Poppins, colores consistentes y espaciado unificado.'
          }
        </Text>
        <TouchableOpacity style={currentStyles.button}>
          <Text style={currentStyles.buttonText}>
            {showOld ? 'Botón Anterior' : 'Botón Mejorado'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={currentStyles.card}>
        <Text style={currentStyles.cardTitle}>Beneficios del Sistema</Text>
        <Text style={currentStyles.cardText}>
          {showOld
            ? 'Colores dispersos: #333, #666, #f5f5f5, #6200ee. Tipografía inconsistente con fontWeight manual.'
            : 'Colores centralizados: theme.colors.primary, textSecondary. Tipografía con fuentes elegantes y jerarquía clara.'
          }
        </Text>
      </View>

      <View style={currentStyles.card}>
        <Text style={currentStyles.cardTitle}>Mantenibilidad</Text>
        <Text style={currentStyles.cardText}>
          {showOld
            ? 'Cambios requieren editar múltiples archivos. Riesgo de inconsistencias visuales.'
            : 'Cambios centralizados se propagan automáticamente. Consistencia garantizada en toda la app.'
          }
        </Text>
      </View>

      {!showOld && (
        <View style={currentStyles.card}>
          <Text style={currentStyles.cardTitle}>Características Nuevas</Text>
          <Text style={currentStyles.cardText}>
            • Fuentes Inter (cuerpo) y Poppins (títulos){'\n'}
            • Paleta de colores centralizada{'\n'}
            • Sistema de espaciado en múltiplos de 4{'\n'}
            • Sombras y bordes consistentes{'\n'}
            • Utilidades para desarrollo rápido{'\n'}
            • Documentación completa
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ThemeComparison;