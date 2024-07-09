import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TransferModal = ({ visible, accounts, onClose, onTransfer }) => {
  const [sourceAccount, setSourceAccount] = useState(accounts[0].bankName);
  const [destinationAccount, setDestinationAccount] = useState(accounts[1].bankName);
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    if (sourceAccount && destinationAccount && amount) {
      onTransfer(sourceAccount, destinationAccount, parseFloat(amount));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Перевод между счетами</Text>
      <Picker
        selectedValue={sourceAccount}
        style={styles.picker}
        onValueChange={(itemValue) => setSourceAccount(itemValue)}
      >
        {accounts.map((account) => (
          <Picker.Item key={account.bankName} label={account.bankName} value={account.bankName} />
        ))}
      </Picker>
      <Picker
        selectedValue={destinationAccount}
        style={styles.picker}
        onValueChange={(itemValue) => setDestinationAccount(itemValue)}
      >
        {accounts.map((account) => (
          <Picker.Item key={account.bankName} label={account.bankName} value={account.bankName} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Сумма перевода"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
        <Text style={styles.transferButtonText}>Перевести</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Отмена</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  transferButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  transferButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransferModal;
