import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { listarUbicaciones } from '../api/endpoints';
import { MaterialIcons } from '@expo/vector-icons';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // Pedir permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación denegado');
        setLoading(false);
        return;
      }

      // Obtener la ubicación del usuario
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      try {
        // Obtener datos de ubicaciones desde la API
        const data = await listarUbicaciones();
        console.log('📌 Datos recibidos del servicio:', JSON.stringify(data, null, 2));

        let minLat = Number.MAX_VALUE, maxLat = Number.MIN_VALUE;
        let minLon = Number.MAX_VALUE, maxLon = Number.MIN_VALUE;

        const formattedPolygons = data.map((item) => {
          if (!item.geojson || !item.geojson.geometry || !item.geojson.geometry.coordinates) {
            console.warn("⚠️ GeoJSON inválido:", item);
            return null;
          }

          let rawCoordinates = item.geojson.geometry.coordinates;
          if (item.geojson.geometry.type === "Polygon") {
            rawCoordinates = rawCoordinates[0]; // Tomamos el primer anillo del polígono
          }

          if (!Array.isArray(rawCoordinates)) {
            console.warn("⚠️ Coordenadas no son un array válido:", rawCoordinates);
            return null;
          }

          const coordinates = rawCoordinates.map(([longitude, latitude]) => {
            if (latitude < minLat) minLat = latitude;
            if (latitude > maxLat) maxLat = latitude;
            if (longitude < minLon) minLon = longitude;
            if (longitude > maxLon) maxLon = longitude;
            return { latitude, longitude };
          });

          return { coordinates, name: item.nombre };
        }).filter(Boolean);

        console.log("📍 Polígonos formateados:", JSON.stringify(formattedPolygons, null, 2));
        setPolygons(formattedPolygons);

        if (formattedPolygons.length > 0) {
          setRegion({
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2,
            latitudeDelta: Math.abs(maxLat - minLat) * 1.2,
            longitudeDelta: Math.abs(maxLon - minLon) * 1.2,
          });
        }

      } catch (error) {
        console.error('❌ Error al listar ubicaciones:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Función para centrar el mapa en la ubicación del usuario
  const centerMap = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {location && (
          <Marker
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title="Tu ubicación"
            description="Estás aquí"
          />
        )}
        {polygons.map((polygon, index) => (
          <Polygon
            key={index}
            coordinates={polygon.coordinates}
            strokeColor="#FF0000"
            fillColor="rgba(0, 255, 34, 0.3)"
            strokeWidth={2}
          />
        ))}
      </MapView>

      {/* Botón flotante para centrar la ubicación */}
      <TouchableOpacity style={styles.button} onPress={centerMap}>
        <MaterialIcons name="my-location" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
