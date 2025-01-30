import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fondo claro y minimalista
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333', // Color oscuro para el título
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff', // Fondo blanco para los inputs
    borderColor: '#ddd', // Borde sutil
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#333', // Color oscuro para el texto
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200ee', // Color morado elegante
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para el botón
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#666', // Texto gris para el footer
  },
});

export default LoginStyles;