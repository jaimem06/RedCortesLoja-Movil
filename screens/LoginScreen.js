import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import LoginStyles from '../styles/LoginStyles';
import { login } from '../api/endpoints';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = { correo: username, contraseña: password };
    const result = await login(data);

    if (result.success) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } else {
      // ✅ Mostramos solo un mensaje sin imprimir errores en la consola
      Alert.alert("Error", result.message);
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

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={LoginStyles.footer}>¿No tienes una cuenta? <Text style={LoginStyles.link}>Regístrate</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;