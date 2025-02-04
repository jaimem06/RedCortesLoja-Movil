import { ServiciodeUsuariosyUbicaciones, ServiciodeSupervisoresNotificacionesdeValidacion } from './api';

// Método POST para registrar usuarios
export const register = async (data) => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.post('usuario/crear', data);
    console.log("📡 Petición enviada:", data);  // <-- Agrega esto
    return response.data;
  } catch (error) {
    console.error("❌ Error en el backend:", error.response?.data || error.message);
    throw error;
  }
};


// Método GET para listar ubicaciones
export const listarUbicaciones = async () => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.get('ubicacion/listar');
    console.log('✅ Respuesta del backend para ubicaciones:', JSON.stringify(response.data, null, 2));
    
    // Devuelve directamente response.data si es un array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('❌ Error al listar ubicaciones:', error);
    return [];
  }
};

// Método GET para listar usuarios
export const listarUsuarios = async () => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.get('usuario/obtener');
    return response.data;
  } catch (error) {
    console.error('❌ Error al listar Usuarios:', error);
    throw error;
  }
};

// Método GET para listar cortes
export const listarCortes = async () => {
  try {
    const response = await ServiciodeSupervisoresNotificacionesdeValidacion.get('cortes/cortes');
    return response.data;
  } catch (error) {
    console.error('❌ Error al listar Cortes:', error);
    throw error;
  }
};

// Método POST para iniciar sesión
export const login = async (data) => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.post('home/login', data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error);
    throw error;
  }
};

// Método POST para registrar el token de push
export const registrarPushToken = async (data) => {
  try {
    const response = await ServiciodeSupervisoresNotificacionesdeValidacion.post('notificaciones/registrar_push_token', data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al registrar el token de push:', error);
    throw error;
  }
};
