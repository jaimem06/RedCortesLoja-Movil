import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { registrarPushToken } from '../api/endpoints';

const ProfileScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  useEffect(() => {
    const registerForPushNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso para notificaciones denegado');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      console.log('Token de notificaciones:', token);
    };

    registerForPushNotifications();
  }, []);

  const handleRegisterToken = async () => {
    try {
      const data = { token: expoPushToken, sector_id: sectorId, usuario_id: usuarioId };
      const response = await registrarPushToken(data);
      console.log('Respuesta del backend:', response);
    } catch (error) {
      console.error('Error al registrar el token de push:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Token de Notificaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Sector ID"
        value={sectorId}
        onChangeText={setSectorId}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario ID"
        value={usuarioId}
        onChangeText={setUsuarioId}
      />
      <TextInput
        style={styles.input}
        placeholder="Token"
        value={expoPushToken}
        editable={false}
      />
      <Button title="Registrar Token" onPress={handleRegisterToken} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;