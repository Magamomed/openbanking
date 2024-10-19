import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { transferFunds } from './api';

const TransferForm = ({ currentUser }) => {
  const [senderAccountId, setSenderAccountId] = useState('');
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
  const [recipientAccountId, setRecipientAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleTransfer = async () => {
    try {
      const transferData = {
        sender_phone: currentUser.phone_number,
        sender_account_id: senderAccountId,
        recipient_phone: recipientPhoneNumber,
        recipient_account_id: recipientAccountId,
        amount: parseFloat(amount),
      };
      console.log('Transfer data:', transferData);

      const response = await transferFunds(transferData);
      console.log('Transfer successful:', response);
      Alert.alert('Успех', 'Перевод выполнен успешно');
    } catch (error) {
      console.error('Ошибка перевода:', error);
      Alert.alert('Ошибка', 'Ошибка перевода. Пожалуйста, попробуйте снова.');
    }
  };

  const handleAccountSelect = (account) => {
    setSenderAccountId(account.id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Перевод средств</Text>

      <Text style={styles.label}>Выберите счет отправителя</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerButton}>
        <Text style={styles.pickerButtonText}>
          {senderAccountId ? `${currentUser.accounts.find(acc => acc.id === senderAccountId).bank_name} (${currentUser.accounts.find(acc => acc.id === senderAccountId).current_balance})` : 'Выберите счет'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <FlatList
            data={currentUser.accounts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => handleAccountSelect(item)}>
                <Text style={styles.modalItemText}>
                  {item.bank_name} ({item.current_balance})
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Номер телефона получателя"
        value={recipientPhoneNumber}
        onChangeText={setRecipientPhoneNumber}
        keyboardType="phone-pad"
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
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#FF5252',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransferForm;
