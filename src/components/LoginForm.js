import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { loginUser } from './api';

const LoginForm = ({ navigation, setIsAuthenticated, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      if (user) {
        Alert.alert('Вход успешен', `Добро пожаловать, ${user.name}!`);
        setIsAuthenticated(true);
        setCurrentUser(user);
        navigation.replace('MainTabs', { user });
      } else {
        Alert.alert('Ошибка входа', 'Неверный email или пароль.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Ошибка входа', 'Что-то пошло не так. Попробуйте снова.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#4CAF50" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={() => navigation.navigate('Register')} color="#2196F3" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default LoginForm;
