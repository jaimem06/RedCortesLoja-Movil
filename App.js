import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import LoginScreen from './screens/LoginScreen';
import BottomTabNavigator from './components/BottomTabNavigator';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    const registerForPushNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso para notificaciones denegado');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      console.log('Token de notificaciones:', token);

    };

    registerForPushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notificación recibida:', notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RedCortesLoja">
        <Stack.Screen name="RedCortesLoja" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;