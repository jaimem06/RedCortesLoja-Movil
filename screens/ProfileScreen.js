import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import { registrarPushToken, obtenerNombresSectores, listarCortes, enviarRespuestaNotificacion } from '../api/endpoints';
import styles from '../styles/ProfileScreenStyles';

const ProfileScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [sectores, setSectores] = useState([]);
  const [corte, setCorte] = useState(null);

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

  useEffect(() => {
    const fetchSectores = async () => {
      try {
        const data = await obtenerNombresSectores();
        setSectores(data);
      } catch (error) {
        console.error('Error al obtener nombres de sectores:', error);
      }
    };

    fetchSectores();
  }, []);

  useEffect(() => {
    const fetchCorte = async () => {
      if (sectorId) {
        try {
          const response = await listarCortes();
          const cortes = response.cortes;
          const corteFiltrado = cortes.find(corte => corte.sector === sectorId);
          setCorte(corteFiltrado);
        } catch (error) {
          console.error('Error al listar cortes:', error);
        }
      }
    };

    fetchCorte();
  }, [sectorId]);

  const handleRegisterToken = async () => {
    try {
      const data = { token: expoPushToken, sector_id: sectorId, usuario_id: usuarioId };
      const response = await registrarPushToken(data);
      console.log('Respuesta del backend:', response);
    } catch (error) {
      console.error('Error al registrar el token de push:', error);
    }
  };

  const handleCorteResponse = async (respuesta) => {
    try {
      const data = { corte_id: corte.external_id, respuesta };
      const response = await enviarRespuestaNotificacion(data);
      console.log('Respuesta del backend:', response);
    } catch (error) {
      console.error('Error al enviar la respuesta de la notificación:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Picker
        selectedValue={sectorId}
        onValueChange={(itemValue) => setSectorId(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        {sectores.map((sector, index) => (
          <Picker.Item key={index} label={sector} value={sector} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Usuario ID"
        value={usuarioId}
        onChangeText={setUsuarioId}
      />
      <Button title="Registrar Sector para recibir Notificaciones" onPress={handleRegisterToken} />
      {corte && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Corte en {corte.sector}</Text>
          <Text style={styles.cardText}>Fecha: {new Date(corte.fechaReporte).toLocaleDateString()}</Text>
          <Text style={styles.cardText}>Descripción: {corte.tipoCorte}</Text>
          <Text style={styles.cardText}>Estado: {corte.estado}</Text>
          <Text style={styles.cardText}>¿Este corte sucedió en su sector?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonYes]} onPress={() => handleCorteResponse(true)}>
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonNo]} onPress={() => handleCorteResponse(false)}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;