import api from './api';

// Método GET para obtener datos
export const getData = async () => {
  try {
    const response = await api.get('/endpoint');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

// Método POST para enviar datos
export const postData = async (data) => {
  try {
    const response = await api.post('/endpoint', data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar datos:', error);
    throw error;
  }
};

// Puedes agregar más métodos aquí (PUT, DELETE, etc.)