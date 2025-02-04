import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      formContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        elevation: 10,
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
      },
      input: {
        marginBottom: 10,
        backgroundColor: 'white',
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
      },
      picker: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 15,
      },
      buttonGps: {
        marginVertical: 10,
        backgroundColor: '#ff9800',
      },
      buttonRegister: {
        backgroundColor: '#4caf50',
      },
      footer: {
        marginTop: 15,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
      },
      link: {
        color: '#007BFF',
        fontWeight: 'bold',
      },
    });

export default RegisterStyles;
