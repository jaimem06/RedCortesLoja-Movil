import axios from 'axios';

const BASE_URL_USUARIOS_UBICACIONES = 'https://serviciodeusuariosyubicaciones-ejc7emcfe4atbvde.canadacentral-01.azurewebsites.net';
const BASE_URL_SUPERVISORES_NOTIFICACIONES = 'https://servicio-dpdubkhed9bac2dk.eastus-01.azurewebsites.net/';

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

ServiciodeUsuariosyUbicaciones.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición del backend (Usuarios y Ubicaciones):', error);
    return Promise.reject(error);
  }
);

ServiciodeSupervisoresNotificacionesdeValidacion.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición del backend (Supervisores y Notificaciones de Validación):', error);
    return Promise.reject(error);
  }
);

export { ServiciodeUsuariosyUbicaciones, ServiciodeSupervisoresNotificacionesdeValidacion };