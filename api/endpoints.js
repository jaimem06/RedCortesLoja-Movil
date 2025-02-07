import { ServiciodeUsuariosyUbicaciones, ServiciodeSupervisoresNotificacionesdeValidacion } from './api';
import { getExpoPushTokenAsync } from 'expo-notifications'; // Asegúrate de importar correctamente
import * as Notifications from 'expo-notifications';






// Método POST para registrar usuarios
export const register = async (data) => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.post('usuario/crear', data);
    console.log("📡 Petición enviada:", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Error en el backend:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error en el registro. Inténtalo de nuevo.",
    };
  }
};

// Método GET para listar ubicaciones
export const listarUbicaciones = async () => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.get('ubicacion/listar');
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
    return [];
  }
};

// Método GET para listar cortes
export const listarCortes = async () => {
  try {
    const response = await ServiciodeSupervisoresNotificacionesdeValidacion.get('cortes/cortes');
    return response.data;
  } catch (error) {
    console.error('❌ Error al listar cortes:', error);
    return [];
  }
};



// Método para obtener el token push
export const obtenerTokenPush = async () => {
  try {
    // Obtén el token push desde Expo Notifications
    const tokenPush = await getExpoPushTokenAsync();
    const token = tokenPush.data; // Esto es el token en formato correcto

    console.log('Token de notificación:', token); // Verifica que el token es correcto

    return token; // Retorna el token
  } catch (error) {
    console.error('❌ Error al obtener el token push:', error.response ? error.response.data : error.message);
    throw new Error('Error al obtener el token push'); // Lanza error si no se puede obtener el token
  }
};


export const listarCortesPorSector = async () => {
  try {
    // Obtén el token push desde Expo Notifications
    const tokenPush = await getExpoPushTokenAsync();
    const token = tokenPush.data; // Esto es el token en formato correcto

    console.log('Token de notificación:', token); // Verifica que el token es correcto

    // Realiza la solicitud al backend pasando el token como Authorization
    const response = await ServiciodeSupervisoresNotificacionesdeValidacion.get(
      'cortes/cortes_por_sector',
      {
        headers: {
          Authorization: `ExponentPushToken[${token}]`, // Agregar el token a la cabecera Authorization
        },
      }
    );

    console.log('Respuesta de la API:', response.data); // Verifica que la respuesta contiene los cortes

    return response.data; // Devuelve la respuesta con los cortes
  } catch (error) {
    console.error('❌ Error al listar cortes por sector:', error.response ? error.response.data : error.message);
    return { cortes: [] }; // Cambié esto para asegurarme que la respuesta tenga la estructura esperada
  }
};






// Método GET para obtener nombres de sectores
export const obtenerNombresSectores = async () => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.get('/ubicacion/nombres_sectores');
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener nombres de sectores:', error);
    return [];
  }
};

// Método POST para iniciar sesión
export const login = async (data) => {
  try {
    const response = await ServiciodeUsuariosyUbicaciones.post('home/login', data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: "Correo o contraseña incorrectos.",
    };
  }
};

// Método POST para registrar el token de push
export const registrarPushToken = async (data) => {
  try {
    const response = await ServiciodeSupervisoresNotificacionesdeValidacion.post('notificaciones/registrar_push_token', data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Error al registrar el token de push:', error);
    return {
      success: false,
      message: "No se pudo registrar el token de notificaciones.",
    };
  }
};

// Método POST para enviar la respuesta de la notificación
export const enviarRespuestaNotificacion = async (data) => {
  try {
    console.log('📡 Enviando datos a notificaciones/respuesta_notificacion:', data);
    const response = await ServiciodeSupervisoresNotificacionesdeValidacion.post('notificaciones/respuesta_notificacion', data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Error al enviar la respuesta de la notificación:', error);
    return {
      success: false,
      message: "No se pudo enviar la respuesta de la notificación.",
    };
  }
};
