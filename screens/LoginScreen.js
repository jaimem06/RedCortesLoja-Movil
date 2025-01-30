import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoginStyles from '../styles/LoginStyles'; // Importa los estilos

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    navigation.navigate('Home');
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Iniciar Sesión</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Nombre de usuario"
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