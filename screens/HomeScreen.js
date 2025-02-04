import React from 'react';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from '../components/Map';

const HomeScreen = ({ navigation }) => {
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Cerrar sesión",
          "¿Deseas cerrar sesión y volver a iniciar?",
          [
            { text: "Cancelar", style: "cancel" },
            { 
              text: "Sí", 
              onPress: async () => {
                await AsyncStorage.removeItem("token"); // Elimina el token de sesión
                navigation.replace("RedCortesLoja"); // Redirige al login
              } 
            }
          ]
        );
        return true; // Bloquea el botón atrás para evitar que el usuario retroceda
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
