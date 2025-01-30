import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { listarUsuarios } from '../api/endpoints';

const ProfileScreen = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await listarUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al listar usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.apellido}</Text>
      <Text style={styles.cell}>{item.correo}</Text>
      <Text style={styles.cell}>{item.ubicacion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nombre</Text>
          <Text style={styles.headerCell}>Apellido</Text>
          <Text style={styles.headerCell}>Correo</Text>
          <Text style={styles.headerCell}>Ubicación</Text>
        </View>
        <FlatList
          data={usuarios}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  headerCell: {
    flex: 1,
    padding: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  cell: {
    flex: 1,
    padding: 12,
    textAlign: 'center',
    color: '#333',
  },
});

export default ProfileScreen;