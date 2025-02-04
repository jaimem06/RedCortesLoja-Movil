import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegisterStyles from '../styles/RegisterStyles';
import { register } from '../api/endpoints';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleRegister = async () => {
    if (!nombre || !apellido || !correo || !contraseña || !ubicacion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
  
    try {
      const data = { nombre, apellido, correo, contraseña, ubicacion };
      const response = await register(data);
      
      console.log("🔍 Respuesta completa del backend:", response);
  
      // Verifica si la respuesta es un array y extrae el mensaje correctamente
      const message = Array.isArray(response) ? response[0]?.message : response.message;
  
      if (message === "Usuario creado exitosamente") {
        Alert.alert('Éxito', 'Registro exitoso', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        Alert.alert('Error', message || 'No se pudo registrar el usuario');
      }
    } catch (error) {
      console.error("❌ Error en el registro:", error.response?.data || error.message);
      Alert.alert('Error', 'Hubo un problema con el registro. Inténtalo nuevamente.');
    }
  };
  
  

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Registro</Text>
      <TextInput style={RegisterStyles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={RegisterStyles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <TextInput style={RegisterStyles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} />
      <TextInput style={RegisterStyles.input} placeholder="Contraseña" secureTextEntry value={contraseña} onChangeText={setContraseña} />
      <TextInput style={RegisterStyles.input} placeholder="Ubicación" value={ubicacion} onChangeText={setUbicacion} />
      
      <TouchableOpacity style={RegisterStyles.button} onPress={handleRegister}>
        <Text style={RegisterStyles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={RegisterStyles.footer}>¿Ya tienes cuenta? <Text style={{ color: 'blue' }}>Inicia sesión</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;