import * as Location from 'expo-location';
import axios from 'axios';
import { point, booleanPointInPolygon } from '@turf/turf';
import { listarUbicaciones } from '../api/endpoints';

// Función para obtener la ubicación actual del usuario
export const obtenerUbicacionActual = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permiso de ubicación denegado');
    }

    let location = await Location.getCurrentPositionAsync({});
    return {
      latitud: location.coords.latitude,
      longitud: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error obteniendo la ubicación:', error);
    return null;
  }
};

// Función para verificar en qué polígono se encuentra la ubicación actual
export const determinarUbicacionPorGPS = async () => {
  try {
    const ubicacionActual = await obtenerUbicacionActual();
    if (!ubicacionActual) return null;

    const ubicaciones = await listarUbicaciones(); // Obtener polígonos desde la API
    const puntoUsuario = point([ubicacionActual.longitud, ubicacionActual.latitud]);

    for (const ubicacion of ubicaciones) {
      if (ubicacion.geojson) {
        const poligono = ubicacion.geojson;
        if (booleanPointInPolygon(puntoUsuario, poligono)) {
          return ubicacion.nombre; // Retorna el nombre de la ubicación encontrada
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error determinando la ubicación por GPS:', error);
    return null;
  }
};
