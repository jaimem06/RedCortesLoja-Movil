import axios from 'axios';

// URL base de tu backend
const BASE_URL = 'https://tubackend.com/api';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la retornamos
  (error) => {
    console.error('Error en la petición del backend:', error);
    return Promise.reject(error);
  }
);

export default api;