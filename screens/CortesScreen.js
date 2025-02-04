import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { listarCortes, enviarRespuestaNotificacion } from '../api/endpoints';

const CortesScreen = () => {
  const [cortes, setCortes] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

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
        respuesta  // Enviar directamente el booleano
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
        fetchCortes(); // Actualizar lista después de enviar respuesta
      }
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
      Alert.alert('Error', 'No se pudo enviar la respuesta. Intente nuevamente.');
    }
  };

  const renderItem = ({ item }) => {
    // Calcular si han pasado más de 15 minutos
    const createdAt = new Date(item.fechaReporte);
    const now = new Date();
    const timeDiff = now - createdAt;
    const minutesPassed = timeDiff / (1000 * 60);
    const isExpired = minutesPassed > 15;

    return (
      <View style={styles.card}>
        <Text style={styles.sector}>{item.sector}</Text>
        <Text style={styles.tipoCorte}>{item.tipoCorte}</Text>
        <Text style={styles.estado}>{item.estado}</Text>
        <Text style={styles.fechaReporte}>{new Date(item.fechaReporte).toLocaleDateString()}</Text>
        
        {item.estado === 'pendiente' && !isExpired && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonYes]} 
              onPress={() => handleCorteResponse(item.external_id, true)}
            >
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNo]} 
              onPress={() => handleCorteResponse(item.external_id, false)}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.estado === 'pendiente' && isExpired && (
          <Text style={styles.expiredText}>Tiempo de respuesta expirado</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cortes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
});

export default CortesScreen;
