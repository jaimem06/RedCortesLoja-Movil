import api from './api';
import { ServiciodeUsuariosyUbicaciones, ServiciodeSupervisoresNotificacionesdeValidacion } from './api';

// Método GET para listar ubicaciones
export const listarUbicaciones = async () => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.get('ubicacion/listar');
    console.log('Respuesta del backend para ubicaciones:', response.data); // Verifica la estructura de la respuesta
    //return response.data;
    return response.data.ubicaciones || []; 
  } catch (error) {
    console.error('Error al listar ubicaciones:', error);
    throw error;
  }
};

// Método GET para listar usuarios
export const listarUsuarios = async () => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.get('usuario/obtener');
    return response.data;
  } catch (error) {
    console.error('Error al listar Usuarios:', error);
    throw error;
  }
};

// Método GET para listar cortes
export const listarCortes = async () => {
  try {
    const response = await ServiciodeSupervisoresNotificacionesdeValidacion.get('cortes/cortes');
    return response.data;
  } catch (error) {
    console.error('Error al listar Cortes:', error);
    throw error;
  }
};

// Método POST para iniciar sesión
export const login = async (data) => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.post('home/login', data);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};
