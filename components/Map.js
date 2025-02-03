import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { listarUbicaciones } from '../api/endpoints';
import { MaterialIcons } from '@expo/vector-icons';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const mapRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      try {
        const data = await listarUbicaciones();
        console.log('Datos recibidos del servicio:', JSON.stringify(data, null, 2));

        let minLat = Number.MAX_VALUE, maxLat = Number.MIN_VALUE;
        let minLon = Number.MAX_VALUE, maxLon = Number.MIN_VALUE;

        const formattedPolygons = data.map((item) => {
          const rawCoordinates = item?.geojson?.geometry?.coordinates?.[0]; 
          if (!rawCoordinates) return null; 

          const coordinates = rawCoordinates.map(([longitude, latitude]) => ({ latitude, longitude }));

          coordinates.forEach(({ latitude, longitude }) => {
            if (latitude < minLat) minLat = latitude;
            if (latitude > maxLat) maxLat = latitude;
            if (longitude < minLon) minLon = longitude;
            if (longitude > maxLon) maxLon = longitude;
          });

          return { coordinates, name: item.nombre };
        }).filter(Boolean); 

        setPolygons(formattedPolygons);

        setRegion({
          latitude: (minLat + maxLat) / 2,
          longitude: (minLon + maxLon) / 2,
          latitudeDelta: Math.abs(maxLat - minLat) * 1.2,
          longitudeDelta: Math.abs(maxLon - minLon) * 1.2,
        });
      } catch (error) {
        console.error('Error al listar ubicaciones:', error);
      }
    })();
  }, []);

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

  if (!region) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -3.99004,
            longitude: -79.225554,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />
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
            fillColor="rgba(255, 0, 0, 0.3)"
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
});

export default Map;
