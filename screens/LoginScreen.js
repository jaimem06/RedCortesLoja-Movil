import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LoginStyles from '../styles/LoginStyles'; // Importa los estilos
import { login } from '../api/endpoints'; // Importa el método login del archivo endpoint.js

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = {
        correo: username,
        contraseña: password,
      };

      console.log('Datos enviados al backend:', data);  // Verifica los datos enviados
      console.log('Respuesta del backend:', response);  // Imprime la respuesta completa

      const response = await login(data);

      if (response.code === 200) {
        // Autenticación exitosa, navega a la pantalla de inicio
        navigation.navigate('Home');
      } else {
        // Error de autenticación, muestra un mensaje
        Alert.alert('Error', response.datos.error || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión. Intenta de nuevo.');
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Iniciar Sesión</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Correo"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
        <Text style={LoginStyles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <Text style={LoginStyles.footer}>¿No tienes una cuenta? Regístrate</Text>
    </View>
  );
};

export default LoginScreen;
