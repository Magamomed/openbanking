// src/components/RegisterForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { registerUser } from './api';

const RegisterForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Пароли не совпадают');
      return;
    }

    const newUser = {
      phone_number: phoneNumber,
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
        <Text style={styles.title}>Регистрация</Text>
        <TextInput
          style={styles.input}
          placeholder="Имя"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Номер телефона"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <Button title="Зарегистрироваться" onPress={handleRegister} color="#4CAF50" />
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

export default RegisterForm;
