import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CortesScreen from '../screens/CortesScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Sectores') {
            iconName = 'home-outline';
          } else if (route.name === 'Informacion') {
            iconName = 'information-circle-outline';
          } else if (route.name === 'Corte') {
            iconName = 'settings-outline';
          } else if (route.name === 'Cortes') {
            iconName = 'cut-outline'; // Icono para Cortes
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Sectores" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Informacion" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Cortes" 
        component={CortesScreen} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;