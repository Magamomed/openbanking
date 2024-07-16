// src/components/RegisterForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { registerUser } from './api';

const RegisterForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Пароли не совпадают');
      return;
    }

    const newUser = {
      email,
      name,
      password,
      accounts: [
        {
          bank_name: "Банк Центр Кредит",
          current_balance: 30000,
          available_balance: 0,
          blocked_balance: 0,
          currency: "KZT"
        },
        {
          bank_name: "Отбасы Банк",
          current_balance: 40000,
          available_balance: 0,
          blocked_balance: 0,
          currency: "KZT"
        },
        {
          bank_name: "AO 'Bank RBK'",
          current_balance: 100000,
          available_balance: 0,
          blocked_balance: 0,
          currency: "KZT"
        },
        {
          bank_name: "AO 'Home Credit Bank'",
          current_balance: 60000,
          available_balance: 0,
          blocked_balance: 0,
          currency: "KZT"
        }
      ]
    };

    try {
      const registeredUser = await registerUser(newUser);
      Alert.alert('Регистрация успешна', `Добро пожаловать, ${registeredUser.name}!`);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Ошибка регистрации', 'Что-то пошло не так. Попробуйте снова.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
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

export default RegisterForm;
