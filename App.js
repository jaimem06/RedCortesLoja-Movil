import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import LoginScreen from './screens/LoginScreen';
import BottomTabNavigator from './components/BottomTabNavigator';

const Stack = createStackNavigator();

// Configura el manejo de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Muestra una alerta cuando llega una notificación
    shouldPlaySound: true, // Reproduce un sonido
    shouldSetBadge: true, // Actualiza el badge de la app
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');

  // Solicitar permisos para notificaciones
  useEffect(() => {
    const registerForPushNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso para notificaciones denegado');
        return;
      }

      // Obtener el token de notificaciones
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      console.log('Token de notificaciones:', token);

      // Enviar el token a tu backend (aquí puedes hacer una petición POST)
      // await sendTokenToBackend(token);
    };

    registerForPushNotifications();
  }, []);

  // Escuchar notificaciones entrantes
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notificación recibida:', notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;