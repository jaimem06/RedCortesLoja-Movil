import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { listarCortes, enviarRespuestaNotificacion } from '../api/endpoints';

const CortesScreen = () => {
  const [cortes, setCortes] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [respuestaEnviada, setRespuestaEnviada] = useState({}); // Estado para manejar la respuesta enviada
  const [mensajeNotificacion, setMensajeNotificacion] = useState(''); // Mensaje de notificación
  const [tipoRespuesta, setTipoRespuesta] = useState(''); // Guardar tipo de respuesta (Sí/No)

  const fetchCortes = useCallback(async () => {
    try {
      const data = await listarCortes();
      setCortes(data.cortes);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error al listar cortes:', error);
    }
  }, []);

  useEffect(() => {
    fetchCortes(); // Cargar datos inicialmente

    // Actualizar cada 30 segundos
    const interval = setInterval(() => {
      fetchCortes();
    }, 30000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [fetchCortes]);

  const handleCorteResponse = async (corteId, respuesta) => {
    try {
      const data = { 
        corte_id: corteId, 
        respuesta: respuesta // Enviar directamente el booleano
      };
      console.log('Enviando respuesta:', data);
      const response = await enviarRespuestaNotificacion(data);
      console.log('Respuesta del backend:', response);
      
      if (response.data?.message?.includes('tiempo de respuesta ha finalizado')) {
        Alert.alert(
          'Tiempo expirado',
          'El tiempo para responder a este corte ha finalizado.',
          [{ text: 'OK' }]
        );
      } else if (response.success) {
        // Marcar el corte como respondido
        setRespuestaEnviada(prevState => ({
          ...prevState,
          [corteId]: true // Marcar este corte como respondido
        }));
        setTipoRespuesta(respuesta ? 'Sí' : 'No'); // Guardar tipo de respuesta
        setMensajeNotificacion(`Voto registrado: ${respuesta ? 'Sí' : 'No'}`); // Mensaje de confirmación
        fetchCortes(); // Actualizar lista después de enviar respuesta

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
          setMensajeNotificacion('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
      Alert.alert('Error', 'No se pudo enviar la respuesta. Intente nuevamente.');
    }
  };

  const getCardBorderColor = (estado) => {
    switch (estado) {
      case 'confirmado':
        return '#28a745'; // Verde
      case 'rechazado':
        return '#dc3545'; // Rojo
      case 'pendiente':
      default:
        return '#ccc'; // Gris
    }
  };

  const renderItem = ({ item }) => {
    const createdAt = new Date(item.fechaReporte);
    const now = new Date();
    const timeDiff = now - createdAt;
    const minutesPassed = timeDiff / (1000 * 60);
    const isExpired = minutesPassed > 15;

    const isRespuestaEnviada = respuestaEnviada[item.external_id]; // Verificar si ya se envió la respuesta

    return (
      <View style={[styles.card, { borderColor: getCardBorderColor(item.estado) }]}> 
        <Text style={styles.sector}>{item.sector}</Text>
        <Text style={styles.tipoCorte}>{item.tipoCorte}</Text>
        <Text style={styles.estado}>{item.estado}</Text>
        <Text style={styles.fechaReporte}>
          {new Date(item.fechaReporte).toLocaleString('es-ES', {
            weekday: 'long', // Día de la semana
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          })}
        </Text>
        
        {item.estado === 'pendiente' && !isExpired && !isRespuestaEnviada && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonYes]} 
              onPress={() => handleCorteResponse(item.external_id, true)} // Enviar verdadero
            >
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNo]} 
              onPress={() => handleCorteResponse(item.external_id, false)} // Enviar falso
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {isRespuestaEnviada && (
          <Text style={styles.votoRegistradoText}>Voto registrado: {tipoRespuesta}</Text> // Mostrar la respuesta registrada
        )}

        {item.estado === 'pendiente' && isExpired && (
          <Text style={styles.expiredText}>Tiempo de respuesta expirado</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Notificación de Voto Registrado */}
      {mensajeNotificacion !== '' && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{mensajeNotificacion}</Text>
        </View>
      )}

      <FlatList
        data={cortes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  notification: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 16,
    zIndex: 999,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  notificationText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
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
    borderWidth: 3, // Borde más grueso para visibilidad
  },
  sector: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tipoCorte: {
    fontSize: 16,
    color: '#666',
  },
  estado: {
    fontSize: 14,
    color: '#999',
  },
  fechaReporte: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonYes: {
    backgroundColor: '#28a745',
  },
  buttonNo: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  expiredText: {
    color: '#dc3545',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  votoRegistradoText: {
    color: '#28a745',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CortesScreen;
