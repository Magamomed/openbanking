import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAccount } from '../components/AccountContext'; // путь к вашему AccountContext
import balanceData from '../data/balances.json';

const ProfileSettingsScreen = ({ navigation, route }) => {
  const { selectedSourceAccount, setSelectedSourceAccount, selectedDestinationAccount, setSelectedDestinationAccount } = useAccount();
  const [data, setData] = useState(balanceData.data);
  const [transferVisible, setTransferVisible] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (route.params?.selectedSourceAccount) {
      setSelectedSourceAccount(route.params.selectedSourceAccount);
    }
    if (route.params?.selectedDestinationAccount) {
      setSelectedDestinationAccount(route.params.selectedDestinationAccount);
    }
  }, [route.params]);

  const handleTransfer = () => {
    const sourceAcc = data.accounts.find(account => account.bankName === selectedSourceAccount);
    const destinationAcc = data.accounts.find(account => account.bankName === selectedDestinationAccount);

    if (sourceAcc && destinationAcc && amount) {
      sourceAcc.currentBalance -= parseFloat(amount);
      destinationAcc.currentBalance += parseFloat(amount);

      setData({ ...data });
      setTransferVisible(false);
      setAmount('');
    }
  };

  const navigateToSelectAccount = (accountType) => {
    navigation.navigate('SelectAccount', { accounts: data.accounts, accountType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Профиль и настройки</Text>
        </View>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AE</Text>
          </View>
          <Text style={styles.profileName}>Арсен Русланулы Е.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          <TouchableOpacity style={styles.sectionItem}>
            <Ionicons name="notifications-outline" size={24} color="red" />
            <Text style={styles.sectionItemText}>Скоро...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Ionicons name="language-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Язык приложения</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Переводы по номеру телефона</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={() => setTransferVisible(true)}>
            <Ionicons name="swap-horizontal-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Переводы между счетами</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>+7 (705) 5 • • • • 06 Ваш доверенный номер</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Безопасность</Text>
          <TouchableOpacity style={styles.sectionItem}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Смена пароля</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Ionicons name="key-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Смена кода доступа</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {transferVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Перевод между счетами</Text>
            <TouchableOpacity style={styles.input} onPress={() => navigateToSelectAccount('source')}>
              <Text>{selectedSourceAccount || 'Со счета:'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input} onPress={() => navigateToSelectAccount('destination')}>
              <Text>{selectedDestinationAccount || 'На счет:'}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Сумма перевода"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleTransfer}>
              <Text style={styles.modalButtonText}>Перевести</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setTransferVisible(false)}>
              <Text style={styles.modalButtonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonCancel: {
    backgroundColor: '#dc3545',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileSettingsScreen;
