# Sistema de Estilos Global - Red Cortes Loja Móvil

## Descripción
Esta implementación proporciona un sistema de estilos global consistente y elegante para la aplicación móvil Red Cortes Loja.

## Características Principales

### 🎨 Paleta de Colores Centralizada
Los colores están basados en los patrones más frecuentes del código existente:

```javascript
// Colores principales
primary: '#6200ee'      // Púrpura elegante (botones principales)
secondary: '#007AFF'    // Azul (enlaces, botones secundarios)
success: '#28a745'      // Verde (éxito, confirmaciones)
error: '#dc3545'        // Rojo (errores, cancelaciones)
warning: '#ff9800'      // Naranja (advertencias, GPS)

// Colores de fondo
background: '#f8f8f8'   // Fondo principal de pantallas
surface: '#ffffff'      // Fondo de tarjetas y formularios

// Jerarquía de texto
textPrimary: '#333333'    // Texto principal (títulos, etiquetas)
textSecondary: '#666666'  // Texto secundario (subtítulos)
textTertiary: '#999999'   // Texto terciario (información menos importante)
textQuaternary: '#aaaaaa' // Texto muy sutil (timestamps, metadatos)
```

### ✍️ Tipografía Elegante
Sistema de fuentes moderno con jerarquía clara:

**Fuentes:**
- **Inter**: Para texto del cuerpo (legible, profesional)
- **Poppins**: Para títulos y encabezados (elegante, impactante)

**Escala de tamaños:**
```javascript
xs: 12px    // Texto muy pequeño (metadatos)
sm: 14px    // Texto pequeño (subtítulos)
base: 16px  // Texto base (cuerpo)
lg: 18px    // Texto grande (destacados)
xl: 20px    // Títulos pequeños
2xl: 24px   // Títulos medianos
3xl: 28px   // Títulos grandes
4xl: 32px   // Títulos principales
5xl: 36px   // Títulos hero
```

### 📐 Sistema de Espaciado
Espaciado consistente basado en múltiplos de 4:

```javascript
xs: 4px     // Espaciado mínimo
sm: 8px     // Espaciado pequeño
md: 16px    // Espaciado medio (más común)
lg: 24px    // Espaciado grande
xl: 32px    // Espaciado extra grande
2xl: 48px   // Espaciado muy grande
3xl: 64px   // Espaciado máximo
```

## Uso del Sistema

### 1. Importación Básica
```javascript
import { theme, useTheme } from '../styles';
// o
import { colors, typography, spacing } from '../styles/globalTheme';
```

### 2. Usando el Hook de Tema
```javascript
import { useTheme } from '../styles';

const MyComponent = () => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
    title: {
      ...theme.globalStyles.h2,
      color: theme.colors.primary,
    },
  });
};
```

### 3. Usando Estilos Globales Predefinidos
```javascript
import { theme } from '../styles';

const styles = StyleSheet.create({
  title: theme.globalStyles.h1,           // Título principal
  subtitle: theme.globalStyles.h3,        // Subtítulo
  body: theme.globalStyles.body,          // Texto del cuerpo
  card: theme.globalStyles.card,          // Tarjeta estándar
  button: theme.globalStyles.buttonPrimary, // Botón principal
});
```

### 4. Usando Utilidades
```javascript
import { getColor, createButtonStyle, createTextStyle } from '../styles/styleUtils';

const styles = StyleSheet.create({
  customButton: createButtonStyle('success', 'lg', {
    borderRadius: 20,
  }),
  customText: createTextStyle('body', 'textSecondary', {
    fontStyle: 'italic',
  }),
});
```

## Componentes Migrados

### ✅ Completamente Migrados
- **LoginStyles.js** - Sistema de login con colores y tipografía unificados
- **RegisterStyles.js** - Formulario de registro con estilos consistentes
- **ProfileScreenStyles.js** - Pantalla de perfil actualizada
- **CortesScreen.js** - Lista de cortes con nuevo sistema de estilos
- **Map.js** - Componente de mapa con colores actualizados

### 🎨 Mejoras Visuales Implementadas

1. **Consistencia de Colores**: Todos los componentes ahora usan la misma paleta
2. **Tipografía Elegante**: Fuentes Inter y Poppins para mejor legibilidad
3. **Espaciado Uniforme**: Sistema de espaciado basado en múltiplos de 4
4. **Jerarquía Visual**: Clara diferenciación entre niveles de información
5. **Sombras Consistentes**: Efectos de profundidad unificados

## Beneficios del Sistema

### Para Desarrolladores:
- **Mantenibilidad**: Cambios centralizados afectan toda la app
- **Consistencia**: Menos decisiones de diseño ad-hoc
- **Productividad**: Reutilización de estilos comunes
- **Escalabilidad**: Fácil adición de nuevos componentes

### Para Usuarios:
- **Experiencia Unificada**: Interfaz coherente en toda la app
- **Mejor Legibilidad**: Tipografía optimizada para mobile
- **Accesibilidad**: Contrastes y tamaños apropiados
- **Profesionalismo**: Apariencia más pulida y moderna

## Archivos del Sistema

```
styles/
├── globalTheme.js      # Configuración principal del tema
├── ThemeProvider.js    # Proveedor de contexto de React
├── styleUtils.js       # Funciones utilitarias
├── index.js           # Punto de entrada centralizado
├── LoginStyles.js     # Estilos migrados del login
├── RegisterStyles.js  # Estilos migrados del registro
└── ProfileScreenStyles.js # Estilos migrados del perfil

components/
└── FontLoader.js      # Cargador asíncrono de fuentes
```

## Siguientes Pasos

1. **Migrar Componentes Restantes**: Aplicar el tema a componentes no migrados
2. **Modo Oscuro**: Implementar variante de tema oscuro
3. **Personalización**: Permitir personalización por usuario
4. **Accesibilidad**: Mejorar soporte para lectores de pantalla
5. **Animaciones**: Añadir transiciones suaves consistentes

## Ejemplos de Código

### Crear una Nueva Pantalla
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles';

const NewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Nueva Pantalla</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contenido</Text>
        <Text style={styles.cardText}>
          Esta pantalla usa el sistema de estilos global.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.globalStyles.container,
    padding: theme.spacing.md,
  },
  title: theme.globalStyles.h1,
  card: theme.globalStyles.card,
  cardTitle: theme.globalStyles.h4,
  cardText: theme.globalStyles.body,
});

export default NewScreen;
```

### Personalizar un Botón
```javascript
import { createButtonStyle } from '../styles/styleUtils';

const customButton = createButtonStyle('primary', 'lg', {
  borderRadius: theme.borderRadius.xl,
  marginHorizontal: theme.spacing.sm,
});
```

Esta implementación proporciona una base sólida y escalable para el desarrollo futuro de la aplicación, manteniendo la funcionalidad existente mientras mejora significativamente la consistencia visual y la experiencia del usuario.