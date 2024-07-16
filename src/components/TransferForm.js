import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,  Alert } from 'react-native';
import { transferFunds } from './api';
import { Picker } from '@react-native-picker/picker';


const TransferForm = ({ currentUser }) => {
  const [senderAccountId, setSenderAccountId] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientAccountId, setRecipientAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    try {
      const transferData = {
        sender_email: currentUser.email,
        sender_account_id: senderAccountId,
        recipient_email: recipientEmail,
        recipient_account_id: recipientAccountId,
        amount: parseFloat(amount),
      };

      const response = await transferFunds(transferData);
      console.log('Transfer successful:', response);
      Alert.alert('Успех', 'Перевод выполнен успешно');
    } catch (error) {
      console.error('Ошибка перевода:', error);
      Alert.alert('Ошибка', 'Ошибка перевода. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Перевод средств</Text>
      
      <Text style={styles.label}>Выберите счет отправителя</Text>
      <Picker
        selectedValue={senderAccountId}
        onValueChange={(itemValue) => setSenderAccountId(itemValue)}
        style={styles.picker}
      >
        {currentUser.accounts.map((account) => (
          <Picker.Item
            key={account.id}
            label={`${account.bank_name} (ID: ${account.id})`}
            value={account.id}
          />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Email получателя"
        value={recipientEmail}
        onChangeText={setRecipientEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="ID аккаунта получателя"
        value={recipientAccountId}
        onChangeText={setRecipientAccountId}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Сумма"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Перевести</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1a73e8',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransferForm;
