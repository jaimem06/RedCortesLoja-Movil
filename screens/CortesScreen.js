import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { listarCortes } from '../api/endpoints';

const CortesScreen = () => {
  const [cortes, setCortes] = useState([]);

  useEffect(() => {
    const fetchCortes = async () => {
      try {
        const data = await listarCortes();
        setCortes(data.cortes);
      } catch (error) {
        console.error('Error al listar cortes:', error);
      }
    };

    fetchCortes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.sector}>{item.sector}</Text>
      <Text style={styles.tipoCorte}>{item.tipoCorte}</Text>
      <Text style={styles.estado}>{item.estado}</Text>
      <Text style={styles.fechaReporte}>{new Date(item.fechaReporte).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
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
  },
});

export default CortesScreen;
