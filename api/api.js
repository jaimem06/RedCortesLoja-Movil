import axios from 'axios';

const BASE_URL_USUARIOS_UBICACIONES = 'https://serviciousuariosubicaciones-akc5c9b3b2edetg4.canadacentral-01.azurewebsites.net/';
const BASE_URL_SUPERVISORES_NOTIFICACIONES = 'https://servicio-dpdubkhed9bac2dk.eastus-01.azurewebsites.net/';
//const BASE_URL_SUPERVISORES_NOTIFICACIONES = 'http://192.168.101.7:5000/';

const ServiciodeUsuariosyUbicaciones = axios.create({
  baseURL: BASE_URL_USUARIOS_UBICACIONES,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ServiciodeSupervisoresNotificacionesdeValidacion = axios.create({
  baseURL: BASE_URL_SUPERVISORES_NOTIFICACIONES,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para manejar errores solo en la terminal, sin afectar la UI
const handleErrorResponse = (error) => {
  if (error.response) {
    // Si hay una respuesta del servidor con error
    console.log(`⚠️ [${error.response.status}] Error en la petición:`, error.response.data);
  } else if (error.request) {
    // Si no hay respuesta del servidor
    console.log('⚠️ No se recibió respuesta del servidor:', error.request);
  } else {
    // Otros errores
    console.log('⚠️ Error en la configuración de la petición:', error.message);
  }
  
  // Retornar un error genérico sin afectar la UI
  return Promise.reject({ message: 'Hubo un problema con la solicitud.' });
};

// Aplicar interceptor de respuesta a ambos servicios
ServiciodeUsuariosyUbicaciones.interceptors.response.use(
  (response) => response,
  handleErrorResponse
);

ServiciodeSupervisoresNotificacionesdeValidacion.interceptors.response.use(
  (response) => response,
  handleErrorResponse
);

export { ServiciodeUsuariosyUbicaciones, ServiciodeSupervisoresNotificacionesdeValidacion };
