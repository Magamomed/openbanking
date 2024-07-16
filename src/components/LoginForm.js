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
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default LoginForm;
