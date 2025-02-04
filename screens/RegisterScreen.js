import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RegisterStyles from '../styles/RegisterStyles';
import { TextInput, Button } from 'react-native-paper';
import { register, listarUbicaciones } from '../api/endpoints';
import { determinarUbicacionPorGPS } from '../utils/ubicacionesHelper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [ubicacionesDisponibles, setUbicacionesDisponibles] = useState([]);
  
  useEffect(() => {
    const cargarUbicaciones = async () => {
      const ubicaciones = await listarUbicaciones();
      setUbicacionesDisponibles(ubicaciones);
    };
    cargarUbicaciones();
  }, []);

  const manejarUbicacionPorGPS = async () => {
    const ubicacionDetectada = await determinarUbicacionPorGPS();
    if (ubicacionDetectada) {
      setUbicacion(ubicacionDetectada);
      Alert.alert('Ubicación detectada', `Se encontró: ${ubicacionDetectada}`);
    } else {
      Alert.alert('Error', 'No se pudo determinar la ubicación.');
    }
  };

  const handleRegister = async () => {
    if (!nombre || !apellido || !correo || !contraseña || !ubicacion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
  
    try {
      const data = { nombre, apellido, correo, contraseña, ubicacion };
      const response = await register(data);
      
      console.log('📌 Respuesta del servidor:', response); // Depuración
  
      // Extraer correctamente el mensaje desde response.data
      const message = response.data[0]?.message;
  
      if (message === 'Usuario creado exitosamente') {
        Alert.alert('Éxito', 'Registro exitoso', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        Alert.alert('Error', message || 'No se pudo registrar el usuario');
      }
    } catch (error) {
      console.error('❌ Error en el registro:', error.response?.data || error.message);
      Alert.alert('Error', 'Hubo un problema con el registro. Inténtalo nuevamente.');
    }
  };
  
  

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={RegisterStyles.container}>
      <View style={RegisterStyles.formContainer}>
        <Text style={RegisterStyles.title}>Ingrese sus datos</Text>
        
        <TextInput label='Nombre' value={nombre} onChangeText={setNombre} style={RegisterStyles.input} left={<TextInput.Icon name='account' />} />
        <TextInput label='Apellido' value={apellido} onChangeText={setApellido} style={RegisterStyles.input} left={<TextInput.Icon name='account' />} />
        <TextInput label='Correo' value={correo} onChangeText={setCorreo} style={RegisterStyles.input} keyboardType='email-address' left={<TextInput.Icon name='email' />} />
        <TextInput label='Contraseña' value={contraseña} onChangeText={setContraseña} secureTextEntry style={RegisterStyles.input} left={<TextInput.Icon name='lock' />} />
        
        <Text style={RegisterStyles.label}>Selecciona tu ubicación:</Text>
        <Picker selectedValue={ubicacion} onValueChange={(itemValue) => setUbicacion(itemValue)} style={RegisterStyles.picker}>
          <Picker.Item label='Selecciona una ubicación' value='' />
          {ubicacionesDisponibles.map((ubicacionItem) => (
            <Picker.Item key={ubicacionItem._id} label={ubicacionItem.nombre} value={ubicacionItem.nombre} />
          ))}
        </Picker>

        <Button mode='contained' icon='map-marker' onPress={manejarUbicacionPorGPS} style={RegisterStyles.buttonGps}>
          Usar GPS
        </Button>

        <Button mode='contained' icon='check' onPress={handleRegister} style={RegisterStyles.buttonRegister}>
          Registrarse
        </Button>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={RegisterStyles.footer}>¿Ya tienes cuenta? <Text style={RegisterStyles.link}>Inicia sesión</Text></Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;
